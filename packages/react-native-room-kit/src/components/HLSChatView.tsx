import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { useHLSViewsConstraints, useHMSRoomStyleSheet } from '../hooks-util';
import { HLSChatHeaderView } from './HLSChatHeaderView';
import { HLSChatFooterView } from './HLSChatFooterView';
import { HLSChatMessages } from './HLSChatMessages';
import { HLSDescriptionPane } from './HLSDescriptionPane';
import { useIsLandscapeOrientation } from '../utils/dimension';
import type { RootState } from '../redux';
//import { HLSNotifications } from './HLSNotifications';

export const HLSChatView = () => {
  const isLandscapeOrientation = useIsLandscapeOrientation();
  const { chatWrapperConstraints } = useHLSViewsConstraints();
  const hlsFullScreen = useSelector(
    (state: RootState) => state.app.hlsFullScreen
  );

  const hmsRoomStyles = useHMSRoomStyleSheet((theme) => ({
    wrapper: {
      backgroundColor: theme.palette.surface_dim,
    },
  }));

  if (hlsFullScreen) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: isLandscapeOrientation ? undefined : 0,
        right: 0,
        width: chatWrapperConstraints.width,
        height: chatWrapperConstraints.height,
      }}
    >
      <View style={[{ flex: 1, position: 'relative' }, hmsRoomStyles.wrapper]}>
        {isLandscapeOrientation ? null : <HLSChatHeaderView />}

        <HLSChatMessages />

        <HLSChatFooterView />
        {/* Moved to HLSViewerScreenContent */}
        {/* <HLSNotifications /> */}

        {/* Below is absolute positioned and only visible when state is true */}
        {isLandscapeOrientation ? null : <HLSDescriptionPane />}
      </View>
    </View>
  );
};
