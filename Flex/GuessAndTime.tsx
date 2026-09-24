import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Guess from "../Guess/guess";

interface GuessAndTimeProps {
  secondsLeft: number;
}

const GuessAndTime: React.FC<GuessAndTimeProps> = ({ secondsLeft }) => {
  const isLow = secondsLeft <= 10;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLow) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.25, duration: 400, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [isLow, pulse]);

  return (
    <View style={styles.container}>
      <Guess />
      <View style={styles.timerRow}>
        <Text style={styles.timerLabel}>Time remaining</Text>
        <Animated.Text
          style={[styles.timerValue, isLow && styles.timerLow, { transform: [{ scale: pulse }] }]}
        >
          {secondsLeft}s
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    gap: 8,
  },
  timerLabel: {
    fontSize: 14,
    color: "#8a8a9a",
  },
  timerValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6750a4",
    minWidth: 40,
    textAlign: "center",
  },
  timerLow: {
    color: "#ff3b30",
  },
});

export default GuessAndTime;