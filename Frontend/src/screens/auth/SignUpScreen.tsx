import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  KeyboardAvoidingView,
  Modal,
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
import worldCurrencies from "world-currencies";

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
  const [currency, setCurrency] = useState("PKR");
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [currencyQuery, setCurrencyQuery] = useState("");
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

  const flagOverrides: Record<string, string> = {
    ANG: "NL",
    EUR: "EU",
    NLG: "NL",
    XCD: "AG",
    XOF: "SN",
    XAF: "CM",
    XPF: "PF"
  };

  const symbolOverrides: Record<string, string> = {
    AMD: "֏", // Armenian Dram
    BIF: "Fr", // Burundian Franc
    GMD: "D", // Gambian Dalasi
    GNF: "Fr", // Guinean Franc
    IRR: "﷼", // Iranian Rial
    JOD: "JD", // Jordanian Dinar
    KMF: "Fr", // Comorian Franc
    SDG: "£", // Sudanese Pound
    TJS: "SM", // Tajikistani Somoni
    TND: "DT", // Tunisian Dinar
    XOF: "CFA", // CFA Franc
    XPF: "₣", // CFP Franc
    YER: "﷼" // Yemeni Rial
  };

  const toFlag = (countryCode: string) => {
    const normalized = countryCode.toUpperCase();
    if (!/^[A-Z]{2}$/.test(normalized)) return "🌐";
    return String.fromCodePoint(...normalized.split("").map((char) => char.charCodeAt(0) + 127397));
  };

  const currencyEntries = useMemo(() => {
    const data = worldCurrencies as Record<
      string,
      {
        name?: string;
        units?: {
          major?: {
            symbol?: string;
          };
        };
      }
    >;

    return Object.entries(data)
      .map(([code, detail]) => {
        const countryCode = flagOverrides[code] ?? code.slice(0, 2);
        return {
          code,
          name: detail?.name ?? code,
          symbol: symbolOverrides[code] ?? detail?.units?.major?.symbol ?? "",
          flag: toFlag(countryCode)
        };
      })
      .sort((a, b) => a.code.localeCompare(b.code));
  }, []);

  const filteredCurrencies = useMemo(() => {
    const query = currencyQuery.trim().toLowerCase();
    if (!query) return currencyEntries;
    return currencyEntries.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.symbol.toLowerCase().includes(query)
    );
  }, [currencyEntries, currencyQuery]);

  const selectedCurrency = useMemo(
    () => currencyEntries.find((item) => item.code === currency) ?? currencyEntries[0],
    [currency, currencyEntries]
  );

  const onSelectCurrency = useCallback((code: string) => {
    setCurrency(code);
    setCurrencyModalVisible(false);
    setCurrencyQuery("");
  }, []);

  const renderCurrencyItem = useCallback(
    ({ item }: { item: { code: string; name: string; symbol: string; flag: string } }) => {
      const selected = item.code === currency;
      return (
        <Pressable
          onPress={() => onSelectCurrency(item.code)}
          style={[
            styles.currencyRow,
            {
              backgroundColor: selected ? "rgba(92, 92, 219, 0.14)" : "transparent",
              borderColor: selected ? "#5C5CDB" : palette.inputBorder
            }
          ]}
        >
          <View style={styles.currencyLeftCol}>
            <Text style={styles.currencyFlag}>{item.flag}</Text>
            <View>
              <Text style={[styles.currencyCodeName, { color: palette.text }]}> 
                {item.code}  {item.name}
              </Text>
            </View>
          </View>

          <Text style={[styles.currencySymbol, { color: palette.muted }]}>{item.symbol || item.code}</Text>
        </Pressable>
      );
    },
    [currency, onSelectCurrency, palette.inputBorder, palette.muted, palette.text]
  );

  const getCurrencyItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 62,
      offset: 62 * index,
      index
    }),
    []
  );

  const stepOneValid = email.includes("@") && password.length >= 8;
  const stepTwoValid = name.trim().length > 1;
  const progressWidth = step === 1 ? "50%" : "100%";

  if (!fontsLoaded) return null;

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
                <Pressable
                  style={[styles.currencyPickerField, { backgroundColor: palette.inputBg, borderColor: palette.inputBorder }]}
                  onPress={() => setCurrencyModalVisible(true)}
                >
                  <Text style={[styles.currencyPickerText, { color: palette.text }]}>
                    {selectedCurrency ? `${selectedCurrency.flag}  ${selectedCurrency.code} — ${selectedCurrency.name}` : "Select currency"}
                  </Text>
                  <Text style={[styles.currencyPickerChevron, { color: palette.muted }]}>▼</Text>
                </Pressable>

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

            <Modal
              visible={currencyModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setCurrencyModalVisible(false)}
            >
              <View style={styles.modalRoot}>
                <Pressable style={styles.modalBackdrop} onPress={() => setCurrencyModalVisible(false)} />

                <View style={[styles.currencySheet, { backgroundColor: palette.panelBg }]}> 
                  <View style={[styles.sheetHandle, { backgroundColor: palette.inputBorder }]} />

                  <Text style={[styles.sheetTitle, { color: palette.text }]}>Select Currency</Text>

                  <TextInput
                    value={currencyQuery}
                    onChangeText={setCurrencyQuery}
                    placeholder="Search code, name, or symbol"
                    placeholderTextColor="rgba(148, 163, 184, 0.9)"
                    style={[styles.searchInput, { backgroundColor: palette.inputBg, borderColor: palette.inputBorder, color: palette.text }]}
                  />

                  <FlatList
                    data={filteredCurrencies}
                    keyExtractor={(item) => item.code}
                    renderItem={renderCurrencyItem}
                    initialNumToRender={16}
                    maxToRenderPerBatch={20}
                    windowSize={8}
                    updateCellsBatchingPeriod={40}
                    removeClippedSubviews
                    getItemLayout={getCurrencyItemLayout}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            </Modal>
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
  currencyPickerField: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currencyPickerText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
  },
  currencyPickerChevron: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)"
  },
  currencySheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    maxHeight: "74%"
  },
  sheetHandle: {
    width: 46,
    height: 4,
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 10
  },
  sheetTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Sora_700Bold"
  },
  searchInput: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Sora_400Regular"
  },
  currencyRow: {
    borderWidth: 1,
    borderRadius: 14,
    minHeight: 54,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currencyLeftCol: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  currencyFlag: {
    fontSize: 18,
    marginRight: 10
  },
  currencyCodeName: {
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  currencySymbol: {
    fontSize: 14,
    marginLeft: 10,
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
