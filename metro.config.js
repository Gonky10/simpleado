const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const customConfig = {};

/**
 * Combinar la configuración predeterminada y personalizada,
 * y envolverla con la configuración de Reanimated.
 */
const finalConfig = mergeConfig(defaultConfig, customConfig);

module.exports = wrapWithReanimatedMetroConfig(finalConfig);
