// components/common/Card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, RADIUS } from "../../constants/theme";

interface CardProps {
  children: React.ReactNode;
  padding?: keyof typeof SPACING;
  radius?: keyof typeof RADIUS;
  shadow?: boolean;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  radius = "lg",
  shadow = true,
  style,
}) => {
  const cardStyle: ViewStyle = {
    padding: SPACING[padding],
    borderRadius: RADIUS[radius],
    backgroundColor: COLORS.background,
    ...(shadow && styles.shadow),
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
