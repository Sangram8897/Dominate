import React, {useState, useCallback, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetBar from './NoInternetBar';
import Color from '../styles/Color';

const Container = props => {
  const netInfo = useNetInfo();

  return (
    <>
      {/* {!netInfo.isConnected && <NoInternetBar />} */}
      <SafeAreaView style={styles.container}>
        <View {...props} style={styles.container}>
          {props.children}
        </View>
        {props.isLoading && netInfo.isConnected && (
          <View style={styles.fullScreen}>
            <ActivityIndicator size="large" color={Color.primary2}/>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = {
  fullScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    borderRadius:15,
    zIndex: 9,
  },
  container: {
    flex: 1,
  },
  zIndex: {
    flex: 1,
    zIndex: 0,
  },
};
export default Container;
