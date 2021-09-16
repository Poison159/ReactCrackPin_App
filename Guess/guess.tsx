
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export interface GuessProps{
    guess:any[];
}

const Guess : React.FC<GuessProps> = ({guess}) => {
    
return (

    <>
        
        <View style={[styles.container, {
            flexDirection: "row"
         }]}>
             {
                guess.map(numb => (
                    <Card key={numb}>
                        <Text>{numb}</Text>
                    </Card>
                ))      
            }
        </View>
    </>
)};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Guess;