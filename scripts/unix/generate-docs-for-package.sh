# IMPORTANT: This script should be executed in the context of packages.

DOCS_DIR="../../generated_docs/packages"
DOCS_PACKAGE_DIR="docs-package"
DOCS_VERSION_DIR="docs-version"

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")

PACKAGE_DOCS_PATH="${DOCS_DIR}/${NAME}/package"
VERSION_DOCS_PATH="${DOCS_DIR}/${NAME}/${VERSION}"

mkdir -p $PACKAGE_DOCS_PATH
mkdir -p $VERSION_DOCS_PATH

cp -r $DOCS_PACKAGE_DIR/* $PACKAGE_DOCS_PATH

cp -r $DOCS_VERSION_DIR/* $VERSION_DOCS_PATH

echo "Created docs for ${NAME}"