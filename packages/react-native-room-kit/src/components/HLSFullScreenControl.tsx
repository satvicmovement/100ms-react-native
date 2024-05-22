import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { MaximizeIcon } from '../Icons';
import type { RootState } from '../redux';
import { setHlsFullScreen } from '../redux/actions';

interface HLSFullScreenControlProps {
  onPress?: () => void;
}

export const _HLSFullScreenControl: React.FC<HLSFullScreenControlProps> = ({
  onPress,
}) => {
  const dispatch = useDispatch();
  const hlsFullScreen = useSelector(
    (state: RootState) => state.app.hlsFullScreen
  );
  const toggleFullScreen = () => {
    onPress?.();
    dispatch(setHlsFullScreen(!hlsFullScreen));
  };

  return (
    <GestureDetector gesture={Gesture.Tap()}>
      <TouchableOpacity
        onPress={toggleFullScreen}
        style={[styles.icon, hlsFullScreen ? styles.iconbkgc : styles.iconbkgt]}
      >
        {hlsFullScreen ? (
          <Text style={styles.btnTxt}>Chat</Text>
        ) : (
          <MaximizeIcon size="medium" />
        )}
      </TouchableOpacity>
    </GestureDetector>
  );
};

export const HLSFullScreenControl = React.memo(_HLSFullScreenControl);

const styles = StyleSheet.create({
  icon: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  iconbkgt: {
    backgroundColor: 'transparent',
  },
  iconbkgc: {
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  btnTxt: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: 'black',
  },
});
