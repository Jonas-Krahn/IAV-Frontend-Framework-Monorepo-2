
# IMPORTANT: This script should be executed in the root folder of the repository.

# Define an array of files to copy
FILES=".gitignore CHANGELOG.md CONTRIBUTING.md LICENSE NOTICE.md README.md SBOM.spdx"

# Define source and target directories
SRC_DIR="./main"
TARGET_DIR="."

for file in $FILES
do
    # For generelization: Ensure target directory structure exists
    mkdir -p "$(dirname "$TARGET_DIR/$file")"

    # Copy file from source to target
    cp "$SRC_DIR/$file" "$TARGET_DIR/$file"
done