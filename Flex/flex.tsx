import React , { useEffect, useState }  from "react";
import {StyleSheet, Text, View } from "react-native";
import NumberPad from "../NumberPad/numberPad";
import FloatingActionButton from "./FloatingActionButton";
import GameStatus from "./GameStatus";
import GuessAndTime from "./GuessAndTime";
import SnackSecation from "./SnackSections";
import {hasWon,getRandomPin,CheckGuess} from "../helper/helper"


const Flex = () => {
  const [visible, setVisible]           = React.useState(false);
  const [attempts,setAttempts]          = useState<any[]>([]);
  const [timeToSpare,setTimeToSpare]    = useState<number>(0)
  const [won,setWon]                    = useState<boolean>(false);
  const [secondsLeft,setSecondsLeft]    = useState<number>(60);
  const [guess,setGuess]                = useState<any[]>([]);
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
          if(guess.length === 4){
            let temp = CheckGuess(guess,pin);
            if(hasWon(temp)){
              onToggleSnackBar();
              setSnackMsg("you are a genius, you cracked the code");
              setTimeToSpare(secondsLeft);
              setWon(true);
            }else{
              setAttempts([temp,...attempts]);
              setGuess([]);
            }
          }
          setSecondsLeft(secondsLeft - 1);
        },1000)
        return() => clearTimeout(timerId);
      }
  },[secondsLeft]);


  const  addNumber = (numb:number)  =>{
    if(guess.length < 4)
      setGuess([...guess, numb]);
  }

  const removeOne = () =>{
    guess.pop();
  }

  const removeAll = () =>{
    setGuess([]);
  }

  const reset = () => {
    setGuess([]);
    setPin([]);
    setAttempts([]);
    setWon(false);
    setSecondsLeft(60);
  }

  return (
    <View style={[styles.container, {
      flexDirection: "column"
      }]}>
        
        <GuessAndTime won={won} secondsLeft={secondsLeft} guess={guess} />
        <GameStatus reset={reset} secondsLeft={secondsLeft}  attempts={attempts} won={won} timeToSpare={timeToSpare}/>
        <NumberPad clickMethod={addNumber} removeOne={removeOne} removeAll={removeAll} guess={guess}/>
        <SnackSecation visible={visible} onDismissSnackBar={onDismissSnackBar} snackMsg={snackMsg}/>
       
    </View>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    padding: 20,
  },
});

export default Flex;