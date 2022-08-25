import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export interface NumberPadProps{
    clickMethod(arg:number) : void;
    removeOne: () => void;
    removeAll: () => void;
    guess:any[];
}

const NumberPad: React.FC<NumberPadProps> = ({clickMethod,guess,removeOne,removeAll}) => {
  const numbers                         = [0,1,2,3,4,5,6,7,8,9];
  const firstNumbers                    = [1,2,3];
  const secondNumbers                   = [4,5,6];
  const thirdNumbers                    = [7,8,9];


  return (
    <View style={{ flex: 4}}>
      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
          {
              firstNumbers.map( number => (
                  
                  <Button
                      onPress={() =>clickMethod(number)}
                      key={number}
                      style={{ flex: 2}} 
                  >
                  {number}
                  </Button>
                
              ))
          }
      </View>
      
      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
        {
              secondNumbers.map( number => (
                  
                  <Button
                      onPress={() =>clickMethod(number)}
                      key={number}
                      style={{ flex: 2}} 
                  >
                  {number}
                  </Button>
                
              ))
          }
      </View>

      <View style={[styles.container, {
        flexDirection: "row"
      }]}>
          {
              thirdNumbers.map( number => (
                  
                  <Button
                      onPress={() =>clickMethod(number)}
                      key={number}
                      style={{ flex: 2}} 
                  >
                  {number}
                  </Button>
                
              ))
          }
      </View>

      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
          
          <Button
              onPress={() => {removeAll()}}
              style={{ flex: 4}} 
          >
          clear all
          </Button>
          <Button
              onPress={() =>clickMethod(0)}
              style={{ flex: 2}} 
          >
          {0}
          </Button>
          <Button
              onPress={() => {removeOne()}}
              style={{ flex: 4}} 
          >
          erase
          </Button>
          
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btn_style:{
    width:"100%",
    height:"100%"
  }
});

export default NumberPad;