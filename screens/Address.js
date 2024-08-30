import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, Modal, Pressable } from 'react-native';
import { useContext } from 'react';
import { StoreContext } from '@/context/StoreContext';

const Address = () => {
  const { url, token } = useContext(StoreContext);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    fullname: '',
    phone: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${url}/api/address/list`, {
          headers: {
            token,
          },
        });
        if (response.data.success) {
          setAddresses(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        setError('Không thể tải địa chỉ.');
        console.error(err);
      }
    };

    fetchAddresses();
  }, [url, token]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(
          `${url}/api/address/update/${currentAddressId}`,
          formData,
          {
            headers: {
              token,
            },
          }
        );
      } else {
        await axios.post(`${url}/api/address/add`, formData, {
          headers: {
            token,
          },
        });
      }
      setFormData({ address: '', fullname: '', phone: '' });
      setEditMode(false);
      setCurrentAddressId(null);
      setShowForm(false);

      const response = await axios.get(`${url}/api/address/list`, {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      } else {
        setError(response.data.message || 'Lỗi khi tải lại địa chỉ.');
      }
    } catch (err) {
      setError('Cập nhật thông tin thất bại.');
      console.error(err);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      address: address.address || '',
      fullname: address.fullname || '',
      phone: address.phone || '',
    });
    setEditMode(true);
    setCurrentAddressId(address._id);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`${url}/api/address/${addressId}`, {
        headers: {
          token,
        },
      });
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr._id !== addressId)
      );
    } catch (err) {
      setError('Xóa địa chỉ thất bại.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách địa chỉ</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        title="Thêm Địa chỉ"
        onPress={() => {
          setShowForm(true);
          setEditMode(false);
          setFormData({ address: '', fullname: '', phone: '' });
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showForm}
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Sửa Địa chỉ' : 'Thêm Địa chỉ'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={formData.address}
              onChangeText={(text) => handleChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={formData.fullname}
              onChangeText={(text) => handleChange('fullname', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
            <View style={styles.buttonContainer}>
              <Button title={editMode ? 'Cập nhật' : 'Thêm'} onPress={handleSubmit} />
              <Pressable style={styles.cancelButton} onPress={() => setShowForm(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.addressItem}>
            <Text>Địa chỉ: {item.address}</Text>
            <Text>Họ và tên: {item.fullname}</Text>
            <Text>Số điện thoại: {item.phone}</Text>
            <View style={styles.buttonGroup}>
              <Button title="Chỉnh sửa" onPress={() => handleEdit(item)} />
              <Button title="Xóa" color="#f44336" onPress={() => handleDelete(item._id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>Không có địa chỉ nào.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#ffcdd2',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
  },
  addressItem: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Address;
