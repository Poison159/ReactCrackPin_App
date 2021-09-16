import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";

export interface AttemptProps{
    attempts: any[];
}

const Attempt : React.FC<AttemptProps> = ({attempts}) => {

    return (
          <>
            {
            attempts.map( attempt => (
                <View style={[styles.container, {flexDirection: "row"}]}>
                    {
                        attempt.map((digit:any, i:number) => (
                            <Card containerStyle={{flex: 2,backgroundColor:digit.color}}>
                                <Text
                                    key={i}
                                    style={{fontWeight:"bold",textAlign:"center",fontSize:24}}
                                >{digit.number}</Text> 
                            </Card>
                        ))
                    }
              </View>
            ))
            }
        </>
    );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card__today: {
        display: "flex",
        flexDirection: "column", 
        backgroundColor: "lightgrey"
    },
    text: {
        textAlign: 'center',
        padding: 5,
      },
});

export default Attempt;