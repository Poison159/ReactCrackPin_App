import React  from "react";
import {Text, View } from "react-native";
import Guess from "../Guess/guess";

interface GuesAndTimeProps {
    won:boolean,
    secondsLeft:number, 
    guess:any[]
}


const GuessAndTime:React.FC<GuesAndTimeProps> = ({won,secondsLeft,guess}) => {
    return (
        <View style={{ flex: 1.5, backgroundColor: "white" }}>
          {
            secondsLeft > 0 && !won ? 
            <>
              <Guess guess={guess}/>
              <Text></Text>
              <Text  style={{textAlign:"center"}}> Time remaining : {secondsLeft}</Text>
            </>
            :
            <></>
          }
        </View>
    );
}

export default GuessAndTime;