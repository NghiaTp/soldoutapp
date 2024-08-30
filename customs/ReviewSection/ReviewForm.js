import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { showMessage } from 'react-native-flash-message';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { url } = useContext(StoreContext);

  const handleSubmit = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      showMessage({
        message: 'Lỗi',
        description: 'Vui lòng đăng nhập để gửi đánh giá.',
        type: 'danger',
      });
      return;
    }
    try {
      const response = await axios.post(
        `${url}/api/review/review-product`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        showMessage({
          message: 'Thành công',
          description: 'Đánh giá của bạn đã được gửi thành công!',
          type: 'success',
        });
        onReviewAdded(response.data.review);
        setRating(5);
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showMessage({
        message: 'Lỗi',
        description:
          error.response?.data?.message ||
          'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.',
        type: 'danger',
      });
    }
  }, [url, productId, rating, comment, onReviewAdded]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh giá sản phẩm</Text>
      <AirbnbRating
        count={5}
        reviews={['Tệ', 'Không tốt', 'Bình thường', 'Tốt', 'Tuyệt vời']}
        defaultRating={rating}
        size={30}
        onFinishRating={setRating}
      />
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Nhận xét của bạn"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#38B6FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default React.memo(ReviewForm);