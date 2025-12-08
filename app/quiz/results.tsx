// app/quiz/results.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecommendationCard from "../../components/quiz/RecommendationCard";
import { COLORS } from "../../constants/theme";
import { Outfit } from "../../types/outfit";
import { useRouter } from "expo-router";

// Dummy recommended outfits
const dummyRecommendations: Outfit[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Recommended Outfit ${i + 1}`,
  image: "https://via.placeholder.com/300x400",
  category: i % 3 === 0 ? "Casual" : i % 3 === 1 ? "Formal" : "Traditional",
  description: "You liked similar styles, so this outfit was selected for you.",
}));

const ResultsScreen: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Outfit[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching recommended outfits (replace with backend call later)
    setRecommendations(dummyRecommendations);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.header}>Your Style Recommendations</Text>
      <Text style={styles.subHeader}>
        Based on your preferences, we’ve picked these outfits for you:
      </Text>

      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecommendationCard outfit={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 40,
  },
});

export default ResultsScreen;
