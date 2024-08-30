import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    avatar: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedName = await AsyncStorage.getItem('name');
        const storedAvatar = await AsyncStorage.getItem('avatar');
        
        setUserInfo({
          userId: storedUserId || '',
          name: storedName || '',
          avatar: storedAvatar || '',
        });
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      }
    };

    loadUserData();
  }, []); 

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
