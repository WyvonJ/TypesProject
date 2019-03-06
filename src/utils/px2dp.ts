import { Dimensions } from "react-native";

/* 
屏幕工具类
750 * 1334
 */

export const screenW = Dimensions.get("window").width;
export const screenH = Dimensions.get("window").height;

const r2 = 2;
const w2 = 750 / r2;
const h2 = 1334 / r2;

export const DEFAULT_DENSITTY = r2;

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */

export default function px2dp(size: number): number {
  let scaleWidth = screenW / w2;
  size = Math.round(size * scaleWidth + 0.5);
  return size / DEFAULT_DENSITTY;
}
