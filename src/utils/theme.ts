import { Dimensions, Platform } from 'react-native';

export function isiPhoneX() : boolean{
  const dimension = Dimensions.get('window');
  return (Platform.OS === 'ios' && (dimension.height === 812 || dimension.width === 812))
}

const theme = {
  screenW: Dimensions.get('window').width,
  screenH: Dimensions.get('window').height,
  btnActiveOpacity: 0.5,
  actionBar: {
    height: 44,//Platform.OS === 'android' ? 56 : 44 //根据不通平台高度不一致
    backgroundColor: '#fff'
  },
  barContentPad: (Platform.OS === 'android' ? 0 : (isiPhoneX() ? 42 : 20)),
  bottomPaddting: isiPhoneX() ? 18 : 0,
  // 主题颜色
  primary: '#00BCD4',
  red: '#F44336',
  lightGray: '#F5F5F5',
  darkGray: '#5E5E5E',
  white: '#FFFFFF',
  black: '#000000',
};

export default theme;