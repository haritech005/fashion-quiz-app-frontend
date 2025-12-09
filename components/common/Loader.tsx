// components/common/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, FONT_SIZE } from "../../constants/theme";
import { Text } from "./Text";

interface LoaderProps {
  text?: string;
  fullscreen?: boolean;
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  text,
  fullscreen = false,
  size = "large",
  color = COLORS.primary,
  style,
}) => {
  const containerStyle = fullscreen ? styles.fullscreen : styles.inline;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text size="regular" color="secondary" style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  inline: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  text: {
    marginTop: SPACING.md,
  },
});
