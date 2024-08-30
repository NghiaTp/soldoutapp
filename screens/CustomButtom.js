import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const CustomButtom = ({ flatListRef, flatlistIndex, dataLength, navigation }) => {
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 25,
      height: 25,
      alignItems: "center",
      justifyContent: "center",
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
            flatListRef.current.scrollToIndex({index: flatlistIndex.value + 1 });
        } else {    
          navigation.navigate("HomeScreen");
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Tiếp tục
        </Animated.Text>
        <Animated.Image
          source={require("@/assets/images/next-arrow.png")}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButtom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  arrow: {
    position: "absolute",
  },

  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});
