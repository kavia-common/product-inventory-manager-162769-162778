#!/bin/bash
cd /home/kavia/workspace/code-generation/product-inventory-manager-162769-162778/product_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

