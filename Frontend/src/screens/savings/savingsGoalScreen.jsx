import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";

const sanitizeNumber = (value) => value.replace(/[^0-9]/g, "");
const toCurrency = (value) => `PKR ${Math.max(0, Number(value) || 0).toLocaleString()}`;
const formatNumberInput = (value) => {
  const numeric = sanitizeNumber(String(value ?? ""));
  if (!numeric) return "";
  return Number(numeric).toLocaleString();
};

export default function SavingsGoalScreen() {
  const insets = useSafeAreaInsets();
  const [targetAmount, setTargetAmount] = useState("150000");
  const [currentSaved, setCurrentSaved] = useState("42500");
  const [monthlyContribution, setMonthlyContribution] = useState("12000");
  const [message, setMessage] = useState("");

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const targetValue = Number(targetAmount) || 0;
  const savedValue = Number(currentSaved) || 0;
  const monthlyValue = Number(monthlyContribution) || 0;
  const remaining = Math.max(0, targetValue - savedValue);
  const progress = targetValue > 0 ? Math.round((savedValue / targetValue) * 100) : 0;
  const monthsToGoal = monthlyValue > 0 ? Math.ceil(remaining / monthlyValue) : 0;

  const daysLeft = useMemo(() => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.max(0, daysInMonth - now.getDate());
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 12 }] }>
          <Text style={styles.heroTitle}>Savings Goal</Text>
          <Text style={styles.heroSub}>{daysLeft} days left in this month</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Target</Text>
              <Text style={styles.heroStatValue}>{toCurrency(targetValue)}</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Saved</Text>
              <Text style={styles.heroStatValue}>{toCurrency(savedValue)}</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Remaining</Text>
              <Text style={styles.heroStatValue}>{toCurrency(remaining)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Goal Setup</Text>
          <TextInput
            value={formatNumberInput(targetAmount)}
            onChangeText={(text) => setTargetAmount(sanitizeNumber(text))}
            placeholder="Target amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={styles.input}
          />
          <TextInput
            value={formatNumberInput(currentSaved)}
            onChangeText={(text) => setCurrentSaved(sanitizeNumber(text))}
            placeholder="Current savings"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={styles.input}
          />
          <TextInput
            value={formatNumberInput(monthlyContribution)}
            onChangeText={(text) => setMonthlyContribution(sanitizeNumber(text))}
            placeholder="Monthly contribution"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={styles.input}
          />

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, progress))}%` }]} />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Progress: {Math.max(0, progress)}%</Text>
            <Text style={styles.summaryText}>ETA: {monthsToGoal || 0} months</Text>
          </View>

          <PrimaryButton
            label="Save Goal"
            onPress={() => setMessage("Savings goal updated for this session")}
            style={{ marginTop: 10 }}
          />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FF"
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 0
  },
  hero: {
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSub: {
    marginTop: 6,
    color: "#DCE2FF",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  heroStats: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12
  },
  heroStatItem: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderColor: "rgba(255,255,255,0.24)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10
  },
  heroStatLabel: {
    color: "#DCE2FF",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  heroStatValue: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderColor: "#DDE3F4",
    borderWidth: 1,
    padding: 12,
    marginBottom: 10
  },
  sectionTitle: {
    color: "#1F2937",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    marginBottom: 9
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    backgroundColor: "#FFFFFF",
    marginBottom: 8
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    overflow: "hidden",
    marginTop: 4
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  summaryRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  summaryText: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  message: {
    color: "#2E2FA8",
    fontSize: 11,
    fontFamily: "Sora_700Bold",
    marginTop: 8
  }
});
