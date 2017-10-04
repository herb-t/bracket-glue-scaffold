#!/bin/bash

# Fail on any error.
set -euo pipefail

NODE_V=$(node -v)
NPM_V=$(npm -v)
echo "*************************************************************************"
echo ""
echo "                              ⚡ Bracket ⚡ "
echo ""
echo "              Starting build with Node ${NODE_V} and npm ${NPM_V}"
echo ""
echo "*************************************************************************"

# Hop into our freshly cloned Git repository.
cd git/bracket-project

# Install our deps, "silently".
NPM_INSTALL_OUTPUT=$(npm install --silent)

# Run the Build.
npm run --silent build:kokoro
