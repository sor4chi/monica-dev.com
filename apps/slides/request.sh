#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=== 1. tmp-export ディレクトリの削除 ==="
rm -rf tmp-export .tmp-export
echo "  完了"

echo ""
echo "=== 2. pnpm-config.json の削除 (ルートに誤って作成された場合) ==="
rm -f ../../pnpm-config.json
echo "  完了"
