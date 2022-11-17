import React , { useEffect, useState }  from "react";
import {StyleSheet, Text, View } from "react-native";
import NumberPad from "../NumberPad/numberPad";
import GameStatus from "./GameStatus";
import GuessAndTime from "./GuessAndTime";
import SnackSecation from "./SnackSections";
import {hasWon,getRandomPin,CheckGuess} from "../helper/helper";
import {useStore} from "../store/store";
import { Observer } from "mobx-react";



const Flex = () => {
  const {pinStore:{won,currGuess,setWon,removeAll}} = useStore();

  const [visible, setVisible]           = React.useState(false);
  const [attempts,setAttempts]          = useState<any[]>([]);
  const [timeToSpare,setTimeToSpare]    = useState<number>(0)
  const [secondsLeft,setSecondsLeft]    = useState<number>(60);
  const [pin,setPin]                    = useState<number[]>([]);
  const onToggleSnackBar                = () => setVisible(!visible);
  const onDismissSnackBar               = () => setVisible(false);
  const [snackMsg,setSnackMsg]          = useState<string>("");

  useEffect(() => {

    if(pin.length === 0)
      setPin(getRandomPin());
    if(secondsLeft === 10){
      onToggleSnackBar();
      setSnackMsg("10 secnods lefft");
    }
    if(secondsLeft === 0 && !won){
      onToggleSnackBar();
      setSnackMsg("you could not carck the code in time");
    }
    if(won)
      setSecondsLeft(0);

      if(secondsLeft > 0){
        const timerId = setTimeout(() => {
          if(currGuess.length === 4){
            let temp = CheckGuess(currGuess,pin);
            if(hasWon(temp)){
              onToggleSnackBar();
              setSnackMsg("you are a genius, you cracked the code");
              setTimeToSpare(secondsLeft);
              setWon(true);
            }else{
              setAttempts([temp,...attempts]);
              removeAll();
            }
          }
          setSecondsLeft(secondsLeft - 1);
        },1000)
        return() => clearTimeout(timerId);
      }
  },[secondsLeft]);

  const reset = () => {
    removeAll();
    setPin([]);
    setAttempts([]);
    setWon(false);
    setSecondsLeft(60);
  }

  return (
    <View style={[styles.container, {
      flexDirection: "column"
      }]}>
        
        <GuessAndTime secondsLeft={secondsLeft}/>
        <Observer>
          {() =>
            <GameStatus reset={reset} secondsLeft={secondsLeft}  attempts={attempts} timeToSpare={timeToSpare}/>
          }
        </Observer>
        <NumberPad/>
        <SnackSecation visible={visible} onDismissSnackBar={onDismissSnackBar} snackMsg={snackMsg}/>
       
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    padding: 20,
  },
});

export default Flex;