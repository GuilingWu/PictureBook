/**
 * DeviceUtil.js
 * 适配不同屏幕像素
 */

import {PixelRatio, Dimensions} from 'react-native';

export const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);

export const px2dp = px => PixelRatio.roundToNearestPixel(px);

//设计尺寸按 iphone4尺寸
let designSize = {width: 640, height: 960};
let pxRatio = PixelRatio.get();
export let winWidth = Dimensions.get('window').width;
export let winHeigth = Dimensions.get('window').height;
export let width = dp2px(winWidth);
export let height = dp2px(winHeigth);
export let designScale = Math.max(
  designSize.width / width,
  designSize.height / height,
);
width = width * designScale;
height = height * designScale;
export let scale = 1 / pxRatio / designScale;

