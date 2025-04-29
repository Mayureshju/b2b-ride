import { View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import { useFonts } from 'expo-font'
import { resetAndNavigate } from '@/utils/Helpers'
import CustomText from '@/components/shared/CustomText'
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '@/store/storage'
import { useUserStore } from '@/store/userStore'
import { refresh_tokens } from '@/service/authService'

interface DecodedToken {
  exp: number;
}


const Main = () => {
  const [loaded] = useFonts({
    Bold: require('../assets/fonts/NotoSans-Bold.ttf'),
    Regular: require('../assets/fonts/NotoSans-Regular.ttf'),
    Medium: require('../assets/fonts/NotoSans-Medium.ttf'),
    Light: require('../assets/fonts/NotoSans-Light.ttf'),
    SemiBold: require('../assets/fonts/NotoSans-SemiBold.ttf')
  });

  const { user } = useUserStore()

  const [hasNavigated, setHasNavigated] = useState(false);

  const tokenCheck = async () => {
    const access_token = tokenStorage.getString('access_token') as string;
    const refresh_token = tokenStorage.getString('refresh_token') as string;

    if (access_token) {
      const decodedAccessToken = jwtDecode<DecodedToken>(access_token);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refresh_token);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('/captain/auth');
        Alert.alert('Session Expired, please login again');
      }

      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
        } catch (error) {
          console.log(error);
          Alert.alert('There was an error');
        }
      }

      if (user) {
        console.log("first")
      } else {
        resetAndNavigate('/captain/home');
      }

      return
    }

    resetAndNavigate('/captain/auth');
  };

  useEffect(() => {
    if (loaded && !hasNavigated) {
      const timeoutId = setTimeout(() => {
        tokenCheck();
        setHasNavigated(true);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [loaded, hasNavigated]);

  return (
    <View style={commonStyles.container}>
      <Image
        style={splashStyles.img}
        source={require('@/assets/images/logo_t.png')}
      />
      <CustomText style={splashStyles.text} variant='h5' fontFamily='Medium'>Made in Kuwait</CustomText>
    </View>
  );
};

export default Main;
