#!/bin/bash

npm run prisma:deploy

npm run prisma:seed

# Next.js デバッグポートバグ対応
# https://zenn.dev/miroscular/articles/3d2ac64cb878b8
# Nextjs v14.3.x で修正される予定
sed -Ei '/NODE_OPTIONS.*nodeDebugType.*/s//NODE_OPTIONS = `${NODE_OPTIONS} --${nodeDebugType}=0.0.0.0:9230`;/' node_modules/next/dist/cli/next-dev.js

tail -f /dev/null