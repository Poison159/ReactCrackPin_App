import React  from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LostCard from "./LostCard";
import WonCard from "./WonCard";
import Attempt from "../Attempts/attempt";
import { useStore } from "../store/store";


interface GameStatusProps{
    reset():void,
    attempts:any[],
    timeToSpare:number
    secondsLeft:number
}

const GameStatus: React.FC<GameStatusProps> = ({reset,attempts,timeToSpare,secondsLeft}) => {
  const {pinStore:{won}} = useStore();
    return(
      <View style={{ flex: 5, backgroundColor: "white", height:"90%" }}>
        {
          won ? 
            <WonCard timeToSpare={timeToSpare} reset={reset}/>
          :
          <>
            {
              secondsLeft > 0 ?
              <>
                <Text style={{textAlign: "center"}}>Previous Attempts</Text>
                <ScrollView style={{height:100}}>
                  <Attempt attempts={attempts}/>
                </ScrollView>
              </>
              :
                <LostCard reset={reset}/>
            }
          </>
        }
      </View>
    );
}

export default GameStatus;