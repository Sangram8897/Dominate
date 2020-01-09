import React, {useState, useCallback, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetBar from './NoInternetBar';

const Container = props => {
  const netInfo = useNetInfo();

  return (
    <>
      {!netInfo.isConnected && <NoInternetBar />}
      <SafeAreaView style={styles.container}>
        <View {...props} style={styles.container}>
          {props.children}
        </View>
        {props.isLoading && netInfo.isConnected && (
          <View style={styles.fullScreen}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = {
  fullScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
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
