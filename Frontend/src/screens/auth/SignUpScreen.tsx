import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_400Regular, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import GradientActionButton from "../../components/auth/GradientActionButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [showPassword, setShowPassword] = useState(false);
  const glowY = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowY, {
          toValue: -8,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(glowY, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [glowY]);

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
        progressTrack: "rgba(255,255,255,0.16)",
        chipBg: "rgba(255,255,255,0.06)",
        chipBorder: "rgba(255,255,255,0.12)"
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
        progressTrack: "#E5E7FF",
        chipBg: "#F1F2FF",
        chipBorder: "#DCDDF8"
      };

  const currencies = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR", "JPY"];
  const stepOneValid = email.includes("@") && password.length >= 8;
  const stepTwoValid = name.trim().length > 1;
  const progressWidth = step === 1 ? "50%" : "100%";

  return (
    <ScreenContainer style={{ backgroundColor: "#5C5CDB" }} edges={["left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        style={[styles.root, { backgroundColor: palette.screenBg }]}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={[styles.heroWrap, { marginTop: -insets.top }]}> 
            <LinearGradient
              colors={["#171936", "#5C5CDB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.heroGradient, { paddingTop: insets.top + 48 }]}
            >
              <View style={styles.heroShapeA} />
              <View style={styles.heroShapeB} />
              <Animated.View style={[styles.heroGlowOrb, { transform: [{ translateY: glowY }] }]} />
              <Animated.View
                style={[
                  styles.heroSparkRing,
                  {
                    opacity: glowY.interpolate({
                      inputRange: [-8, 0],
                      outputRange: [0.85, 0.55]
                    }),
                    transform: [
                      {
                        translateY: glowY.interpolate({
                          inputRange: [-8, 0],
                          outputRange: [1, -3]
                        })
                      },
                      {
                        scale: glowY.interpolate({
                          inputRange: [-8, 0],
                          outputRange: [1.04, 0.94]
                        })
                      }
                    ]
                  }
                ]}
              />
              <Animated.View
                style={[
                  styles.heroSparkDot,
                  {
                    opacity: glowY.interpolate({
                      inputRange: [-8, 0],
                      outputRange: [0.95, 0.6]
                    }),
                    transform: [
                      {
                        translateY: glowY.interpolate({
                          inputRange: [-8, 0],
                          outputRange: [-2, 2]
                        })
                      }
                    ]
                  }
                ]}
              />

              <View style={[styles.progressTrack, { backgroundColor: palette.progressTrack }]}>
                <View style={[styles.progressFill, { width: progressWidth }]} />
              </View>

              <Text style={styles.heroEyebrow}>Create account</Text>
              <Text style={styles.heroTitle}>your finances, finally sorted.</Text>
              <Text style={styles.heroSub}>{step === 1 ? "Step 1 of 2: login details" : "Step 2 of 2: name and currency"}</Text>
            </LinearGradient>
          </View>

          <View style={[styles.formWrap, { backgroundColor: palette.panelBg }]}>
            {step === 1 ? (
              <View style={styles.stepOneWrap}>
                <Text style={[styles.fieldLabel, { color: palette.muted }]}>Email</Text>
                <View style={[styles.fieldBox, { backgroundColor: palette.inputBg, borderColor: palette.inputBorder }]}> 
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={[styles.fieldInput, { color: palette.text }]}
                    placeholder="you@example.com"
                    placeholderTextColor="rgba(148, 163, 184, 0.9)"
                  />
                </View>

                <Text style={[styles.fieldLabel, { color: palette.muted, marginTop: 8 }]}>Password</Text>
                <View style={[styles.fieldBox, styles.passwordBox, { backgroundColor: palette.inputBg, borderColor: palette.inputBorder }]}> 
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[styles.fieldInput, { color: palette.text }]}
                    placeholder="At least 8 characters"
                    placeholderTextColor="rgba(148, 163, 184, 0.9)"
                  />
                  <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                    <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
                  </Pressable>
                </View>

                <GradientActionButton label="Continue" onPress={() => setStep(2)} disabled={!stepOneValid} />
              </View>
            ) : (
              <View>
                <Text style={[styles.fieldLabel, { color: palette.muted }]}>Full Name</Text>
                <View style={[styles.fieldBox, { backgroundColor: palette.inputBg, borderColor: palette.inputBorder }]}> 
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={[styles.fieldInput, { color: palette.text }]}
                    placeholder="Your full name"
                    placeholderTextColor="rgba(148, 163, 184, 0.9)"
                  />
                </View>

                <Text style={[styles.currencyLabel, { color: palette.muted }]}>Choose your primary currency</Text>
                <View style={styles.currencyGrid}>
                  {currencies.map((item) => {
                    const selected = currency === item;
                    return (
                      <Pressable
                        key={item}
                        onPress={() => setCurrency(item)}
                        style={[
                          styles.currencyChip,
                          {
                            backgroundColor: selected ? "#5C5CDB" : palette.chipBg,
                            borderColor: selected ? "#5C5CDB" : palette.chipBorder
                          }
                        ]}
                      >
                        <Text style={[styles.currencyChipText, { color: selected ? "#FFFFFF" : palette.text }]}>{item}</Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View style={styles.stepTwoActions}>
                  <Pressable onPress={() => setStep(1)} style={styles.backButton}>
                    <Text style={styles.backText}>Back</Text>
                  </Pressable>

                  <View style={styles.createBtnWrap}>
                    <GradientActionButton label="Create Account" onPress={() => router.replace("/(tabs)")} disabled={!stepTwoValid} />
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
    paddingBottom: 12,
    flexGrow: 1
  },
  heroWrap: {
    minHeight: "34%"
  },
  heroGradient: {
    paddingHorizontal: 20,
    paddingTop: 24,
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
  heroGlowOrb: {
    position: "absolute",
    width: 104,
    height: 104,
    borderRadius: 999,
    top: 16,
    right: 14,
    backgroundColor: "rgba(194, 187, 255, 0.28)"
  },
  heroSparkRing: {
    position: "absolute",
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1.6,
    borderColor: "rgba(235, 238, 255, 0.55)",
    right: 36,
    bottom: 18
  },
  heroSparkDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(235, 238, 255, 0.85)",
    right: 54,
    bottom: 34
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
    marginTop: -2,
    marginHorizontal: 14,
    borderRadius: 24,
    padding: 16,
    paddingTop: 26,
    paddingBottom: 44
  },
  stepOneWrap: {
    marginTop: 0
  },
  fieldLabel: {
    fontSize: 13,
    marginBottom: 6,
    fontFamily: "Sora_600SemiBold"
  },
  fieldBox: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
    marginBottom: 6
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fieldInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Sora_400Regular"
  },
  eyeText: {
    color: "#A4A9CF",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginLeft: 8
  },
  currencyLabel: {
    fontSize: 13,
    marginTop: 8,
    marginBottom: 10,
    fontFamily: "Sora_600SemiBold"
  },
  currencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  currencyChip: {
    minWidth: 68,
    minHeight: 40,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  currencyChipText: {
    fontSize: 13,
    fontFamily: "Sora_700Bold"
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
