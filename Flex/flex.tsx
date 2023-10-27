import React , { useEffect, useState }  from "react";
import {StyleSheet, View } from "react-native";
import NumberPad from "../NumberPad/numberPad";
import GameStatus from "./GameStatus";
import GuessAndTime from "./GuessAndTime";
import SnackSecation from "./SnackSections";
import {useStore} from "../store/store";
import WonCard from "./WonCard";
import LostCard from "./LostCard";
import { CheckGuess, getRandomPin, hasWon } from "../helper/helper";

const Flex = () => {
  const {
    pinStore:{
      won,
      currGuess,
      attempts,
      pin,
      setWon,
      removeAll,
      setAttempts,
      setTimeToSpare,
      setPin
    }
  } = useStore();
    
  const [secondsLeft,setSecondsLeft]    = useState<number>(60);
  const [visible,setVisible]            = useState(false);
  const [snackMsg,setSnackMsg]          = useState<string>("");
  const onToggleSnackBar                = () => setVisible(!visible);
  const onDismissSnackBar               = () => setVisible(false);
  
  useEffect(() => {

    if(pin?.length === 0)
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
    <View style={[styles.container, {flexDirection: "column"}]}>

        { secondsLeft > 0 && !won && <GuessAndTime secondsLeft={secondsLeft}/> }

        { won && <WonCard  reset={reset}/> }

        { secondsLeft > 0 && !won  && <GameStatus/>}
        
        { secondsLeft > 0 && !won && <NumberPad/> }

        { secondsLeft == 0 && !won && <LostCard reset={reset} />}

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