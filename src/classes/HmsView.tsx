import React, { useState, useEffect, useImperativeHandle, useRef } from 'react';
import {
  findNodeHandle,
  requireNativeComponent,
  StyleSheet,
  UIManager,
  ViewStyle,
} from 'react-native';
import { HMSVideoViewMode } from './HMSVideoViewMode';

interface HmsViewProps {
  data: {
    trackId: string;
    sink: boolean;
    id: string;
    mirror: boolean;
  };
  setZOrderMediaOverlay: boolean;
  scaleType: HMSVideoViewMode;
  style: ViewStyle;
  onChange: Function;
  onDataReturned: Function;
}

const HmsView = requireNativeComponent<HmsViewProps>('HmsView');
let _nextRequestId = 1;
let _requestMap = new Map();

interface HmsComponentProps {
  trackId: string;
  sink: boolean;
  style: ViewStyle;
  mirror?: boolean;
  scaleType?: HMSVideoViewMode;
  setZOrderMediaOverlay?: boolean;
  id: string;
}

export const HmsViewComponent = React.forwardRef<any, HmsComponentProps>(
  (props, ref) => {
    const {
      sink,
      trackId,
      style,
      id,
      mirror = false,
      setZOrderMediaOverlay = false,
      scaleType = HMSVideoViewMode.ASPECT_FILL,
    } = props;
    const hmsViewRef: any = useRef();
    const [tempVal, setTempVal] = useState(0);
    const data = {
      trackId,
      sink,
      id,
      mirror,
    };

    const onChange = (values: any) => {
      console.log(values, 'values');
      setTimeout(() => {
        setTempVal(1);
      }, 2000);
    };

    const _onDataReturned = (event: {
      nativeEvent: { requestId: any; result: any; error: any };
    }) => {
      // We grab the relevant data out of our event.
      let { requestId, result, error } = event.nativeEvent;
      // Then we get the promise we saved earlier for the given request ID.
      let promise = _requestMap.get(requestId);
      if (result) {
        // If it was successful, we resolve the promise.
        promise.resolve(result);
      } else {
        // Otherwise, we reject it.
        promise.reject(error);
      }
      // Finally, we clean up our request map.
      _requestMap.delete(requestId);
    };

    const capture = async () => {
      let requestId = _nextRequestId++;
      let requestMap = _requestMap;

      // We create a promise here that will be resolved once `_onRequestDone` is
      // called.
      let promise = new Promise(function (resolve, reject) {
        requestMap.set(requestId, { resolve, reject });
      });
      const viewManagerConfig = UIManager.getViewManagerConfig('HmsView');
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(hmsViewRef.current),
        viewManagerConfig.Commands.capture,
        [requestId]
      );
      return promise;
    };

    useImperativeHandle(ref, () => {
      return {
        capture,
      };
    });

    useEffect(() => {
      setTempVal(0);
    }, [tempVal]);

    return (
      <HmsView
        ref={hmsViewRef}
        onChange={onChange}
        data={data}
        style={tempVal === 0 ? style : temporaryStyles.customStyle}
        scaleType={scaleType}
        setZOrderMediaOverlay={setZOrderMediaOverlay}
        onDataReturned={_onDataReturned}
      />
    );
  }
);

const temporaryStyles = StyleSheet.create({
  customStyle: {
    width: '100%',
    height: '50%',
  },
});
