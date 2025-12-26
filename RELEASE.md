# Release Process Documentation

## Overview

This document describes the complete release process for vchart-svg-plugin, including automated scripts for version management, building, and publishing to npm.

## Prerequisites

1. **Node.js and Yarn**: Ensure you have Node.js (v14+) and Yarn installed
2. **npm Account**: You need an npm account with publish access to `@visactor/vchart-svg-plugin`
3. **Git**: Make sure you're on the main/master branch with a clean working directory
4. **Dependencies**: Run `yarn install` to install all required dependencies including `semver`

## Release Scripts

### Main Release Script

The primary release script is located at `scripts/release.js` and provides a comprehensive release workflow.

```bash
node scripts/release.js [version-type] [options]
```

#### Version Types
- `patch`: Increment patch version (0.0.1 → 0.0.2) (default)
- `minor`: Increment minor version (0.0.1 → 0.1.0)
- `major`: Increment major version (0.0.1 → 1.0.0)
- `x.y.z`: Set specific version (e.g., 1.2.3)

#### Options
- `--dry-run`: Show what would be done without actually doing it
- `--skip-tests`: Skip running tests before release
- `--force`: Force release without interactive prompts
- `--no-interactive`: Disable interactive mode
- `--help, -h`: Show help message

#### Examples
```bash
# Standard patch release
node scripts/release.js patch

# Minor release with dry run to preview changes
node scripts/release.js minor --dry-run

# Major release, skipping tests and forcing through prompts
node scriptsskip-tests --force

# Set specific version
node scripts/release.js major --/release.js 1.0.0
```

### Version Management Script

A separate script for version-related operations:

```bash
node scripts/version.js [command] [options]
```

#### Commands
- `show`: Display current version
- `bump`: Bump version (requires type: patch, minor, or major)
- `check`: Validate current version format

#### Examples
```bash
node scripts/version.js show
node scripts/version.js bump patch
node scripts/version.js check
```

### NPM Scripts

Added convenience scripts to package.json:

```bash
# Build and clean commands
yarn build              # Build all formats (ESM, CJS, UMD)
yarn build:watch        # Build with watch mode
yarn clean              # Clean build artifacts

# Linting and testing
yarn lint               # Run ESLint
yarn lint:fix           # Run ESLint with auto-fix
yarn test               # Run tests (placeholder)

# Release commands
yarn release            # Interactive release
yarn release:patch      # Patch release
yarn release:minor      # Minor release
yarn release:major      # Major release
yarn release:dry-run    # Dry run release
yarn version            # Show current version
```

## Release Process

### 1. Preparation

1. **Ensure Clean Environment**
   ```bash
   git status  # Should be clean
   git checkout main  # Switch to main branch
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Login to npm**
   ```bash
   npm login
   ```

### 2. Run Release

#### Interactive Release (Recommended)
```bash
node scripts/release.js
# Follow the interactive prompts
```

#### Automated Release
```bash
node scripts/release.js patch --skip-tests --force
```

### 3. Release Steps

The release script performs the following steps automatically:

1. **Prerequisites Check**
   - Verify git branch (main/master)
   - Check working directory is clean
   - Verify npm login status

2. **Quality Checks**
   - Run lint checks (unless --skip-tests)
   - Test basic functionality with demo

3. **Version Management**
   - Calculate new version based on type
   - Update package.json version
   - Show version changes

4. **Build Process**
   - Clean previous build artifacts
   - Build all formats (ESM, CJS, UMD)
   - Verify build outputs

5. **Confirmation**
   - Show release summary
   - Confirm with user (unless --force)

6. **Git Operations**
   - Commit version changes
   - Create git tag (v{version})
   - Push changes and tags

7. **NPM Publishing**
   - Check for existing versions
   - Handle version conflicts
   - Publish to npm registry

8. **Cleanup**
   - Remove temporary files
   - Show success message

## Build Configuration

### Rollup Configuration

The project uses Rollup for building multiple formats:

- **ESM** (`esm/`): ES modules for modern bundlers
- **CJS** (`cjs/`): CommonJS for Node.js and older bundlers
- **UMD** (`umd/`): Universal module definition for browsers

Each format is built with appropriate:
- Module resolution settings
- Babel transpilation
- TypeScript compilation
- External dependency handling

### External Dependencies

The following packages are marked as external (not bundled):
- react, react-dom
- @univerjs/core, @univerjs/ui, @univerjs/sheets-drawing-ui
- @visactor/react-vchart
- @wendellhu/redi

## Troubleshooting

### Common Issues

1. **"You are not logged in to npm"**
   - Run `npm login` and authenticate
   - Verify you have publish access to the package

2. **"Working directory is not clean"**
   - Commit or stash all changes
   - Run `git status` to see what needs to be handled

3. **"Must be on main/master branch"**
   - Switch to main branch: `git checkout main`
   - Or use `--force` flag to override

4. **"Version already exists on npm"**
   - Choose a different version type
   - Use `--force` to republish (not recommended)

5. **Build failures**
   - Check that all dependencies are installed
   - Run `yarn build` manually to see detailed errors
   - Verify TypeScript compilation

### Manual Release

If the automated script fails, you can perform the release manually:

```bash
# 1. Update version
node scripts/version.js bump patch

# 2. Build
yarn build

# 3. Commit and tag
git add package.json
git commit -m "chore: release v$(node scripts/version.js show | cut -d' ' -f3)"
git tag -a "v$(node scripts/version.js show | cut -d' ' -f3)" -m "Release version $(node scripts/version.js show | cut -d' ' -f3)"

# 4. Publish
npm publish

# 5. Push
git push origin main --tags
```

## Best Practices

1. **Always test with --dry-run first**
2. **Use --skip-tests only when necessary**
3. **Review changes before confirming release**
4. **Keep semantic versioning principles**
5. **Ensure CHANGELOG is updated** (if applicable)
6. **Test published package in a clean environment**

## Security Notes

- Never commit API keys or tokens
- Use environment variables for sensitive data
- Verify package contents before publishing
- Review npm publish permissions regularly

---

For questions or issues with the release process, please refer to the project documentation or create an issue in the repository.