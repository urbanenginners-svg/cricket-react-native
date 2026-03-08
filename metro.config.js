// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"],
//   };

//   return withNativeWind(config, { input: './global.css' });
// })();

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname)

const { transformer, resolver } = config;

config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    // Explicitly resolve "zod" to its CJS entry to work around Metro's
    // inability to handle zod's complex package.json exports map.
    resolveRequest: (context, moduleName, platform) => {
        if (moduleName === 'zod') {
            return {
                filePath: path.resolve(__dirname, 'node_modules/zod/index.cjs'),
                type: 'sourceFile',
            };
        }
        return context.resolveRequest(context, moduleName, platform);
    },
};

module.exports = withNativeWind(config, { input: './global.css' })