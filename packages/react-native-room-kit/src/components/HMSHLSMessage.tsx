import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import type { HMSMessage } from '@100mslive/react-native-hms';

import { useHMSRoomStyleSheet, useModalType } from '../hooks-util';
import { PinIcon, ThreeDotsIcon } from '../Icons';
import { setSelectedMessageForAction } from '../redux/actions';
import { ModalTypes } from '../utils/types';
import type { RootState } from '../redux';

interface HMSHLSMessageProps {
  message: HMSMessage;
}

const _HMSHLSMessage: React.FC<HMSHLSMessageProps> = ({ message }) => {
  const dispatch = useDispatch();
  const { handleModalVisibleType } = useModalType();

  const isPinned = useSelector(
    (state: RootState) =>
      state.messages.pinnedMessages.findIndex(
        (pinnedMessage) => pinnedMessage.id === message.messageId
      ) >= 0
  );

  const messageSender = message.sender;

  const hmsRoomStyles = useHMSRoomStyleSheet(
    (theme, typography) => ({
      regularSurfaceHigh: {
        fontFamily: `${typography.font_family}-Regular`,
        color: theme.palette.on_surface_high,
      },
      semiBoldSurfaceLow: {
        fontFamily: `${typography.font_family}-SemiBold`,
        color: theme.palette.on_surface_low,
      },
      threeDots: {
        tintColor: '#ffffff',
      },
      pinnedLabel: {
        color: '#ffffff',
      },
    }),
    []
  );

  const onThreeDotsPress = () => {
    dispatch(setSelectedMessageForAction(message));
    handleModalVisibleType(ModalTypes.MESSAGE_OPTIONS);
  };

  const handleLinkPress = async (url: string) => {
    if (!message.sender?.name && !message.sender?.peerID) {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      }
    }
  };

  const _splitLinksAndContent = (
    text: string,
    { pressHandler, style }: any
  ): string | (string | React.ReactElement)[] => {
    // Regular expression to find links in a string
    const pattern = /http[s]?:\/\/\S+/g;

    // Find all links in the text
    const links = text.match(pattern) || [];

    if (links.length <= 0) {
      return text;
    }

    // Split the text into an array of links and content
    const parts = text.replace(pattern, '^<link>^').split('^');

    return parts.map((p, i) => {
      if (p !== '<link>') {
        return p;
      }
      const link = links.pop();
      return link ? (
        <Text key={link + i} onPress={() => pressHandler(link)} style={style}>
          {link}
        </Text>
      ) : (
        p
      );
    });
  };

  const canTakeAction = false;

  return (
    <View style={styles.container}>
      {isPinned ? (
        <View style={styles.pinLabelContainer}>
          <PinIcon
            type="pin"
            style={[styles.pinIcon, hmsRoomStyles.threeDots]}
          />
          <Text style={[styles.pinnedLabel, hmsRoomStyles.pinnedLabel]}>
            PINNED
          </Text>
        </View>
      ) : null}

      <View style={styles.messageWrapper}>
        <Text style={[styles.message, hmsRoomStyles.regularSurfaceHigh]}>
          <Text style={hmsRoomStyles.semiBoldSurfaceLow}>
            {messageSender
              ? messageSender.isLocal
                ? 'You'
                : messageSender.name
              : 'Anonymous'}
            {'   '}
          </Text>
          {_splitLinksAndContent(message.message, {
            pressHandler: handleLinkPress,
            style: styles.link,
          })}
        </Text>

        {canTakeAction ? (
          <TouchableOpacity
            hitSlop={styles.threeDotsHitSlop}
            onPress={onThreeDotsPress}
          >
            <ThreeDotsIcon
              stack="vertical"
              style={[styles.threeDots, hmsRoomStyles.threeDots]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const HMSHLSMessage = React.memo(_HMSHLSMessage);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  messageWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  message: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: Platform.OS === 'android' ? 20 : undefined,
    letterSpacing: 0.25,
  },
  threeDots: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
  threeDotsHitSlop: {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
  },
  pinLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pinIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  pinnedLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    lineHeight: 16,
    letterSpacing: 1.5,
  },
  link: {
    color: '#6C9CD1',
  },
});
