import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Discover Your{"\n"}Unique Style</Text>
        <Text style={styles.subtitle}>
          Answer 20 quick questions and get personalized fashion recommendations
          powered by AI
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/quiz")}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Start Style Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>See How It Works →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialProofWrapper}>
        <View style={styles.socialProof}>
          <View style={styles.starsContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </View>
          <Text style={styles.proofText}>
            <Text style={styles.proofBold}>10,000+</Text> fashion enthusiasts
          </Text>
          <Text style={styles.proofSubtext}>
            have found their perfect style
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  heroSection: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    alignItems: "center",

    transform: [{ translateY: -20 }],
  },

  socialProofWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 40,
  },

  // Background Decorations
  bgCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLight,
    top: -50,
    right: -50,
    opacity: 0.5,
  },
  bgCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primaryLight,
    bottom: 300,
    left: -40,
    opacity: 0.3,
  },

  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    tintColor: COLORS.background,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    marginTop: 16,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },

  socialProof: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  star: {
    fontSize: 20,
    color: COLORS.warning,
  },
  proofText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  proofBold: {
    fontWeight: "600",
    color: COLORS.textDark,
  },
  proofSubtext: {
    fontSize: 12,
    color: COLORS.muted,
  },
});
