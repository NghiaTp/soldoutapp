import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import React from "react";
import data from "@/data/data";
import Pagiantion from "@/screens/Pagination";
import CustomButtom from "@/screens/CustomButtom";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const WelcomeScreen = ({navigation}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef(null);
  const flatlistIndex = useSharedValue(0);

  const onViewableChanged = ({ viewableItems }) => {
    flatlistIndex.value = viewableItems[0].index;
  };

  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      const translateY = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );

      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateY }],
      };
    });
    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      const translateY = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );

      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateY }],
      };
    });
    return (
      <View style={[styles.itemContainer, , { width: SCREEN_WIDTH }]}>
        <Animated.Image source={item.image} style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableChanged}
      />

      <View style={styles.bottomContainer}>
        <Pagiantion data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <CustomButtom
          flatListRef={flatListRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  itemTitle: {
    color: "#38B6FF",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },

  itemText: {
    color: "#38B6FF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20,
    marginHorizontal: 35,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
