import React , { useEffect, useState }  from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Snackbar, Button, Card } from "react-native-paper";
import Attempt from "../Attempts/attempt";
import Guess from "../Guess/guess";
import NumberPad from "../NumberPad/numberPad";




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
  const [won,setWon]                    = useState<boolean>(false);
  const [secondsLeft,setSecondsLeft]    = useState<number>(60);
  const [guess,setGuess]                = useState<any[]>([]);
  const [pin,setPin]                    = useState<number[]>([]);
  const onToggleSnackBar                = () => setVisible(!visible);
  const onDismissSnackBar               = () => setVisible(false);
  const [snackMsg,setSnackMsg]          = useState<String>("");



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
    let seen = [];
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

  function  addNumber(numb:number) : void{
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
    setAttempts([])
    setWon(false);
    setSecondsLeft(60);
  }


  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
      }]}>
        
        <View style={{ flex: 1.5, backgroundColor: "white" }}>
          {
            secondsLeft > 0 && !won ? 
            <>
              <Guess guess={guess}/>
              <Text  style={{textAlign:"center"}}> Time remaining : {secondsLeft}</Text>
            </>
            :
            <></>
          }
          
        </View>
        
        <View style={{ flex: 5, backgroundColor: "white", height:"90%" }}>
        {
          won ? 
            <Card>
              <Card.Title style={{backgroundColor:"green"}} title="You Won" subtitle="You're a genius"></Card.Title>
              <Card.Cover source={{ uri: 'https://i.pinimg.com/originals/d5/9c/90/d59c9002030448f1193adf7d7600a52a.png' }} />
              <Card.Actions>
                <Button
                  onPress = {() => {reset();}}
                >Play again</Button>
              </Card.Actions>
            </Card>
          :
          <>
          {
            secondsLeft > 0 ?
            <>
                <Text>Previous Attempts</Text>
                <ScrollView style={{height:100}}>
                  <Attempt attempts={attempts}/>
                </ScrollView>
            </>
            :
            <>

              <Card>
                <Card.Title
                  style={{backgroundColor:"red"}}
                  title="You Lost" 
                  subtitle="You could not finish in time" 
                 ></Card.Title>
                <Card.Cover source={{ uri: 'https://www.nicepng.com/png/detail/11-119592_this-free-icons-png-design-of-sad-face.png' }} />
                <Card.Actions>
                <Button
                  onPress = {() => {reset();}}
                >Play again</Button>
              </Card.Actions>
              </Card>

            </>
          }
          </>
        }
          
         
        </View>

        <View style={{ flex: 4}}>
          <NumberPad clickMethod={addNumber} removeOne={removeOne} removeAll={removeAll} currGess={guess}/>
        </View>

        
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'close',
            onPress: () => {
              
            },
          }}>
          {snackMsg}
        </Snackbar>
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