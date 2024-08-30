import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
  useWindowDimensions,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import axios from "axios";
import Swiper from "react-native-swiper";
import { StoreContext } from "@/context/StoreContext";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const SlideShow = ({ images }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const SLIDE_SHOW_WIDTH = windowWidth - 40;
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
        dotColor="white"
        activeDotColor="#38B6FF"
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const formatPrice = (price) => {
  if (!price) return "0 VNĐ";
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`;
};

const ReviewSection = ({ product, reviews, handleReviewAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const limitedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <AirbnbRating
        count={5}
        defaultRating={item.rating}
        size={20}
        showRating={false}
        isDisabled
      />
      <Text style={styles.reviewComment}>Nhận xét: {item.comment}</Text>
      <Text style={styles.reviewUser}>Bởi: {item.user.name}</Text>
      <Text style={styles.reviewDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.reviewSectionContainer}>
      <Text style={styles.sectionTitle}>Đánh giá của người dùng</Text>
      {limitedReviews.length > 0 ? (
        <FlatList
          data={limitedReviews}
          renderItem={renderReviewItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Chưa có đánh giá nào.</Text>
      )}
      {!showAllReviews && reviews.length > 5 && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setShowAllReviews(true)}
        >
          <Text style={styles.showMoreButtonText}>Xem thêm</Text>
        </TouchableOpacity>
      )}
      <ReviewForm productId={product._id} onReviewAdded={handleReviewAdded} />
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đánh giá của người dùng</Text>
            <FlatList
              data={reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalOpen(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { url } = useContext(StoreContext);

  const handleSubmit = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      showMessage({
        message: "Lỗi",
        description: "Vui lòng đăng nhập để gửi đánh giá.",
        type: "danger",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${url}/api/review/review-product`,
        { productId, rating, comment },
        { headers: { token } }
      );

      if (response.data.success) {
        showMessage({
          message: "Thành công",
          description: "Đánh giá của bạn đã được gửi thành công!",
          type: "success",
        });
        onReviewAdded(response.data.review);
        setRating(5);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showMessage({
        message: "Lỗi",
        description:
          error.response?.data?.message ||
          "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.",
        type: "danger",
      });
    }
  }, [url, productId, rating, comment, onReviewAdded]);

  return (
    <View style={styles.reviewFormContainer}>
      <Text style={styles.reviewFormTitle}>Đánh giá sản phẩm</Text>
      <AirbnbRating
        count={5}
        reviews={["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"]}
        defaultRating={rating}
        size={30}
        onFinishRating={setRating}
      />
      <TextInput
        style={styles.reviewInput}
        multiline
        numberOfLines={4}
        placeholder="Nhận xét của bạn"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.submitReviewButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitReviewButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductDetailScreen = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const {
    url,
    addToCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
    token,
  } = useContext(StoreContext);

  const productId = route.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${url}/api/product/detail/${productId}`
        );
        if (response.data.success) {
          setProduct(response.data.product);
          const isFavorite = favorites.some(
            (item) => item._id === response.data.product._id
          );
          setIsToggled(isFavorite);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${url}/api/review/review-list/${productId}`
        );
        if (response.data.success) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId, url, favorites]);

  const handleFavorite = useCallback(() => {
    if (!token) {
      Alert.alert("Vui lòng đăng nhập tài khoản để yêu thích sản phẩm!");
      return;
    }
    if (!isToggled) {
      addToFavorites(product);
      showMessage({
        message: "Thành công",
        description: "Đã thêm vào danh sách yêu thích",
        type: "success",
      });
    } else {
      removeFromFavorites(product._id);
      showMessage({
        message: "Thành công",
        description: "Đã xóa khỏi danh sách yêu thích!",
        type: "success",
      });
    }
    setIsToggled((prev) => !prev);
  }, [isToggled, product, addToFavorites, removeFromFavorites]);

  const handleReviewAdded = useCallback((newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setProduct((prevProduct) => ({
      ...prevProduct,
      rating:
        (prevProduct.rating * prevProduct.reviews + newReview.rating) /
        (prevProduct.reviews + 1),
      reviews: prevProduct.reviews + 1,
    }));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#38B6FF" />;

  if (!product) return <Text>Product not found</Text>;

  const imageUrl = isToggled
    ? require("@/assets/icons/liked.png")
    : require("@/assets/icons/like.png");

  const showConfirmationAlert = () => {
    Alert.alert("Xác nhận mua hàng", "Bạn có muốn mua sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Mua", onPress: () => addToCart(productId) },
    ]);
  };

  const showCallAlert = () => {
    Alert.alert("Ngưng bán rồi", "Liên hệ đến số 0927131304 nha", [
      { text: "Hủy", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("@/assets/images/back_arrow_icon.png")}
            style={styles.imgIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Image
            source={require("@/assets/images/cart.png")}
            style={styles.imgIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.paddingForHeader} />
        <View style={styles.scrollViewContent}>
          <SlideShow
            images={product.images.map(
              (img) => `${url}/images/${img.filename}`
            )}
          />
          <View style={styles.contentContainer}>
            <View style={styles.name_price}>
              <Text style={styles.textContainer}>{product.name}</Text>
            </View>
            <Text
              style={[
                styles.txtPrice,
                { color: "#38B6FF", textDecorationLine: "underline" },
              ]}
            >
              {formatPrice(product.price)}
            </Text>
            <View style={styles.detailContainer}>
              <View style={styles.brand_container}>
                <Text style={styles.textContent}>Thương hiệu:</Text>
                <Text style={styles.textContent}>{product.brand}</Text>
              </View>
              <View style={styles.rate_comment_container}>
                <TouchableOpacity style={styles.btnRating}>
                  <Image
                    style={styles.ratingIcon}
                    source={require("@/assets/images/rating_icon.png")}
                  />
                  <Text style={styles.ratingText}>
                    {product.averageRating.toFixed(1)}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.reviewCount}>
                  {product.numberOfReviews} reviews
                </Text>
              </View>
              <Text style={styles.textTitle}>Mô tả sản phẩm:</Text>
              <View style={styles.descriptionContainer}>
                <Text>{product.description}</Text>
              </View>
              <Text style={styles.textTitle}>Thông số kỹ thuật:</Text>
              <View style={styles.specifications_product}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Text key={key}>
                    {key.replace(/_/g, " ")}: {value}
                  </Text>
                ))}
              </View>
              <ReviewSection
                product={product}
                reviews={reviews}
                handleReviewAdded={handleReviewAdded}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleFavorite} style={styles.btnFavorite}>
          <Image source={imageUrl} style={styles.favoriteIcon} />
        </TouchableOpacity>
        {product.status === "Ngưng bán" ? (
          <TouchableOpacity style={styles.btnBuy} onPress={showCallAlert}>
            <Text style={styles.buyButtonText}>Liên hệ</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnBuy}
            onPress={showConfirmationAlert}
          >
            <Text style={styles.buyButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slideShowContainer: {
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgIcon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    borderStyle: "solid",
  },
  headerTitle: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
  },
  paddingForHeader: {
    height: 40,
  },
  scrollViewContent: {
    marginHorizontal: 15,
    marginTop: 25,
  },
  contentContainer: {
    marginVertical: 15,
  },
  name_price: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  textContainer: {
    fontSize: 22,
    fontWeight: "600",
  },
  txtPrice: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  rate_comment_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btnRating: {
    flexDirection: "row",
    width: 65,
    height: 30,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    gap: 5,
  },
  ratingIcon: {
    width: 17,
    height: 17,
  },
  ratingText: {
    fontWeight: "500",
  },
  reviewCount: {
    textDecorationLine: "underline",
    color: "#C9C9C9",
  },
  brand_container: {
    flexDirection: "row",
    gap: 8,
  },
  detailContainer: {
    gap: 17,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  textContent: {
    fontSize: 15,
    fontWeight: "400",
  },
  descriptionContainer: {
    marginVertical: 15,
  },
  specifications_product: {
    marginVertical: 15,
  },
  reviewSectionContainer: {
    marginTop: 20,
  },
  reviewItem: {
    marginBottom: 15,
  },
  reviewComment: {
    fontSize: 14,
    marginVertical: 5,
  },
  reviewUser: {
    fontSize: 14,
    color: "#555",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
  },
  showMoreButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  showMoreButtonText: {
    color: "#38B6FF",
    fontSize: 16,
  },
  reviewFormContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  submitReviewButton: {
    backgroundColor: "#38B6FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 10,
  },
  submitReviewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#38B6FF",
  },
  footer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 20,
  },
  btnBuy: {
    height: 50,
    width: 150,
    backgroundColor: "#38B6FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  btnFavorite: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  reviewComment: {
    fontSize: 14,
    marginVertical: 5,
    lineHeight: 20,
  },
  reviewUser: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  showMoreButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  showMoreButtonText: {
    color: "#38B6FF",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewFormContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 15,
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
    marginBottom: 15,
  },
  submitReviewButton: {
    backgroundColor: "#38B6FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  submitReviewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#38B6FF",
  },
});

export default ProductDetailScreen;
