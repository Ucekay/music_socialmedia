// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('node:path');

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  path.resolve(__dirname, 'modules'),
];

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
