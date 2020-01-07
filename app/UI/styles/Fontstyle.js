import {StyleSheet} from 'react-native';
import {responsiveFontSize} from './../../utils/Responsive';
const Fontstyle = StyleSheet.create({
  FONT_XXSMALL: {
    fontSize: responsiveFontSize(1),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XSMALL: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Medium',
  },
  FONT_SMALL: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM: {
    fontSize: responsiveFontSize(4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_LARGE: {
    fontSize: responsiveFontSize(5),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XLARGE: {
    fontSize: responsiveFontSize(6),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XXLARGE: {
    fontSize: responsiveFontSize(7),
    fontFamily: 'Poppins-Medium',
  },
  FONT_DXLARGE: {
    fontSize: responsiveFontSize(8),
    fontFamily: 'Poppins-Medium',
  },
});
export default Fontstyle;
