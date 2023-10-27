
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from 'react-native-elements'
import {useStore} from "../store/store";

export interface GuessProps{
}

const Guess : React.FC<GuessProps> = ({}) => {
    const {pinStore:{currGuess}} = useStore();
    
return (
    <>
        <View style={[styles.container, {
            flexDirection: "row"
         }]}>
             {
                currGuess.map((numb,index) => (
                    <Card key={index}>
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