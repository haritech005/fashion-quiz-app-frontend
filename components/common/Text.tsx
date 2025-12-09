// components/common/Text.tsx
import React from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme";

interface TextProps {
  children: React.ReactNode;
  size?: keyof typeof FONT_SIZE;
  weight?: "regular" | "medium" | "bold";
  color?: keyof typeof COLORS;
  style?: TextStyle;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "regular",
  weight = "regular",
  color = "textDark",
  style,
  numberOfLines,
}) => {
  const getFontWeight = (): TextStyle["fontWeight"] => {
    switch (weight) {
      case "regular":
        return "400";
      case "medium":
        return "600";
      case "bold":
        return "700";
      default:
        return "400";
    }
  };

  const textStyle: TextStyle = {
    fontSize: FONT_SIZE[size],
    fontWeight: getFontWeight(),
    color: COLORS[color],
  };

  return (
    <RNText
      style={[styles.base, textStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "System",
  },
});
