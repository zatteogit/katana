#!/bin/bash
# =============================================================================
# push-remaining.sh
# Script per completare il push dei file sorgente dal progetto Figma Make
# al repository GitHub zatteogit/katana.
#
# PREREQUISITI:
# 1. Esportare il progetto da Figma Make
# 2. Posizionarsi nella root del progetto esportato
# 3. Clonare il repo: git clone https://github.com/zatteogit/katana.git
# 4. Eseguire questo script dalla directory del progetto esportato
#
# UTILIZZO:
#   chmod +x push-remaining.sh
#   ./push-remaining.sh /path/to/katana-repo
# =============================================================================

REPO_DIR=${1:-"../katana"}

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Errore: $REPO_DIR non e' un repository git."
    echo "Uso: ./push-remaining.sh /path/to/katana-repo"
    exit 1
fi

echo ""
echo "  KATANA — Push file rimanenti"
echo "  ============================="
echo ""
echo "  Repository: $REPO_DIR"
echo ""

# --- Katana source files (i 2 grandi che mancano) ---
mkdir -p "$REPO_DIR/tool/src/app/components/katana-files"

if [ -f "src/app/components/katana-files/script-js-code.ts" ]; then
    cp src/app/components/katana-files/script-js-code.ts \
       "$REPO_DIR/tool/src/app/components/katana-files/"
    echo "  ✓ script-js-code.ts"
fi

if [ -f "src/app/components/katana-files/style-css-code.ts" ]; then
    cp src/app/components/katana-files/style-css-code.ts \
       "$REPO_DIR/tool/src/app/components/katana-files/"
    echo "  ✓ style-css-code.ts"
fi

# --- React components ---
mkdir -p "$REPO_DIR/tool/src/app/components"

for file in ComparisonCard.tsx KatanaCodeTab.tsx KatanaPreviewTab.tsx KatanaRepoTab.tsx; do
    if [ -f "src/app/components/$file" ]; then
        cp "src/app/components/$file" "$REPO_DIR/tool/src/app/components/"
        echo "  ✓ $file"
    fi
done

if [ -f "src/app/components/analysis-data.ts" ]; then
    cp src/app/components/analysis-data.ts \
       "$REPO_DIR/tool/src/app/components/"
    echo "  ✓ analysis-data.ts"
fi

# --- App.tsx ---
mkdir -p "$REPO_DIR/tool/src/app"
if [ -f "src/app/App.tsx" ]; then
    cp src/app/App.tsx "$REPO_DIR/tool/src/app/"
    echo "  ✓ App.tsx"
fi

# --- Stili del tool ---
mkdir -p "$REPO_DIR/tool/src/styles"
for file in src/styles/*.css; do
    if [ -f "$file" ]; then
        cp "$file" "$REPO_DIR/tool/src/styles/"
        echo "  ✓ styles/$(basename $file)"
    fi
done

# --- Config files ---
for file in package.json vite.config.ts postcss.config.mjs; do
    if [ -f "$file" ]; then
        cp "$file" "$REPO_DIR/tool/"
        echo "  ✓ $file → tool/"
    fi
done

echo ""
echo "  File copiati in $REPO_DIR/tool/"
echo ""
echo "  Ora esegui:"
echo "    cd $REPO_DIR"
echo "    node build-dist.js              # Genera dist/ dai sorgenti"
echo "    git add tool/ dist/"
echo '    git commit -m "feat(tool): React components + katana source files"'
echo "    git push origin main"
echo ""
