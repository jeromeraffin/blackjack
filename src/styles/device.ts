import { DeviceSize } from '../core/utils/constants';

const device = {
  mobileS: `(min-width: ${DeviceSize.MOBILE_S}px)`,
  mobileM: `(min-width: ${DeviceSize.MOBILE_M}px)`,
  mobileL: `(min-width: ${DeviceSize.MOBILE_L}px)`,
  tablet: `(min-width: ${DeviceSize.TABLET}px)`,
  laptop: `(min-width: ${DeviceSize.LAPTOP}px)`,
  laptopL: `(min-width: ${DeviceSize.LAPTOP_L}px)`,
  desktop: `(min-width: ${DeviceSize.DESKTOP}px)`,
  desktopL: `(min-width: ${DeviceSize.DESKTOP}px)`,
};

export default device;
