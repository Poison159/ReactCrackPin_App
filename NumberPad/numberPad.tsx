import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/store";

interface KeyProps {
  label: string | number;
  onPress: () => void;
  variant?: "digit" | "action";
}

const KEY_SIZE = 64;

const Key: React.FC<KeyProps> = ({ label, onPress, variant = "digit" }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.86,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={({ pressed }) => [
          styles.key,
          variant === "digit" ? styles.keyDigit : styles.keyAction,
          pressed && (variant === "digit" ? styles.keyDigitPressed : styles.keyActionPressed),
        ]}
      >
        <Text style={[styles.label, variant === "action" && styles.actionLabel]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

const NumberPad = () => {
  const { pinStore: { addDigit, removeAll, removeDigit } } = useStore();
  const rows: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num) => (
            <Key key={num} label={num} onPress={() => addDigit(num)} />
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <Key label="AC" variant="action" onPress={() => removeAll()} />
        <Key label="0" onPress={() => addDigit(0)} />
        <Key label="DEL" variant="action" onPress={() => removeDigit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  key: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: KEY_SIZE / 2,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  keyDigit: {
    borderColor: "#cdc6ef",
    backgroundColor: "#faf9ff",
  },
  keyDigitPressed: {
    backgroundColor: "#e8e4f8",
  },
  keyAction: {
    borderColor: "#d7d7df",
    backgroundColor: "#fff",
  },
  keyActionPressed: {
    backgroundColor: "#f0f0f4",
  },
  label: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6750a4",
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8a8a9a",
    letterSpacing: 1,
  },
});

export default observer(NumberPad);