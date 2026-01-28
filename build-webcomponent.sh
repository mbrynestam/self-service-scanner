#!/bin/bash

echo "🔨 Building Buyr Scanner web component..."
npx vite build --config vite.config.webcomponent.ts

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build complete!"
  echo ""
  echo "Files created in dist/webcomponent/:"
  ls -la dist/webcomponent/
  echo ""
  echo "Use these files to embed the scanner on any HTML page."
else
  echo "❌ Build failed"
  exit 1
fi
