import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useStore } from "../store/store";


export interface NumberPadProps{}

const NumberPad: React.FC<NumberPadProps> = ({}) => {
  const {pinStore:{addDigit,removeAll, removeDigit}} = useStore();
  const firstNumbers                    = [1,2,3];
  const secondNumbers                   = [4,5,6];
  const thirdNumbers                    = [7,8,9];

  return (
    <View style={{ flex: 2}}>
      <View style={[styles.container, {
        flexDirection: "row"
      }]}>
          {
              firstNumbers.map( number => (
                  <Button
                      onPress={() => addDigit(number)}
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
          secondNumbers.map( number => (
              <Button
                  onPress={() =>addDigit(number)}
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
                    onPress={() =>addDigit(number)}
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
          <Button
              onPress={() => {removeAll()}}
              style={{ flex: 4}} 
          >
          clear all
          </Button>
          <Button
              onPress={() =>addDigit(0)}
              style={{ flex: 2}} 
          >
          {0}
          </Button>
          <Button
              onPress={() => {removeDigit()}}
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

export default observer(NumberPad);