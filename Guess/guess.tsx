import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/store";

interface SlotProps {
  digit: number | undefined;
  filled: boolean;
}

const Slot: React.FC<SlotProps> = ({ digit, filled }) => {
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (filled) {
      pop.setValue(1.25);
      Animated.spring(pop, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 9,
      }).start();
    }
  }, [filled, pop]);

  return (
    <Animated.View
      style={[styles.slot, filled && styles.slotFilled, { transform: [{ scale: pop }] }]}
    >
      <Text style={[styles.digit, !filled && styles.placeholder]}>
        {digit !== undefined ? digit : "·"}
      </Text>
    </Animated.View>
  );
};

const Guess = () => {
  const { pinStore: { currGuess } } = useStore();

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((_, index) => {
        const digit = currGuess[index];
        return (
          <Slot
            key={index}
            digit={digit}
            filled={digit !== undefined}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  slot: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#cfcfcf",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  slotFilled: {
    borderStyle: "solid",
    borderColor: "#6750a4",
    backgroundColor: "#ece9f7",
  },
  digit: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6750a4",
  },
  placeholder: {
    color: "#c9c9c9",
  },
});

export default observer(Guess);