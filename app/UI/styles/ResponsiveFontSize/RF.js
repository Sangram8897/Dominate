import { isIphoneX } from "./IphoneXHelper";
import { Platform, StatusBar, Dimensions } from "react-native";
import deviceInfo from "utils/DeviceInformation";

const { height } = Dimensions.get("window");

export default function RF(percent) {
  let deviceHeight = height + 100;
  if (Platform.OS === "ios") {
    if (isIphoneX()) {
      deviceHeight = height - 78;
    } else if (deviceInfo.isTablet()) {
      deviceHeight = height - 200;
    }
  } else if (Platform.OS === "android") {
    if (deviceInfo.isTablet()) {
      deviceHeight = height - StatusBar.currentHeight+75;
    } else {
      deviceHeight = height - StatusBar.currentHeight + 75;
    }
  }
  let heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}
