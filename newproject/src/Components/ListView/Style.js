import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';

export default StyleSheet.create({
  textStyle: {
    fontSize: totalSize(3),
    fontWeight: 'bold'
  },
  emailStyle: {
    fontSize: totalSize(2.5),

  }
});
