#!/bin/bash

set -e

# Usage: ./deploy.sh [patch|minor|major]
BUMP_TYPE=${1:-patch}

echo "Bumping npm version ($BUMP_TYPE)..."
npm version $BUMP_TYPE

echo "Pushing commit and tags to origin..."
git push
git push --tags

echo "Done! The GitHub Actions workflow will now run if configured." 