import {makeAutoObservable } from "mobx";


class PinStore{ 
    currGuess:Array<number> = [];
    secondsLeft:number = 60;
    won:boolean = false;

    contructor(){
        makeAutoObservable(this)
    }

    addDigit = (digit:number) =>{
        if(this.currGuess.length < 4)
            this.currGuess.push(digit);
    }

    removeDigit = () =>{this.currGuess.pop();}

    removeAll = () =>{this.currGuess = [];}

    setWon = (val:boolean) =>{this.won = val;}

    setSecondsLeft = (seconds:number)=>{this.secondsLeft = seconds;}

    removeOneSecond = () => { this.secondsLeft = this.secondsLeft - 1;}


}

export default PinStore;