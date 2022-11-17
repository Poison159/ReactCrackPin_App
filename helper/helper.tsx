import React, {useState} from "react"

export const CheckGuess = (guess:any,pin:any) => {
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
  
export const hasWon = (tempArray: any[]) => {
    let winner = true;
    for(let i = 0; i < tempArray.length; i++){
        if(tempArray[i].color !== 'green')
        winner = false
    }
    return winner;
}


export const getSnack = (secondsLeft:number,won:boolean) =>{
  const [visible, setVisible]           = useState(false);
  const onToggleSnackBar                = () => setVisible(!visible);
  const [snackMsg,setSnackMsg]          = useState<string>("");

  if(secondsLeft === 10){
    onToggleSnackBar();
    setSnackMsg("10 secnods lefft");
  }
  if(secondsLeft === 0 && !won){
    onToggleSnackBar();
    setSnackMsg("you could not carck the code in time");
  }
}

export const getRandomPin = () =>{
    let pin = [];
    let arr = [0,1,2,3,4,5,6,7,8,9];

    for(let i = 0; i < 4; i++){
        const rndInt = arr[Math.floor(Math.random() * arr.length)];
        pin.push(rndInt);
        arr.splice(arr.indexOf(rndInt), 1);
    }
    return pin;
}

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

const samePosition = (numb:number, pin:number[], pos:number) => {
    const index = pin.findIndex((item)=> item === numb);
    return pos === index ? true : false;
}