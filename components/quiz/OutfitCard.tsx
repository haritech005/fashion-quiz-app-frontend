// components/quiz/OutfitCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Outfit } from "../../types/outfit";
import { COLORS } from "../../constants/theme";

interface Props {
  outfit?: Outfit; // make optional
}

const OutfitCard: React.FC<Props> = ({ outfit }) => {
  if (!outfit) return null; // Safely handle undefined

  return (
    <View style={styles.card}>
      <Image source={{ uri: outfit.image }} style={styles.image} />
      <Text style={styles.title}>{outfit.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: "90%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    marginVertical: 12,
  },
});

export default OutfitCard;
