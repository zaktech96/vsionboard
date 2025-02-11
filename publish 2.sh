#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Publishing create-titan package...${NC}"

# Navigate to the package directory
cd packages/create-titan

# Increment patch version
echo -e "${GREEN}Incrementing version...${NC}"
pnpm version patch

# Build the package
echo -e "${GREEN}Building package...${NC}"
pnpm build

# Publish to npm
echo -e "${GREEN}Publishing to npm...${NC}"
pnpm publish --no-git-checks

# Navigate back
cd ../..

echo -e "${GREEN}Done! Package published successfully!${NC}" 