// src/shims/assetRegistry.js
// react-native-web does not implement AssetRegistry (used for bundling
// native image/asset files). react-native-svg imports getAssetByID from
// here, but on web it's only relevant for *external* SVG assets (e.g.
// require('./icon.svg') used as an <Image source={...}> ), not inline
// <Svg> components. This shim is a safe no-op stand-in.

export function registerAsset(asset) {
  return asset;
}

export function getAssetByID(assetId) {
  return null;
}
