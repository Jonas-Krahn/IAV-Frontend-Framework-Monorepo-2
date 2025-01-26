# IMPORTANT: This script should be executed inside the root folder of the main branch copy (main folder)

DOCS_DIR="generated_docs"
PACKAGES_DOCS_DIR="${DOCS_DIR}/packages"

mkdir -p $PACKAGES_DOCS_DIR

# Copy the entry point docs to generated_docs
cp -r docs/* $DOCS_DIR