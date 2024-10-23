// Learn more https://docs.expo.io/guides/customizing-metro
import { getDefaultConfig } from 'expo/metro-config';

const path = require('node:path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

if (config.resolver) {
  config.resolver.nodeModulesPaths = [
    ...(config.resolver.nodeModulesPaths ?? []),
    path.resolve(__dirname, 'modules'),
  ];
}

module.exports = config;
