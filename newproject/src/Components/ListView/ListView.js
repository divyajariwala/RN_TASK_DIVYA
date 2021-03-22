import React from 'react';
import { View, Text, Image } from 'react-native';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Divider from '../Divider/Divider';
import Style from './Style';
const { textStyle, emailStyle } = Style;
const ListView = (props) => {
  return (
    <View>
      <TouchableOpacity >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '30%' }}>
            <Image
              source={{ uri: props.data.item.profile_pic }}
              resizeMode="contain"
              style={{
                width: width(20),
                height: height(20),
                // justifyContent: 'center',
                // alignItems: 'center',
                marginLeft: height(2),
                borderRadius: height(2)
              }}></Image>
          </View>
          <View style={{ width: '70%', justifyContent: 'center' }}>
            <Text style={[textStyle]}>{props.data.item.username}</Text>
            <Text style={[emailStyle]}>{props.data.item.email}</Text>

          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

export default ListView;
