import {TouchableOpacity, Text, ViewStyle, ImageBackground} from 'react-native';
import React from 'react';
import {Colors, font, components} from '../Styles';

type Props = {
  name?: string;
  image?: any;
  onPress?: () => void;
  style?: ViewStyle;
};

const Xsmall = (prop: Props) => {
  return (
    <TouchableOpacity style={prop?.style} onPress={()=> prop.onPress && prop.onPress()}>
      <ImageBackground
        borderRadius={8}
        source={prop?.image || require('../../../assets/images/32EB245A-E30D-4D15-B57A-23A577C43459.png')}
        style={[components.cardXsmall, components.center, prop.style]}>
        <Text style={[font.subline, {color: Colors.white}]}>
          {prop?.name || 'Fast Food'}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Xsmall;
