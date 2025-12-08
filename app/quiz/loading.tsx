// app/quiz/loading.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

const LoadingScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate backend processing / recommendation generation
    const timer = setTimeout(() => {
      router.replace("/quiz/results"); // Navigate to results screen
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Generating your personalized recommendations...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default LoadingScreen;
