import { observer } from "mobx-react-lite";
import React  from "react";
import {Text, View } from "react-native";
import Guess from "../Guess/guess";
import { useStore } from "../store/store";


interface GuesAndTimeProps {
  secondsLeft:number
}


const GuessAndTime:React.FC<GuesAndTimeProps> = ({secondsLeft}) => {
  const {pinStore:{won}} = useStore();
    return (
        <View style={{ flex: 1.5, backgroundColor: "white" }}>
          {
            secondsLeft > 0 && !won ? 
            <>
              <Guess/>
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