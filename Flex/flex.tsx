import React , { useEffect, useState }  from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NumberPad from "../NumberPad/numberPad";
import GameStatus from "./GameStatus";
import GuessAndTime from "./GuessAndTime";
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
      bestTimes,
      setWon,
      removeAll,
      setAttempts,
      setTimeToSpare,
      setPin,
      recordWin
    }
  } = useStore();

  const insets = useSafeAreaInsets();
  const [secondsLeft,setSecondsLeft]    = useState<number>(60);
  
  useEffect(() => {

    if(pin?.length === 0)
      setPin(getRandomPin());
    if(won)
      setSecondsLeft(0);

      if(secondsLeft > 0){
        const timerId = setTimeout(() => {
          if(currGuess.length === 4){
            let temp = CheckGuess(currGuess,pin);
            if(hasWon(temp)){
              setTimeToSpare(secondsLeft);
              recordWin(secondsLeft);
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

        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.title}>CrackPin</Text>
          <Text style={styles.subtitle}>Crack the 4-digit code to win</Text>
          {bestTimes.length > 0 && (
            <Text style={styles.bestLine}>
              Best: {bestTimes[0].timeToSpare}s to spare
            </Text>
          )}
        </View>

        { secondsLeft > 0 && !won && <GuessAndTime secondsLeft={secondsLeft}/> }

        { won && <WonCard  reset={reset}/> }

        { secondsLeft > 0 && !won  && <GameStatus/>}
        
        { secondsLeft > 0 && !won && <NumberPad/> }

        { secondsLeft == 0 && !won && <LostCard reset={reset} /> }

    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#6750a4',
  },
  subtitle: {
    fontSize: 13,
    color: '#9a9aa8',
    marginTop: 2,
  },
  bestLine: {
    fontSize: 12,
    fontWeight: "600",
    color: "#b8a3e0",
    marginTop: 2,
  },
});

export default observer(Flex);