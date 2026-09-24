import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useStore } from "../store/store";
import { BestTime } from "../store/PinStore";

interface WonCardProps {
  reset(): void;
}

const RANK_COLORS = ["#f0a500", "#b8b8c0", "#c98a4b"];

interface RankRowProps {
  record: BestTime;
  rank: number;
  isCurrent: boolean;
}

const RankRow: React.FC<RankRowProps> = ({ record, rank, isCurrent }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260, delay: rank * 130, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 260, delay: rank * 130, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateX, rank]);

  return (
    <Animated.View
      style={[
        styles.bestRow,
        isCurrent && styles.bestRowCurrent,
        { opacity, transform: [{ translateX }] },
      ]}
    >
      <View style={[styles.rankBadge, { backgroundColor: RANK_COLORS[rank] }]}>
        <Text style={styles.rankText}>{rank + 1}</Text>
      </View>
      <Text style={styles.bestTime}>{record.timeToSpare}s to spare</Text>
      {isCurrent && (
        <View style={styles.newPill}>
          <Text style={styles.newPillText}>NEW</Text>
        </View>
      )}
    </Animated.View>
  );
};

const WonCard: React.FC<WonCardProps> = ({ reset }) => {
  const { pinStore: { timeToSpare, bestTimes, isTop3Win, lastWinId } } = useStore();
  const [funFact, setFunFacts] = useState<any[]>([]);
  const subtitle = "Won with " + timeToSpare + " seconds to spare";

  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.9)).current;
  const alertPop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 8 }),
    ]).start();
  }, [cardOpacity, cardScale]);

  useEffect(() => {
    if (isTop3Win) {
      Animated.spring(alertPop, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 16,
        delay: 500,
      }).start();
    }
  }, [isTop3Win, alertPop]);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://api.api-ninjas.com/v1/jokes", {
          headers: {
            "X-Api-Key": "OrtxEzlVaDcKBYmzDt9yDg==XLK8RkA16JXR2v2u",
          },
        });
        const Jsonres = await res.json();
        setFunFacts(Jsonres);
      } catch (err: any) {}
    };
    fetchFact();
  }, []);

  const alertScale = alertPop.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <Animated.View
        style={[styles.wrap, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}
      >
        <Card style={styles.card}>
          <View style={styles.hero}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroCheck}>✓</Text>
            </View>
            <Text style={styles.title}>You Won!</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <Card.Cover
            source={require("../assets/d59c9002030448f1193adf7d7600a52a.png")}
            style={styles.cover}
          />

          {isTop3Win && (
            <Animated.View
              style={[styles.alertCard, { opacity: alertPop, transform: [{ scale: alertScale }] }]}
            >
              <View style={styles.alertDot} />
              <Text style={styles.alertTitle}>Top 3 Finish!</Text>
              <Text style={styles.alertBody}>
                You cracked the code with {timeToSpare}s to spare — one of the best results yet!
              </Text>
            </Animated.View>
          )}

          {Array.isArray(funFact) && funFact.length > 0 && (
            <View style={styles.factBox}>
              <View style={styles.factAccent} />
              <Text style={styles.factText}>{funFact[0].joke}</Text>
            </View>
          )}

          <View style={styles.actions}>
            <Button
              mode="contained"
              onPress={() => reset()}
              style={styles.playButton}
              contentStyle={styles.playButtonContent}
              labelStyle={styles.playButtonLabel}
            >
              Play again
            </Button>
          </View>

          <View style={styles.bestSection}>
            <Text style={styles.bestTitle}>Best Times</Text>
            {bestTimes.length === 0 ? (
              <Text style={styles.bestEmpty}>No wins recorded yet</Text>
            ) : (
              bestTimes.map((record: BestTime, i: number) => (
                <RankRow
                  key={record.id}
                  record={record}
                  rank={i}
                  isCurrent={record.id === lastWinId}
                />
              ))
            )}
          </View>
        </Card>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 8,
  },
  wrap: {
    width: "100%",
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  hero: {
    backgroundColor: "#2fb858",
    paddingTop: 26,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  heroCheck: {
    color: "#2fb858",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    marginTop: 4,
  },
  cover: {
    height: 130,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  alertCard: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#fff8e6",
    borderWidth: 1,
    borderColor: "#f2cf66",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f0a500",
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#8a6d1a",
  },
  alertBody: {
    fontSize: 13,
    color: "#7a6630",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 19,
  },
  bestSection: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  bestTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  bestEmpty: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    paddingVertical: 8,
  },
  bestRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7fb",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  bestRowCurrent: {
    backgroundColor: "#fff6df",
    borderWidth: 1,
    borderColor: "#f2cf66",
  },
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  bestTime: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginLeft: 12,
    flex: 1,
  },
  newPill: {
    backgroundColor: "#f0a500",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newPillText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  factBox: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    position: "relative",
  },
  factAccent: {
    position: "absolute",
    left: 12,
    top: 18,
    bottom: 18,
    width: 3,
    borderRadius: 2,
    backgroundColor: "#efe6ff",
  },
  factText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#555",
    textAlign: "center",
    fontStyle: "italic",
  },
  actions: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },
  playButton: {
    width: "100%",
    borderRadius: 12,
  },
  playButtonContent: {
    height: 48,
  },
  playButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default observer(WonCard);