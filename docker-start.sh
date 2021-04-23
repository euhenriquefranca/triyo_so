#!/bin/bash

echo "\n\n\nNpm install:"
npm install


echo "\n\n\nRun migration:"
adonis migration:run --force

echo "\n\n\nStart node server:"
adonis serve --dev --debug