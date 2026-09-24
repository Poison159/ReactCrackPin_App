import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface LostCardProps {
  reset(): void;
}

const LostCard: React.FC<LostCardProps> = ({ reset }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 8 }),
    ]).start();

    const shakeAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]),
      { iterations: 3 }
    );
    shakeAnim.start();
    return () => shakeAnim.stop();
  }, [opacity, scale, shake]);

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <Animated.View
      style={[styles.wrap, { opacity, transform: [{ scale }, { translateX }] }]}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>You Lost</Text>
          <Text style={styles.subtitle}>You could not finish in time</Text>
        </View>
        <Card.Cover
          source={require("../assets/11-119592_this-free-icons-png-design-of-sad-face.png")}
          style={styles.cover}
        />
        <Card.Actions style={styles.actions}>
          <Button mode="contained" buttonColor="#d64545" onPress={() => reset()}>
            Try again
          </Button>
        </Card.Actions>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#d64545",
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 4,
  },
  cover: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 16,
  },
});

export default LostCard;