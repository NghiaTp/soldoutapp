import {View, Text, TouchableOpacity, ViewStyle, Image} from 'react-native';
import React from 'react';
import {Colors, font, components} from '../Styles';

type Props = {
  name?: string;
  address?: string;
  time?: string;
  deliverFee?: string;
  rate?: number;
  image?: any;
  onPress?: () => void;
  style?: ViewStyle;
};

const Medium = (prop: Props) => {
  const address: string = 'Colarodo, San Francisco';
  const name: string = "McDonald's";
  return (
    <TouchableOpacity
      style={[
        {width: 200, backgroundColor: Colors.white, borderRadius: 8},
        prop?.style,
      ]}
      onPress={() => prop?.onPress && prop?.onPress()}>
      <Image
        source={prop?.image || require('../../../assets/images/32EB245A-E30D-4D15-B57A-23A577C43459.png')}
        style={{width: 75, height: 75, borderRadius: 8, marginBottom: 14}}
      />

      {/* <Text
        style={[
          font.subline,
          {
            color: Colors.Main,
            fontWeight: '700',
            overflow: 'hidden',
            width: 190,
            height: 30,
            
          },
        ]}>
        {prop?.name || name}
      </Text>

      <Text
        style={[
          font.body,
          {color: Colors.gray, marginBottom: 10, marginTop: 2},
        ]}>
        {prop?.address || address}
      </Text>

      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={[components.boxRate, components.center]}>
          <Text style={[font.caption, {color: Colors.white}]}>
            {prop?.rate || '4.5'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
            width: '70%',
          }}>
          <Text style={[font.subhead, {color: Colors.Main}]}>
            {prop?.time || '25min'}
          </Text>
          <View style={[components.dot, {marginHorizontal: 10}]} />
          <Text style={[font.subhead, {color: Colors.Main}]}>
            {prop?.deliverFee || 'Free delivery'}
          </Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

export default Medium;
