import {makeAutoObservable } from "mobx";


class PinStore{ 
    currGuess:Array<number> = [];
    secondsLeft:number = 60;
    visible: boolean = false;
    pin: number[] = []
    won:boolean = false;
    attempts: any[] = []
    timeToSpare: number = 0
    snackMsg: string = ""

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

    setPin = (val:number[]) => {this.pin = val;}

    setSnackMsg = (val:string) => {this.snackMsg = val}

    setAttempts = (val:any[]) =>{this.attempts = val;}

    setVisible = (val:boolean) => {this.visible = val;}

    setTimeToSpare = (val:number) => {this.timeToSpare = val}

    setSecondsLeft = (seconds:number)=>{this.secondsLeft = seconds;}

    removeOneSecond = () => { this.secondsLeft = this.secondsLeft - 1;}

}

export default PinStore;