import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LostCard from "./LostCard";
import WonCard from "./WonCard";
import Attempt from "../Attempts/attempt";
import { useStore } from "../store/store";


const GameStatus: React.FC<any> = () => {
  const { pinStore: { won, attempts } } = useStore();
  return (
    <View style={{ flex: 1.5, backgroundColor: "white" }}>
      {
          <>
            <Text style={{ textAlign: "center" }}>Previous Attempts</Text>
            <ScrollView style={{ height: 100 }}>
              <Attempt attempts={attempts} />
            </ScrollView>
          </>
      }
    </View>
  );
}

export default GameStatus;