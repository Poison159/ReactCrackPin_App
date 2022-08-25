import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Flex from './Flex/Flex';

export default function App() {
  return (
    <>
    <Appbar style={{marginTop:35}}>
        <Text 
          style={{fontSize:24,fontWeight:"bold",textAlign:"center"}}
        >
          Crackpin
        </Text>
    </Appbar>
    <View style={styles.container}>
      <Flex/>
      <StatusBar style="auto" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
