"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const withMusicKitModule = (config, { appleMusicPermission } = {}) => {
    config_plugins_1.IOSConfig.Permissions.createPermissionsPlugin({
        NSAppleMusicUsageDescription: 'Allow $(PRODUCT_NAME) to access your Apple Music library',
    })(config, {
        NSAppleMusicUsageDescription: appleMusicPermission,
    });
    return config;
};
exports.default = withMusicKitModule;
