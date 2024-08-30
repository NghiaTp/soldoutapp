import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import ReviewForm from './ReviewForm';

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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Đánh giá sản phẩm</Text>
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
            <Text style={styles.modalTitle}>Tất cả Đánh giá</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  reviewComment: {
    marginTop: 5,
  },
  reviewUser: {
    fontStyle: 'italic',
    marginTop: 5,
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  showMoreButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#38B6FF',
    borderRadius: 5,
  },
  showMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#38B6FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default React.memo(ReviewSection);