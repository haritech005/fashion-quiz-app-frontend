// components/quiz/RecommendationCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Outfit } from "../../types/outfit";
import { COLORS } from "../../constants/theme";

interface RecommendationCardProps {
  outfit: Outfit;
}

const { width } = Dimensions.get("window");

const RecommendationCard: React.FC<RecommendationCardProps> = ({ outfit }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Outfit Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: outfit.image }} style={styles.image} />
      </View>

      {/* Outfit Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{outfit.title}</Text>
        {outfit.category && (
          <Text style={styles.category}>{outfit.category}</Text>
        )}
        {outfit.description && (
          <Text style={styles.description}>{outfit.description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 32,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  imageWrapper: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoWrapper: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
});

export default RecommendationCard;
