// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/lib/types/config-api');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
    },
]);
