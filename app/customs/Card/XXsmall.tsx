import {View, Text, Image, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import { Colors, font, components } from '../Styles';

type Props = {
  name?: string;
  image?: any;
  onPress?: () => void;
  style?: ViewStyle;
};

const XXsmall = (prop: Props) => {
  return (
    <TouchableOpacity
      style={[components.cardXXsmall, prop.style]}
      onPress={() => prop?.onPress && prop?.onPress()}>
      <Image
        source={prop?.image || require('../../../assets/images/32EB245A-E30D-4D15-B57A-23A577C43459.png')}
        style={{width: 100, height: 100, borderRadius: 8, marginBottom: 10}}
      />
      <Text style={[font.body, {color: Colors.Main, textAlign: 'center'}]}>
        {prop?.name || 'Burgers (120)'}
      </Text>
    </TouchableOpacity>
  );
};

export default XXsmall;
