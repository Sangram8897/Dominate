import {StyleSheet, Platform} from 'react-native';
import {responsiveFontSize} from './../../utils/Responsive';
import RF from './ResponsiveFontSize/RF';

const Fontstyle = StyleSheet.create({
  FONT_XXSMALL: {
    fontSize: Platform.OS === 'ios' ? RF(1.2) : RF(1),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XSMALL: {
    fontSize: Platform.OS === 'ios' ? RF(1.6) : RF(1.4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_SMALL: {
    fontSize: Platform.OS === 'ios' ? RF(2) : RF(1.8),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM_SMALL: {
    fontSize: Platform.OS === 'ios' ? RF(2.2) : RF(2),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM: {
    fontSize: Platform.OS === 'ios' ? RF(2.4) : RF(2.2),
    fontFamily: 'Poppins-Medium',
  },
  FONT_MEDIUM_LARGE: {
    fontSize: Platform.OS === 'ios' ? RF(2.6) : RF(2.4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_LARGE: {
    fontSize: Platform.OS === 'ios' ? RF(2.8) : RF(2.6),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XLARGE: {
    fontSize: Platform.OS === 'ios' ? RF(3.2) : RF(3),
    fontFamily: 'Poppins-Medium',
  },
  FONT_XXLARGE: {
    fontSize: Platform.OS === 'ios' ? RF(3.6) : RF(3.4),
    fontFamily: 'Poppins-Medium',
  },
  FONT_DXLARGE: {
    fontSize: Platform.OS === 'ios' ? RF(4) : RF(3.8),
    fontFamily: 'Poppins-Medium',
  },
  FONT_SMALL_SIMPLE: {
    fontSize: Platform.OS === 'ios' ? RF(2) : RF(1.8),
    fontFamily: 'Poppins-Light',
  },

  FONT_MEDIUM_SIMPLE: {
    fontSize: Platform.OS === 'ios' ? RF(2.2) : RF(2),
    fontFamily: 'Poppins-Light',
  },
  FONT_LARGE_SIMPLE: {
    fontSize: Platform.OS === 'ios' ? RF(2.5) : RF(2.3),
    fontFamily: 'Poppins-Light',
  },
  FONT_SMALL_ITALIC: {
    fontSize: Platform.OS === 'ios' ? RF(2) : RF(1.8),
    fontFamily: 'Poppins-Italic',
  },
  FONT_MEDIUM_ITALIC: {
    fontSize: Platform.OS === 'ios' ? RF(2.2) : RF(2),
    fontFamily: 'Poppins-Italic',
  },
  FONT_LARGE_ITALIC: {
    fontSize: Platform.OS === 'ios' ? RF(2.4) : RF(2.2),
    fontFamily: 'Poppins-Italic',
  },
});
export default Fontstyle;
