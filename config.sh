#!/bin/bash
echo "export default $(cat config.json);" > config.js
mv config.js Pr_Final/rpi4