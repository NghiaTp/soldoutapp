import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";
import { product_data } from "@/data/data";
import ProductItem from "@/components/ItemList/ProductItem";
import axios from "axios";
import ProductListItem from "@/components/ItemList/ProductListItem";
import { StoreContext } from "@/context/StoreContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/context/UserContext";

const SlideShow = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const SLIDE_SHOW_WIDTH = windowWidth - 40; // Kích thước của slideshow (hình vuông)
  const SLIDE_SHOW_HEIGHT = windowHeight * 0.3;
  return (
    <View
      style={[
        styles.slideShowContainer,
        { width: SLIDE_SHOW_WIDTH, height: SLIDE_SHOW_HEIGHT },
      ]}
    >
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={2}
      >
        <View style={styles.slide}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("@/assets/images/laptop1.jpg")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("@/assets/images/laptop2.jpg")}
              style={styles.image}
            />
          </View>
        </View>
      </Swiper>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // const url = "http://172.16.81.139:8010";
  const {
    product_list,
    phoneProduct,
    saleProduct,
    tabletProduct,
    laptopProduct,
  } = useContext(StoreContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/soldout_logo.png")}
            style={styles.logo}
          />
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Image
              source={require("@/assets/images/cart.png")}
              style={styles.logoCart}
            />
          </TouchableOpacity>
        </View>

        <SlideShow />
        {/* <View>
          <FlatList
            data={categories_data}
            renderItem={renderItemCategories}
            keyExtractor={(item) => item.id}
            horizontal={true}
            nestedScrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Flash Sales</Text>
          <TouchableOpacity onPress={() => navigation.navigate("FlashSale")}>
            <Text style={styles.seeAll}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={saleProduct.slice(0, 7)}
          renderItem={({ item, index }) => <ProductListItem item={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm tiêu biểu</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductListScreen")}
          >
            <Text style={styles.seeAll}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={product_list.slice(0, 7)}
          renderItem={({ item, index }) => <ProductListItem item={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Các sản phẩm Điện thoại</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Phone")}>
            <Text style={styles.seeAll}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={phoneProduct.slice(0, 7)}
          renderItem={({ item, index }) => <ProductListItem item={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Các sản phẩm Tablet</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TabletScreen")}>
            <Text style={styles.seeAll}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tabletProduct.slice(0, 7)}
          renderItem={({ item, index }) => <ProductListItem item={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Các sản phẩm Laptop</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LaptopScreen")}>
            <Text style={styles.seeAll}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={laptopProduct.slice(0, 7)}
          renderItem={({ item, index }) => <ProductListItem item={item} />}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
  },
  userIcon: {
    width: 35,
    height: 35,
  },
  logo: {
    width: 100,
    height: 50,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "start",
    marginVertical: 20,
  },
  category: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  categoryText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginVertical: 25,
    color: "#38B6FF",
  },
  seeAll: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.5,
    color: "black", // hoặc màu sắc mong muốn của bạn
    textDecorationLine: "underline",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideShowContainer: {
    width: 50,
    height: 20,
    marginStart: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10, // Add some bottom margin
  },
  logoCart: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;

// export const product_data = [
//   {
//     id: 1,
//     image: require("@/assets/images/laptop1.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 2,
//     image: require("@/assets/images/laptop2.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 3,
//     image: require("@/assets/images/laptop3.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 4,
//     image: require("@/assets/images/laptop4.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 5,
//     image: require("@/assets/images/laptop3.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 6,
//     image: require("@/assets/images/laptop4.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 7,
//     image: require("@/assets/images/laptop3.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
//   {
//     id: 8,
//     image: require("@/assets/images/laptop4.jpg"),
//     name: "Product Studiobook",
//     price: "15.000.000đ",
//   },
// ];

// const categories_data = [
//   {
//     id: 1,
//     name: "Điện Thoại",
//   },
//   {
//     id: 2,
//     name: "Laptop",
//   },
//   {
//     id: 3,
//     name: "Tablet",
//   },
//   {
//     id: 4,
//     name: "SmartWatch",
//   },
//   {
//     id: 5,
//     name: "Âm thanh",
//   },
// ];
