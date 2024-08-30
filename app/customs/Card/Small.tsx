import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {Colors, font, components} from '../Styles';

type Props = {
  name?: string;
  image?: any;
  type?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const Small = (prop: Props) => {
  return (
    <TouchableOpacity
      style={[components.cardSmall, prop?.style]}
      onPress={() => prop?.onPress && prop?.onPress()}>
      <Image
        source={
          prop?.image || require('../../../assets/images/32EB245A-E30D-4D15-B57A-23A577C43459.png')
        }
        style={{width: 140, borderRadius: 8}}
      />

      <Text
        style={[
          font.body,
          {
            fontWeight: '700',
            color: Colors.Main,
            marginTop: 10,
            marginBottom: 4,
          },
        ]}>
        {prop?.name || 'Cookie Sandwich'}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[font.subhead, {color: Colors.gray}]}>$$</Text>
        <View style={[components.dot, {marginHorizontal: 10}]} />
        <Text style={[font.subhead, {color: Colors.gray}]}>
          {prop?.type || 'Chinese'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Small;
