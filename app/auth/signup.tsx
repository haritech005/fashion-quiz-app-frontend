// app/auth/signup.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../services/supabase";
import { COLORS, SPACING, RADIUS, FONT_SIZE } from "../../constants/theme";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const passwordInputRef = useRef<TextInput>(null);
  const confirmInputRef = useRef<TextInput>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: "", color: "" };
    if (pwd.length < 6)
      return { strength: 1, label: "Too short", color: "#DC2626" };

    let strength = 1;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength: 2, label: "Weak", color: "#F59E0B" };
    if (strength === 3) return { strength: 3, label: "Good", color: "#10B981" };
    return { strength: 4, label: "Strong", color: "#059669" };
  };

  const passwordStrength = getPasswordStrength(password);

  // Shake animation
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const signUp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    // Validation
    if (!email || !password || !confirm) {
      setErrorMsg("Please fill in all fields.");
      triggerShake();
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      triggerShake();
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      triggerShake();
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      triggerShake();
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;

      setSuccessMsg("Account created! Check your email to verify.");

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        router.replace("/auth/login");
      }, 2000);
    } catch (e: any) {
      if (e?.message.includes("already registered")) {
        setErrorMsg("This email is already registered. Please sign in.");
      } else {
        setErrorMsg(e?.message ?? "Sign up failed. Please try again.");
      }
      triggerShake();
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>AI</Text>
              </View>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Create account and start your quiz
            </Text>
          </View>

          {/* Form */}
          <Animated.View
            style={[
              styles.formContainer,
              { transform: [{ translateX: shakeAnimation }] },
            ]}
          >
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="your.email@example.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrorMsg("");
                }}
                style={[styles.input, errorMsg && styles.inputError]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={COLORS.muted}
                editable={!busy}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  ref={passwordInputRef}
                  placeholder="Create a strong password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorMsg("");
                  }}
                  secureTextEntry={!showPassword}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errorMsg && styles.inputError,
                  ]}
                  placeholderTextColor={COLORS.muted}
                  editable={!busy}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmInputRef.current?.focus()}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  disabled={busy}
                >
                  <Text style={styles.eyeText}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBars}>
                    {[1, 2, 3, 4].map((level) => (
                      <View
                        key={level}
                        style={[
                          styles.strengthBar,
                          level <= passwordStrength.strength && {
                            backgroundColor: passwordStrength.color,
                          },
                        ]}
                      />
                    ))}
                  </View>
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: passwordStrength.color },
                    ]}
                  >
                    {passwordStrength.label}
                  </Text>
                </View>
              )}
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  ref={confirmInputRef}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChangeText={(text) => {
                    setConfirm(text);
                    setErrorMsg("");
                  }}
                  secureTextEntry={!showConfirm}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    errorMsg && styles.inputError,
                  ]}
                  placeholderTextColor={COLORS.muted}
                  editable={!busy}
                  returnKeyType="done"
                  onSubmitEditing={signUp}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={styles.eyeButton}
                  disabled={busy}
                >
                  <Text style={styles.eyeText}>
                    {showConfirm ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Match Indicator */}
              {confirm.length > 0 && password.length > 0 && (
                <Text
                  style={[
                    styles.matchText,
                    {
                      color: password === confirm ? COLORS.success : "#DC2626",
                    },
                  ]}
                >
                  {password === confirm
                    ? "✓ Passwords match"
                    : "✗ Passwords don't match"}
                </Text>
              )}
            </View>

            {/* Error Message */}
            {!!errorMsg && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            )}

            {/* Success Message */}
            {!!successMsg && (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successText}>{successMsg}</Text>
              </View>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.primaryButton, busy && styles.disabled]}
              onPress={signUp}
              disabled={busy}
              activeOpacity={0.8}
            >
              {busy ? (
                <ActivityIndicator color={COLORS.background} size="small" />
              ) : (
                <Text style={styles.primaryText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign In Link */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/auth/login")}
              disabled={busy}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Text style={styles.footer}>
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: "center",
    minHeight: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.md,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.background,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.regular,
    color: COLORS.secondary,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.regular,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.primaryLight,
    padding: 16,
    borderRadius: RADIUS.lg,
    fontSize: FONT_SIZE.medium,
    color: COLORS.textDark,
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEE2E2",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: SPACING.md,
  },
  eyeText: {
    fontSize: 20,
  },
  strengthContainer: {
    marginTop: SPACING.xs,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: FONT_SIZE.small,
    fontWeight: "600",
  },
  matchText: {
    fontSize: FONT_SIZE.small,
    fontWeight: "600",
    marginTop: SPACING.xs,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: "#DC2626",
  },
  errorIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  errorText: {
    flex: 1,
    color: "#DC2626",
    fontSize: FONT_SIZE.small,
    fontWeight: "500",
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  successIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
    color: COLORS.success,
  },
  successText: {
    flex: 1,
    color: COLORS.success,
    fontSize: FONT_SIZE.small,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryText: {
    color: COLORS.background,
    fontWeight: "700",
    fontSize: FONT_SIZE.medium,
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.6,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    color: COLORS.secondary,
    fontSize: FONT_SIZE.small,
    fontWeight: "500",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 18,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: FONT_SIZE.medium,
  },
  footer: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: FONT_SIZE.small,
    marginTop: SPACING.xl,
    lineHeight: 20,
  },
});
