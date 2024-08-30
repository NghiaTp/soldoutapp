import axios from 'axios';
import { UserProfile } from '@/model/UserProfile.model';

const API_URL = 'http://192.168.1.9:8010/api/user';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Server Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const response = await axios.get<UserProfile>(`${API_URL}/${userId}`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user profile:', error.response?.status, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

const convertUriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const updateUserProfile = async (userId: string, profile: UserProfile, avatar: string | null): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('address', profile.address || '');
    formData.append('phone', profile.phone);

    if (avatar) {
      const avatarBlob = await convertUriToBlob(avatar);
      formData.append('image', avatarBlob, 'profile.jpg');
    }

    console.log('FormData:', Array.from(formData.entries()));

    await axios.put(`${API_URL}/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Full error object:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error updating user profile:', error.response?.status);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    } else {
      console.error('Unexpected error:', error);
    }

    throw error;
  }
};
