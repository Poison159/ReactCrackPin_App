import React , { useEffect, useState }  from "react";
import {StyleSheet, Text, View } from "react-native";
import NumberPad from "../NumberPad/numberPad";
import FloatingActionButton from "./FloatingActionButton";
import GameStatus from "./GameStatus";
import GuessAndTime from "./GuessAndTime";
import SnackSecation from "./SnackSections";

const samePosition = (numb:number, pin:number[], pos:number) => {
  const index = pin.findIndex((item)=> item === numb);
  return pos === index ? true : false;
}

const hasWon = (tempArray: any[]) => {
  let winner = true;
  for(let i = 0; i < tempArray.length; i++){
    if(tempArray[i].color !== 'green')
      winner = false
  }
  return winner;
}

const getRandomPin = () =>{
  let pin = [];
  let arr = [0,1,2,3,4,5,6,7,8,9];

  for(let i = 0; i < 4; i++){
    const rndInt = arr[Math.floor(Math.random() * arr.length)];
    pin.push(rndInt);
    arr.splice(arr.indexOf(rndInt), 1);
  }
  return pin;
}

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

  const evaluateNumber = (guessNumber:number, pin: number[],pos:number) => {
    if(!pin.includes(guessNumber)){
      return { number:guessNumber,color: 'red'};
    }else{
      if(samePosition(guessNumber,pin,pos)){
        return { number:guessNumber,color: 'green'};
      }else{
        return { number:guessNumber,color: 'orange'};
      }
    }
  }

  const CheckGuess = () => {
    let temp = [];
    let seen : any[] = [];

    for(let i = 0; i < guess.length; i++){
      if(seen.includes(guess[i]))
         temp.push({ number:guess[i],color: 'red'});
      else{
        seen.push(guess[i]);
        let maping = evaluateNumber(guess[i],pin,i);
        temp.push(maping);
      }
    }
    return temp;
  }

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
    if(won){
      setSecondsLeft(0);
    }

    if(secondsLeft > 0){
      const timerId = setTimeout(() => {
        if(guess.length === 4){
          let temp = CheckGuess();
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

  function removeOne(){
    guess.pop();
  }

  function removeAll(){
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