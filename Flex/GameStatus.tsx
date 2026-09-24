import { observer } from "mobx-react-lite";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Attempt from "../Attempts/attempt";
import { useStore } from "../store/store";

const GameStatus = () => {
  const { pinStore: { attempts } } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Attempts</Text>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        <Attempt attempts={attempts} />
      </ScrollView>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#34c759" }]} />
          <Text style={styles.legendText}>Correct</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#ff9500" }]} />
          <Text style={styles.legendText}>Wrong spot</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#ff3b30" }]} />
          <Text style={styles.legendText}>Not in PIN</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    paddingVertical: 10,
  },
  scroll: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
});

export default observer(GameStatus);