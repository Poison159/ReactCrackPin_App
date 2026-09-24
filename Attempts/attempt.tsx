import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export interface AttemptProps {
  attempts: any[];
}

const COLOR_MAP: Record<string, string> = {
  green: "#34c759",
  orange: "#ff9500",
  red: "#ff3b30",
};

interface AttemptRowProps {
  attempt: any[];
  number: number;
}

const AttemptRow: React.FC<AttemptRowProps> = ({ attempt, number }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-10)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 4 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }),
    ]).start();
  }, [opacity, translateY, scale]);

  return (
    <Animated.View
      style={[styles.row, { opacity, transform: [{ translateY }, { scale }] }]}
    >
      <Text style={styles.attemptNumber}>{number}</Text>
      {attempt.map((digit: any, i: number) => (
        <View
          key={i}
          style={[
            styles.chip,
            { backgroundColor: COLOR_MAP[digit.color] ?? digit.color },
          ]}
        >
          <Text style={styles.digit}>{digit.number}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const Attempt: React.FC<AttemptProps> = ({ attempts }) => {
  if (attempts.length === 0) {
    return (
      <Text style={styles.empty}>
        No attempts yet — pick a digit on the keypad below
      </Text>
    );
  }

  return (
    <>
      {attempts.map((attempt, index) => (
        <AttemptRow
          key={attempts.length - index}
          attempt={attempt}
          number={attempts.length - index}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  attemptNumber: {
    width: 20,
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginRight: 10,
  },
  chip: {
    flex: 1,
    height: 34,
    borderRadius: 10,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  digit: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Attempt;