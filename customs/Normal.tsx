import { TouchableOpacity, Text, ViewStyle, Image, View, ColorValue } from 'react-native'
import React from 'react'
import {components, font, Colors} from './Styles';

type Props = {
    subline?: string;
    header?: string;
    icon?: any;
    tint?: ColorValue;
    hideSubline?: boolean;
    style?: ViewStyle;
    onPress?: () => void
  };

const Normal = (prop: Props) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.8}
    onPress={()=> prop?.onPress && prop?.onPress()}
    style={[components.lists, prop?.style]}>
      {/* <Image style={{tintColor: prop?.tint || undefined}} source={prop?.icon || require('../../../assets/icon/24/profile.png')} /> */}

      <View style={[{width: '80%'}]}>
        <Text style={[font.body, {color: Colors.Main}]}>{prop?.header || 'Link with Social'}</Text>
      </View>

      <Image source={require('../assets/images/right-arrow.png')} />

      </TouchableOpacity>
  )
}

export default Normal