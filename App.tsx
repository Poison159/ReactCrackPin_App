import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Flex from './Flex/flex';
import RegistrationForm from './LoginRegister/Register';

export default function App() {
  const [loggedIn,setLoggedIn] = useState(false);
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
      {
        !loggedIn ? <RegistrationForm setLoggedIn={setLoggedIn}/> : <Flex/>
      }
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
