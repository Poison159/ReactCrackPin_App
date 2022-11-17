

class PinStore {

    currGuess:Array<number> = [];

     addDigit(digit:number){
        if(this.currGuess.length < 4)
            this.currGuess.push(digit);
     }

     removeDigit(digit:number){
        if(this.currGuess.length < 4)
            this.currGuess.push(digit);
     }

    removeAll(){
        this.currGuess = [];
    }

}

export default  PinStore;