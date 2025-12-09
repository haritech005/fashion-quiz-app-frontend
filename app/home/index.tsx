import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { COLORS } from "../../constants/theme";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setLoggingOut(true);
            try {
              const { error } = await supabase.auth.signOut();
              if (error) throw error;
              // Navigation will be handled by useAuth hook in _layout
            } catch (error: any) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to sign out. Please try again.");
              setLoggingOut(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Header with Logout */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.emailText} numberOfLines={1}>
              {user?.email || "User"}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loggingOut}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

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

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.background,
  },
  welcomeText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  emailText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "600",
    maxWidth: 180,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary + "20",
  },
  logoutIcon: {
    fontSize: 20,
  },

  heroSection: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    alignItems: "center",
    transform: [{ translateY: -40 }],
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