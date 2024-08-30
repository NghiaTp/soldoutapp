import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const VoucherScreen = () => {
  const navigation = useNavigation();
  const [vouchers, setVouchers] = useState([]);
  const [searchID, setSearchID] = useState('');
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    fetchIDs();
  }, []);

  const fetchIDs = async () => {
    try {
      const response = await axios.get('http://172.16.115.133:8010/api/voucher/all');
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
  };

  const handleIDSelect = (id) => {
    setSelectedID(id === selectedID ? null : id); 
  };

  const navigateToPayment = () => {
    const selectedIDItem = vouchers.find(item => item._id === selectedID);
    if (selectedIDItem) {
      navigation.navigate('Home', { selectedIDItem });
    } else {
      alert('Please select an ID before proceeding to payment.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/soldout_logo.png')} style={styles.logo} />
      <Text style={styles.title}>SOLDOUT VOUCHER</Text>
      <TouchableOpacity style={styles.applyButton} onPress={() => fetchIDs()}>
        <Text style={styles.applyButtonText}>Reload</Text>
      </TouchableOpacity>

      <FlatList
        data={vouchers.filter(item => 
          (item.description && item.description.toLowerCase().includes(searchID.toLowerCase())) || 
          (item._id && item._id.toString().toLowerCase().includes(searchID.toLowerCase()))
        )}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleIDSelect(item._id)} style={[styles.voucherContainer, selectedID === item._id && styles.selectedID]}>
            <View style={styles.voucherDetails}>
              <Text style={styles.voucherText}>ID: {item._id}</Text>
              <Text style={styles.voucherText}>Price: {item.price}</Text>
              <Text style={styles.voucherText}>Description: {item.description}</Text>
              <Text style={styles.voucherText}>Date: {item.date}</Text>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.voucherImage} />
              ) : (
                <Text style={styles.voucherText}>Image: Not available</Text>
              )}
            </View>
            {selectedID === item._id && (
              <Icon name="check-circle" size={24} color="#00ff00" style={styles.selectIcon} />
            )}
          </TouchableOpacity>
        )}
      />

      {selectedID && (
        <TouchableOpacity style={styles.paymentButton} onPress={navigateToPayment}>
          <Text style={styles.paymentButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    marginVertical: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  input: {
    height: 40,
    borderColor: '#1e90ff', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff', 
  },
  applyButton: {
    backgroundColor: '#1e90ff', 
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#ffffff', 
    fontSize: 16,
  },
  voucherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e90ff', 
    backgroundColor: '#ffffff', 
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  voucherDetails: {
    flex: 1,
  },
  voucherText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#1e90ff',
  },
  voucherImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  selectedID: {
    backgroundColor: '#b0e0e6', 
  },
  selectIcon: {
    marginRight: 12,
  },
  paymentButton: {
    backgroundColor: '#1e90ff', 
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 16,
  },
  paymentButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Thêm hiệu ứng nhấn (click) và hover cho nút
  applyButtonPress: {
    backgroundColor: '#4682b4', // Xanh dương trung bình
  },
  paymentButtonPress: {
    backgroundColor: '#4682b4', 
  },
  voucherContainerPress: {
    backgroundColor: '#d3d3d3', // Xám nhạt
  },
});

export default VoucherScreen;
