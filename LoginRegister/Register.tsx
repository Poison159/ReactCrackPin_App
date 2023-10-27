import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

interface RegistrationFormProps {
  setLoggedIn: (arg:boolean) => void;
}

interface PostData {
  Id: string;
  Username: string;
  Email: string;
  ImageUrl: string;
  
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ setLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const postData: PostData = {
    Id: 'a36fdte791gdtj371362hj',
    Username: 'Siya',
    Email:email,
    ImageUrl:"https://photos.google.com/photo/AF1QipMzXRQytj7RIT7dW25a3rKmtyBzFnbKYt40zvhf"
  };

  const  handleRegistration = async () => {
    try {

      const response: AxiosResponse = await axios
        .post<PostData>('https://localhost:7045/WeatherForecast/GetToken', 
          postData,{headers: {
            'Content-Type': 'application/json'
          }}
        );
      setLoggedIn(true);

    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
    // Call the registration completion callback
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegistration} style={styles.button}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default RegistrationForm;
