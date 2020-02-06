import { PixelRatio, Dimensions, Platform } from "react-native";
const windowSize = Dimensions.get("window");
class DeviceInformation {
  detectIphoneX() {
    if (
      Platform.OS === "ios" &&
      !Platform.isTVOS &&
      !Platform.isTVOS &&
      (windowSize.height === 812 || windowSize.width === 812)
    ) {
      this.isIphoneX = true;
    } else {
      this.isIphoneX = false;
    }
  }

  isTablet = () => {
    let pixelDensity = PixelRatio.get();
    let width = windowSize.width;
    let height = windowSize.height;
    let adjustedWidth = width * pixelDensity;
    let adjustedHeight = height * pixelDensity;
    let isDeviceTablet;

    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
      isDeviceTablet = true;
      return isDeviceTablet;
    } else if (
      pixelDensity === 2 &&
      (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    ) {
      isDeviceTablet = true;
      return isDeviceTablet;
    } else {
      isDeviceTablet = false;
      return isDeviceTablet;
    }
  };
}

const deviceInfo = new DeviceInformation();
export default deviceInfo;
