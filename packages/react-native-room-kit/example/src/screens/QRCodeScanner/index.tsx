import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import QRScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import type { AppStackParamList } from '../../navigator';
import { styles } from './styles';
import { CustomButton } from '../../components';
import { setRoomID } from '../../redux/actions';
import { callService, validateUrl } from '../../utils/functions';
import { Constants } from '../../utils/types';
import { RootState } from '../../redux';

type WelcomeScreenProp = NativeStackNavigationProp<
  AppStackParamList,
  'WelcomeScreen'
>;

const QRCodeScanner = () => {
  const { navigate, goBack } = useNavigation<WelcomeScreenProp>();
  const dispatch = useDispatch();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const debugMode = useSelector(
    (state: RootState) => state.app.joinConfig.debugMode
  );
  const isFocused = useIsFocused();

  const onScanSuccess = (e: BarCodeReadEvent) => {
    const joiningLink = e.data.replace('meeting', 'preview');

    if (validateUrl(joiningLink) && joiningLink.includes('app.100ms.live/')) {
      dispatch(setRoomID(joiningLink));
      callService(
        joiningLink,
        (
          roomCode: string,
          userId: string,
          tokenEndpoint: string | undefined,
          initEndpoint: string | undefined
        ) => {
          // Saving Meeting Link to Async Storage for persisting it between app starts.
          AsyncStorage.setItem(
            Constants.MEET_URL,
            joiningLink.replace('preview', 'meeting')
          );
          // @ts-ignore
          navigate('HMSPrebuiltScreen', {
            roomCode,
            userId,
            initEndPoint: initEndpoint,
            tokenEndPoint: tokenEndpoint,
            debugMode, // default is false, will deal with this later
          });
        },
        (errorMsg: string) => {
          Toast.showWithGravity(errorMsg, Toast.LONG, Toast.TOP);
        }
      );
    } else {
      goBack();
      Alert.alert('Error', 'Invalid URL');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 24 + top,
          paddingLeft: 24 + left,
          paddingRight: 24 + right,
          paddingBottom: 24 + bottom,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerIconContainer} onPress={goBack}>
          <Ionicons size={24} style={styles.headerIcon} name="chevron-back" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>
      {isFocused ? (
        <QRScanner
          onRead={onScanSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />
      ) : (
        <View style={styles.grow} />
      )}
      <CustomButton
        title="Join with Link Instead"
        onPress={goBack}
        viewStyle={styles.joinWithLink}
        textStyle={styles.joinWithLinkText}
        LeftIcon={
          <Ionicons size={24} style={styles.joinWithLinkIcon} name="link" />
        }
      />
    </View>
  );
};

export { QRCodeScanner };