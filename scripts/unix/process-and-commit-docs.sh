#!/bin/bash

# IMPORTANT: This file only takes packages with a scope (for example @test-ff-monorepo-6/core) into account.
# IMPORTANT: This script should be executed in the root folder of the repository.

SOURCE_DIR="main/generated_docs/packages"
DEST_DIR="generated_docs/packages"

# Deletes files in root generated docs which do not exist in main generated docs and
# copies (also overwrites) the other files.
rsync -av --exclude="packages" --delete main/generated_docs/* generated_docs/

# Copy all version folders to root generated documentation (and overwrite if necessary)
for scope in "$SOURCE_DIR"/*; do
    if [ -d "$scope" ]; then
        scope_name=$(basename "$scope")
        
        # Create the scope folder in the destination if it does not exist
        mkdir -p "$DEST_DIR/$scope_name"

        # Iterate over packages within the scope
        for package in "$scope"/*; do
            if [ -d "$package" ]; then
                package_name=$(basename "$package")
                
                # Create the package folder in the destination if it does not exist
                mkdir -p "$DEST_DIR/$scope_name/$package_name"

                # Copy version folders, overwriting existing ones
                for version in "$package"/*; do
                    if [ -d "$version" ]; then
                        version_name=$(basename "$version")
                        # Delete version folder if it exists
                        rm -rf "$DEST_DIR/$scope_name/$package_name/$version_name"
                        # Copy the version folder to root generated documentation
                        cp -r "$SOURCE_DIR/$scope_name/$package_name/$version_name" "$DEST_DIR/$scope_name/$package_name/"
                        echo "Copied $SOURCE_DIR/$scope_name/$package_name/$version_name to $DEST_DIR/$scope_name/$package_name/"
                    fi
                done
            fi
        done
    fi
done

rm -rf main

git add .
git commit -m "chore: Deploy updated documentation"
git push origin gh-pages