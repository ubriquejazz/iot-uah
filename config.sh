#!/bin/bash
echo "window.APP_CONFIG = $(cat config.json);" > config.js
mv config.js Pr_Final/rpi4

# Ensure lighttpd has permission to read the file
chmod 644 Pr_Final/rpi4/config.js