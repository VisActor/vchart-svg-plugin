#!/usr/bin/env node

/**
 * Version Management Script
 * Usage: node scripts/version.js [show|bump|check]
 */

const fs = require('fs');
const path = require('path');

class VersionManager {
  constructor() {
    this.packagePath = path.join(process.cwd(), 'package.json');
    this.packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
  }

  async run() {
    const command = process.argv[2] || 'show';
    
    switch (command) {
      case 'show':
        this.showVersion();
        break;
      case 'bump':
        this.bumpVersion();
        break;
      case 'check':
        this.checkVersion();
        break;
      default:
        console.log('Usage: node scripts/version.js [show|bump|check]');
        process.exit(1);
    }
  }

  showVersion() {
    console.log(`Current version: ${this.packageJson.version}`);
  }

  bumpVersion() {
    const type = process.argv[3] || 'patch';
    const semver = require('semver');
    
    const newVersion = semver.inc(this.packageJson.version, type);
    if (!newVersion) {
      console.error(`Invalid version bump type: ${type}`);
      process.exit(1);
    }

    console.log(`Bumping version from ${this.packageJson.version} to ${newVersion}`);
    
    // Update version
    this.packageJson.version = newVersion;
    fs.writeFileSync(this.packagePath, JSON.stringify(this.packageJson, null, 2));
    
    console.log('Version updated successfully');
  }

  checkVersion() {
    const semver = require('semver');
    const version = this.packageJson.version;
    
    if (semver.valid(version)) {
      console.log(`✓ Version ${version} is valid`);
    } else {
      console.error(`✗ Version ${version} is invalid`);
      process.exit(1);
    }
  }
}

// Run the version manager
if (require.main === module) {
  const vm = new VersionManager();
  vm.run();
}

module.exports = VersionManager;