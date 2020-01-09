import {StyleSheet} from 'react-native';
import {responsiveFontSize} from '../../functions/Responsive';
const Fontstyle = StyleSheet.create({
  FONT_XXSMALL: {
    fontSize: responsiveFontSize(1),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XSMALL: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_SMALL: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM_SMALL: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: 'Poppins-Medium',
  },
  FONT_LARGE: {
    fontSize: responsiveFontSize(2.6),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XLARGE: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XXLARGE: {
    fontSize: responsiveFontSize(3.4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_DXLARGE: {
    fontSize: responsiveFontSize(3.8),
    fontFamily: 'Poppins-Medium',
  },
});
export default Fontstyle;
