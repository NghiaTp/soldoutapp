import {ColorValue, View} from 'react-native';
import React from 'react';
import {components, font, Colors} from '../Styles';

type Props = {
  backgroundColor?: ColorValue;
  checked?: boolean;
};

const Toggle = (props: Props) => {
  const check = props.checked ? Colors.active : Colors.gray;
  const color = check.toString();
  const position = props.checked ? {right: 1} : {left: 1};
  return (
    <View
      style={[
        components.toggleContainer,
        {backgroundColor: color, borderColor: color},
      ]}>
      <View
        style={[
          components.circle,
          {backgroundColor: Colors.white, 
            top: 1,
            position: 'absolute'},
          position,
        ]}
      />
    </View>
  );
};

export default Toggle;
