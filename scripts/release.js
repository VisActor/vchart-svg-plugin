#!/usr/bin/env node

/**
 * vchart-svg-plugin Release Script
 * Usage: node scripts/release.js [patch|minor|major] [options]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PACKAGE_NAME = '@visactor/vchart-svg-plugin';
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class ReleaseManager {
  constructor() {
    this.options = this.parseArguments();
    this.version = null;
  }

  parseArguments() {
    const args = process.argv.slice(2);
    
    // Check for help flag
    if (args.includes('--help') || args.includes('-h')) {
      this.showHelp();
      process.exit(0);
    }
    
    const options = {
      versionType: args[0] || 'patch',
      skipTests: args.includes('--skip-tests'),
      dryRun: args.includes('--dry-run'),
      force: args.includes('--force'),
      interactive: !args.includes('--no-interactive') && process.stdin.isTTY
    };
    return options;
  }

  showHelp() {
    console.log(`
vchart-svg-plugin Release Script

Usage: node scripts/release.js [version-type] [options]

Version Types:
  patch         Increment patch version (0.0.1 → 0.0.2) (default)
  minor         Increment minor version (0.0.1 → 0.1.0)
  major         Increment major version (0.0.1 → 1.0.0)
  x.y.z         Set specific version

Options:
  --dry-run     Show what would be done without actually doing it
  --skip-tests  Skip running tests before release
  --force       Force release without interactive prompts
  --no-interactive Disable interactive mode
  --help, -h    Show this help message

Examples:
  node scripts/release.js patch
  node scripts/release.js minor --dry-run
  node scripts/release.js 1.0.0 --skip-tests --force
    `);
  }

  log(level, message) {
    const colorMap = {
      info: COLORS.blue,
      success: COLORS.green,
      warning: COLORS.yellow,
      error: COLORS.red
    };
    const color = colorMap[level] || COLORS.reset;
    console.log(`${color}[${level.toUpperCase()}]${COLORS.reset} ${message}`);
  }

  async run() {
    try {
      this.log('info', 'Starting release process for ' + PACKAGE_NAME);
      this.log('info', '='.repeat(50));

      // Check prerequisites
      await this.checkPrerequisites();

      // Release steps
      await this.runTests();
      await this.updateVersion();
      await this.buildProject();

      if (this.options.dryRun) {
        this.log('info', 'Dry run completed successfully!');
        process.exit(0);
      }

      // Confirmation
      await this.confirmRelease();

      await this.createGitTag();
      await this.publishToNpm();
      await this.pushToRemote();

      this.log('success', 'Release completed successfully!');
      this.log('info', `Version ${this.version} has been published to npm`);
      this.log('info', `Git tag v${this.version} has been created and pushed`);

    } catch (error) {
      this.log('error', error.message);
      process.exit(1);
    }
  }

  async checkPrerequisites() {
    this.log('info', 'Checking prerequisites...');

    // Check if on main branch
    const currentBranch = this.getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      if (this.options.interactive) {
        const answer = this.askQuestion(`You are not on main/master branch. Current: ${currentBranch}. Continue? (y/N): `);
        if (!answer.toLowerCase().startsWith('y')) {
          throw new Error('Release cancelled by user');
        }
      } else if (!this.options.force) {
        throw new Error(`Must be on main/master branch, current: ${currentBranch}`);
      }
    }

    // Check git status
    if (!this.isGitClean()) {
      throw new Error('Working directory is not clean. Please commit or stash changes first.');
    }

    // Check npm login
    await this.checkNpmLogin();

    this.log('success', 'Prerequisites check passed');
  }

  getCurrentBranch() {
    try {
      return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  isGitClean() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim() === '';
    } catch {
      return false;
    }
  }

  async checkNpmLogin() {
    // try {
    //   const user = execSync('npm whoami', { encoding: 'utf8' }).trim();
    //   this.log('info', `Logged in to npm as: ${user}`);
    // } catch (ex) {
    //   this.log('error', ex.message);
    //  // throw new Error('You are not logged in to npm. Please run "npm login" first.');
    // }
  }

  async runTests() {
    if (this.options.skipTests) {
      this.log('warning', 'Skipping tests as requested');
      return;
    }

    this.log('info', 'Running lint checks...');
    try {
      execSync('yarn lint', { stdio: 'inherit' });
      this.log('success', 'Lint checks passed');
    } catch {
      throw new Error('Lint checks failed');
    }
  }

  async updateVersion() {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const currentVersion = packageJson.version;
    this.version = this.calculateNewVersion(currentVersion, this.options.versionType);
    
    this.log('info', `Current version: ${currentVersion}`);
    this.log('info', `Updating version to: ${this.version}`);

    // Update package.json
    packageJson.version = this.version;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

    this.log('success', `Version updated to ${this.version}`);
  }

  calculateNewVersion(currentVersion, versionType) {
    // Validate version type
    if (/^\d+\.\d+\.\d+$/.test(versionType)) {
      return versionType;
    }

    // Auto-increment using semver
    try {
      const semver = require('semver');
      return semver.inc(currentVersion, versionType);
    } catch {
      throw new Error(`Invalid version type: ${versionType}`);
    }
  }

  async buildProject() {
    this.log('info', 'Cleaning previous build artifacts...');
    this.cleanBuildArtifacts();

    this.log('info', 'Building project...');
    try {
      execSync('yarn build', { stdio: 'inherit' });
      this.log('success', 'Build completed successfully');
    } catch {
      throw new Error('Build failed');
    }

    // Verify build outputs
    if (!this.verifyBuildOutputs()) {
      throw new Error('Build outputs are missing or incomplete');
    }
  }

  cleanBuildArtifacts() {
    const dirsToClean = ['cjs', 'esm', 'umd'];
    dirsToClean.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    });

    // Clean any tarball files
    const tarballFiles = fs.readdirSync(process.cwd()).filter(file => file.endsWith('.tgz'));
    tarballFiles.forEach(file => {
      fs.unlinkSync(path.join(process.cwd(), file));
    });
  }

  verifyBuildOutputs() {
    const requiredDirs = ['cjs', 'esm', 'umd'];
    const missingDirs = requiredDirs.filter(dir => {
      const dirPath = path.join(process.cwd(), dir);
      return !fs.existsSync(dirPath);
    });

    if (missingDirs.length > 0) {
      this.log('error', `Missing build directories: ${missingDirs.join(', ')}`);
      return false;
    }

    this.log('success', 'All build outputs generated successfully');
    return true;
  }

  async confirmRelease() {
    if (!this.options.interactive || this.options.force) {
      return;
    }

    this.log('info', '='.repeat(50));
    this.log('info', `Ready to publish version ${this.version}`);
    this.log('info', `Package: ${PACKAGE_NAME}`);
    this.log('info', `Skip tests: ${this.options.skipTests}`);
    this.log('info', `Dry run: ${this.options.dryRun}`);

    const answer = this.askQuestion('Continue with release? (y/N): ');
    if (!answer.toLowerCase().startsWith('y')) {
      throw new Error('Release cancelled by user');
    }
  }

  askQuestion(question) {
    // Check if we're in an interactive environment
    if (!process.stdin.isTTY) {
      this.log('warning', 'Running in non-interactive mode, defaulting to yes');
      return 'y';
    }

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(String(answer || '').trim());
      });
    });
  }

  async createGitTag() {
    const tagName = `v${this.version}`;
    this.log('info', `Creating git tag: ${tagName}`);

    try {
      execSync('git add package.json', { stdio: 'inherit' });
      execSync(`git commit -m "chore: release v${this.version}"`, { stdio: 'inherit' });
      execSync(`git tag -a ${tagName} -m "Release version ${this.version}"`, { stdio: 'inherit' });
      this.log('success', `Git tag ${tagName} created`);
    } catch (error) {
      throw new Error(`Failed to create git tag: ${error.message}`);
    }
  }

  async publishToNpm() {
    this.log('info', 'Publishing to npm...');

    // Check if package exists
    try {
      const npmVersion = execSync(`npm view ${PACKAGE_NAME} version`, { encoding: 'utf8' }).trim();
      const currentVersion = this.version;

      if (npmVersion === currentVersion) {
        if (!this.options.force && this.options.interactive) {
          const answer = this.askQuestion(`Version ${currentVersion} already exists on npm. Force publish? (y/N): `);
          if (!answer.toLowerCase().startsWith('y')) {
            throw new Error('Release cancelled');
          }
        }
        execSync('npm publish --force', { stdio: 'inherit' });
      } else {
        execSync('npm publish', { stdio: 'inherit' });
      }
    } catch (error) {
      // Package might not exist yet, try publishing
      try {
        execSync('npm publish', { stdio: 'inherit' });
      } catch (publishError) {
        throw new Error(`Failed to publish to npm: ${publishError.message}`);
      }
    }

    this.log('success', 'Package published to npm successfully');
  }

  async pushToRemote() {
    this.log('info', 'Pushing changes to remote repository...');

    try {
      const currentBranch = this.getCurrentBranch();
      execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
      execSync('git push --tags', { stdio: 'inherit' });
      this.log('success', 'Changes pushed to remote repository');
    } catch (error) {
      throw new Error(`Failed to push to remote: ${error.message}`);
    }
  }
}

// Run the release manager
if (require.main === module) {
  const releaseManager = new ReleaseManager();
  releaseManager.run();
}

module.exports = ReleaseManager;