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
  useColorScheme,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFonts, Sora_400Regular, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import AnimatedTextField from "../../components/auth/AnimatedTextField";
import GradientActionButton from "../../components/auth/GradientActionButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const glowY = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

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
        hairline: "rgba(255,255,255,0.13)",
        ghostBg: "rgba(255,255,255,0.04)",
        ghostText: "#ECECFF"
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
        hairline: "#E4E6FF",
        ghostBg: "#EEF0FF",
        ghostText: "#27273D"
      };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowY, {
          toValue: -8,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(glowY, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [glowY]);

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer>
      {/* Root keyboard-safe container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
        style={[styles.root, { backgroundColor: palette.screenBg }]}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Hero Section: bold asymmetric brand moment */}
          <View style={styles.heroWrap}>
            <LinearGradient
              colors={["#5C5CDB", "#4636A8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.geoCircleA} />
              <View style={styles.geoCircleB} />
              <View style={styles.geoLine} />
              <View style={styles.geoLineSmall} />

              <Animated.View style={[styles.heroGlowOrb, { transform: [{ translateY: glowY }] }]} />

              <Text style={styles.headline}>smart money starts here.</Text>
              <Text style={styles.tagline}>Your smart finance companion</Text>
            </LinearGradient>
          </View>

          {/* Form Section: clean, premium, minimal */}
          <View style={[styles.formWrap, { backgroundColor: palette.panelBg }]}>
            <AnimatedTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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

            <Pressable style={styles.forgotWrap} onPress={() => router.push("/(auth)/forgot-password") }>
              <Text style={[styles.forgotText, { color: "#7C7CEB" }]}>Forgot password?</Text>
            </Pressable>

            <GradientActionButton label="Sign In" onPress={() => router.replace("/(tabs)")} />

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: palette.hairline }]} />
              <Text style={[styles.dividerText, { color: palette.muted }]}>or continue with</Text>
              <View style={[styles.dividerLine, { backgroundColor: palette.hairline }]} />
            </View>

            <Pressable
              style={[styles.googleButton, { backgroundColor: palette.ghostBg, borderColor: palette.hairline }]}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={[styles.googleText, { color: palette.ghostText }]}>Continue with Google</Text>
            </Pressable>

            <Pressable style={styles.switchWrap} onPress={() => router.push("/(auth)/sign-up") }>
              <Text style={[styles.switchText, { color: palette.muted }]}>New to Pocket Plan? </Text>
              <Text style={styles.switchCta}>Create account</Text>
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
    minHeight: "40%"
  },
  heroGradient: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 26,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 20,
    overflow: "hidden"
  },
  geoCircleA: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    right: -40,
    top: -30
  },
  geoCircleB: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    left: -45,
    bottom: -50
  },
  geoLine: {
    position: "absolute",
    width: 280,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.16)",
    bottom: -62,
    right: -70,
    transform: [{ rotate: "-14deg" }]
  },
  geoLineSmall: {
    position: "absolute",
    width: 180,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.14)",
    bottom: 26,
    left: -50,
    transform: [{ rotate: "12deg" }]
  },
  heroGlowOrb: {
    position: "absolute",
    width: 108,
    height: 108,
    borderRadius: 999,
    top: 18,
    right: 14,
    backgroundColor: "rgba(194, 187, 255, 0.28)"
  },
  headline: {
    color: "#FFFFFF",
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1,
    fontFamily: "Sora_800ExtraBold"
  },
  tagline: {
    color: "rgba(242,244,255,0.9)",
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Sora_400Regular"
  },
  formWrap: {
    marginTop: -34,
    marginHorizontal: 14,
    borderRadius: 24,
    padding: 16,
    paddingTop: 12
  },
  eyeText: {
    color: "#A4A9CF",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginLeft: 8
  },
  forgotWrap: {
    alignItems: "flex-end",
    marginBottom: 12
  },
  forgotText: {
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  dividerRow: {
    marginTop: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  dividerLine: {
    flex: 1,
    height: 1
  },
  dividerText: {
    fontSize: 11,
    fontFamily: "Sora_400Regular"
  },
  googleButton: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  googleIcon: {
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    color: "#60A5FA"
  },
  googleText: {
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
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
    fontSize: 12,
    color: "#7C7CEB",
    fontFamily: "Sora_700Bold"
  }
});
