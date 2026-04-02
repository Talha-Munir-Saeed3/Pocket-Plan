import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts, Sora_400Regular, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import AnimatedTextField from "../../components/auth/AnimatedTextField";
import GradientActionButton from "../../components/auth/GradientActionButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [step, setStep] = useState<1 | 2>(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [income, setIncome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  if (!fontsLoaded) return null;

  const isDark = colorScheme !== "light";

  const palette = isDark
    ? {
        screenBg: "#0A0A1A",
        panelBg: "#111126",
        text: "#FFFFFF",
        muted: "#B4B6D3",
        inputBg: "rgba(255,255,255,0.07)",
        inputBorder: "rgba(255,255,255,0.14)",
        inputBorderActive: "#7C7CEB",
        label: "#A7ABCC",
        labelActive: "#D7D9F6",
        error: "#EF4444",
        progressTrack: "rgba(255,255,255,0.16)"
      }
    : {
        screenBg: "#F7F6FF",
        panelBg: "#FFFFFF",
        text: "#0F0F1A",
        muted: "#666C84",
        inputBg: "#F0F0FF",
        inputBorder: "#DCDDF8",
        inputBorderActive: "#7C7CEB",
        label: "#667085",
        labelActive: "#5C5CDB",
        error: "#EF4444",
        progressTrack: "#E5E7FF"
      };

  const stepOneValid = firstName.trim().length > 1 && lastName.trim().length > 1 && email.includes("@");
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const stepTwoValid =
    phone.trim().length >= 10 && income.trim().length > 0 && password.length >= 8 && passwordsMatch && agreeToTerms;

  const inlineError = useMemo(() => {
    if (step !== 2) return "";
    if (confirmPassword.length > 0 && !passwordsMatch) return "Passwords do not match.";
    if (password.length > 0 && password.length < 8) return "Password must be at least 8 characters.";
    return "";
  }, [confirmPassword.length, password.length, passwordsMatch, step]);

  const progressWidth = step === 1 ? "50%" : "100%";

  const goToStepTwo = () => {
    if (!stepOneValid) return;
    setStep(2);
  };

  const goToStepOne = () => {
    setStep(1);
  };

  return (
    <ScreenContainer>
      {/* Root keyboard-safe container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        style={[styles.root, { backgroundColor: palette.screenBg }]}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Hero section with progress */}
          <View style={styles.heroWrap}>
            <LinearGradient
              colors={["#171936", "#5C5CDB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroShapeA} />
              <View style={styles.heroShapeB} />

              <View style={[styles.progressTrack, { backgroundColor: palette.progressTrack }]}>
                <View style={[styles.progressFill, { width: progressWidth }]} />
              </View>

              <Text style={styles.heroEyebrow}>Create account</Text>
              <Text style={styles.heroTitle}>let&apos;s set up your future.</Text>
              <Text style={styles.heroSub}>{step === 1 ? "Step 1 of 2" : "Step 2 of 2"}</Text>
            </LinearGradient>
          </View>

          {/* Step form section */}
          <View style={[styles.formWrap, { backgroundColor: palette.panelBg }]}>
            {step === 1 ? (
              <View>
                <View style={styles.nameRow}>
                  <View style={styles.nameCol}>
                    <AnimatedTextField
                      label="First Name"
                      value={firstName}
                      onChangeText={setFirstName}
                      palette={palette}
                    />
                  </View>

                  <View style={styles.nameCol}>
                    <AnimatedTextField
                      label="Last Name"
                      value={lastName}
                      onChangeText={setLastName}
                      palette={palette}
                    />
                  </View>
                </View>

                <AnimatedTextField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  palette={palette}
                />

                <GradientActionButton label="Continue" onPress={goToStepTwo} disabled={!stepOneValid} />
              </View>
            ) : (
              <View>
                <AnimatedTextField
                  label="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  palette={palette}
                />

                <AnimatedTextField
                  label="Monthly Income (PKR)"
                  value={income}
                  onChangeText={setIncome}
                  keyboardType="numeric"
                  palette={palette}
                />

                <AnimatedTextField
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  palette={palette}
                  rightAccessory={<Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>}
                  rightAccessoryPress={() => setShowPassword((prev) => !prev)}
                />

                <AnimatedTextField
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  palette={palette}
                  rightAccessory={<Text style={styles.eyeText}>{showConfirmPassword ? "Hide" : "Show"}</Text>}
                  rightAccessoryPress={() => setShowConfirmPassword((prev) => !prev)}
                />

                {inlineError ? <Text style={[styles.errorText, { color: palette.error }]}>{inlineError}</Text> : null}

                <Pressable style={styles.termsRow} onPress={() => setAgreeToTerms((prev) => !prev)}>
                  <View style={[styles.termsBox, agreeToTerms && styles.termsBoxActive]}>
                    {agreeToTerms ? <Text style={styles.termsTick}>✓</Text> : null}
                  </View>
                  <Text style={[styles.termsText, { color: palette.muted }]}>I agree to Terms and Privacy Policy.</Text>
                </Pressable>

                <View style={styles.stepTwoActions}>
                  <Pressable onPress={goToStepOne} style={styles.backButton}>
                    <Text style={styles.backText}>Back</Text>
                  </Pressable>

                  <View style={styles.createBtnWrap}>
                    <GradientActionButton
                      label="Create Account"
                      onPress={() => router.replace("/(tabs)")}
                      disabled={!stepTwoValid}
                    />
                  </View>
                </View>
              </View>
            )}

            <Pressable style={styles.switchWrap} onPress={() => router.push("/(auth)/sign-in") }>
              <Text style={[styles.switchText, { color: palette.muted }]}>Already have an account? </Text>
              <Text style={styles.switchCta}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scroll: {
    paddingBottom: 22
  },
  heroWrap: {
    minHeight: "34%"
  },
  heroGradient: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 12,
    overflow: "hidden"
  },
  heroShapeA: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 999,
    right: -28,
    top: -20,
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  heroShapeB: {
    position: "absolute",
    width: 240,
    height: 70,
    left: -70,
    bottom: -40,
    transform: [{ rotate: "-13deg" }],
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 18
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#A6ABFF"
  },
  heroEyebrow: {
    color: "rgba(240,241,255,0.85)",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.8,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSub: {
    marginTop: 8,
    color: "rgba(238,239,255,0.9)",
    fontSize: 13,
    fontFamily: "Sora_400Regular"
  },
  formWrap: {
    marginTop: -8,
    marginHorizontal: 14,
    borderRadius: 24,
    padding: 16
  },
  nameRow: {
    flexDirection: "row",
    gap: 10
  },
  nameCol: {
    flex: 1
  },
  eyeText: {
    color: "#A4A9CF",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginLeft: 8
  },
  errorText: {
    marginTop: -4,
    marginBottom: 8,
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  termsRow: {
    marginTop: 4,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  termsBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7C7CEB",
    alignItems: "center",
    justifyContent: "center"
  },
  termsBoxActive: {
    backgroundColor: "#5C5CDB"
  },
  termsTick: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Sora_700Bold"
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Sora_400Regular"
  },
  stepTwoActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  backButton: {
    width: 72,
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "rgba(124,124,235,0.14)",
    alignItems: "center",
    justifyContent: "center"
  },
  backText: {
    color: "#7C7CEB",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  createBtnWrap: {
    flex: 1
  },
  switchWrap: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "center"
  },
  switchText: {
    fontSize: 12,
    fontFamily: "Sora_400Regular"
  },
  switchCta: {
    color: "#7C7CEB",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  }
});
