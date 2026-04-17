import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const overviewCards = [
    { label: "Income", value: "PKR 85,000", tone: "good" },
    { label: "Spent", value: "PKR 42,500", tone: "bad" },
    { label: "Saved", value: "PKR 42,500", tone: "good" },
    { label: "Budget Used", value: "58%", tone: "warn" }
  ];

  const recentTransactions = [
    { title: "McDonald's", meta: "Food | Today, 2:45 PM", amount: -850 },
    { title: "Careem Ride", meta: "Transport | Today, 9:15 AM", amount: -450 },
    { title: "Fuel", meta: "Transport | Yesterday", amount: -3200 },
    { title: "Pharmacy", meta: "Health | Yesterday", amount: -1200 }
  ];

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />
          <Text style={styles.heroGreeting}>Welcome back, Talha</Text>
          <Text style={[styles.heroBalanceLabel, compact && styles.heroBalanceLabelCompact]}>Total available</Text>
          <Text style={[styles.heroBalanceValue, compact && styles.heroBalanceValueCompact]}>PKR 42,500</Text>
          <View style={styles.heroInsightsRow}>
            {[
              { title: "Today's spend", value: "PKR 2,430", note: "3 entries" },
              { title: "Savings rate", value: "51%", note: "Excellent" }
            ].map((item) => (
              <View key={item.title} style={styles.heroInsightCard}>
                <Text style={styles.heroInsightTitle}>{item.title}</Text>
                <Text style={styles.heroInsightValue}>{item.value}</Text>
                <Text style={styles.heroInsightNote}>{item.note}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.sectionPanel}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.row}>
            <PrimaryButton
              label="Add Transaction"
              variant="secondary"
              leftIcon={<Text style={styles.actionIcon}>+</Text>}
              style={styles.actionButton}
              onPress={() => router.push("/add-transaction")}
            />
            <PrimaryButton
              label="Budget"
              variant="secondary"
              leftIcon={<Text style={styles.actionIcon}>$</Text>}
              style={styles.actionButton}
              onPress={() => router.push("/budget")}
            />
          </View>
        </View>

        <View style={styles.sectionPanel}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewGrid}>
            {overviewCards.map((item) => (
              <View key={item.label} style={styles.overviewCard}>
                <Text style={styles.overviewLabel}>{item.label}</Text>
                <Text
                  style={[
                    styles.overviewValue,
                    item.tone === "good" && styles.valueGood,
                    item.tone === "bad" && styles.valueBad,
                    item.tone === "warn" && styles.valueWarn
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionPanel}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.linkText} onPress={() => router.push("/(tabs)/history")}>View all</Text>
          </View>
          {recentTransactions.map((item) => (
            <View key={item.title} style={styles.transactionItem}>
              <View style={styles.rowBetweenInner}>
                <View>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionMeta}>{item.meta}</Text>
                </View>
                <Text style={styles.transactionAmount}>-PKR {Math.abs(item.amount).toLocaleString()}</Text>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 30
  },
  hero: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 20,
    minHeight: 290,
    marginBottom: 18,
    overflow: "hidden"
  },
  heroGlowA: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    right: -40,
    top: -30,
    backgroundColor: "rgba(255,255,255,0.13)"
  },
  heroGlowB: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 999,
    left: -42,
    bottom: -48,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  heroGreeting: {
    color: "#DCE2FF",
    fontSize: 16,
    fontFamily: "Sora_700Bold",
    letterSpacing: 0.2
  },
  heroBalanceLabel: {
    marginTop: 8,
    color: "#C7CEFF",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
  },
  heroBalanceLabelCompact: {
    fontSize: 12
  },
  heroBalanceValue: {
    color: "#FFFFFF",
    fontSize: 46,
    fontFamily: "Sora_800ExtraBold",
    marginTop: 2
  },
  heroBalanceValueCompact: {
    fontSize: 38
  },
  heroInsightsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  heroInsightCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)"
  },
  heroInsightTitle: {
    color: "#D7DEFF",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  heroInsightValue: {
    marginTop: 5,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Sora_700Bold"
  },
  heroInsightNote: {
    marginTop: 2,
    color: "#D7DEFF",
    fontSize: 12,
    fontFamily: "Sora_500Medium"
  },
  sectionPanel: {
    backgroundColor: "#FCFCFF",
    borderWidth: 1,
    borderColor: "#DDE3F4",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#2F2F8F",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Sora_800ExtraBold",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: 0.2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 2
  },
  actionButton: {
    flex: 1
  },
  actionIcon: {
    color: "#2E2FA8",
    fontWeight: "900",
    marginRight: 4
  },
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 0
  },
  overviewCard: {
    width: "48%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8DEF6",
    padding: 12,
    shadowColor: "#2F2F8F",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  overviewLabel: {
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    color: "#64748B"
  },
  overviewValue: {
    marginTop: 5,
    fontSize: 22,
    fontFamily: "Sora_700Bold",
    color: "#0F172A"
  },
  valueGood: {
    color: "#15803D"
  },
  valueBad: {
    color: "#B91C1C"
  },
  valueWarn: {
    color: "#C2410C"
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  rowBetweenInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  linkText: {
    color: "#5C5CDB",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  transactionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8DEF6",
    borderLeftWidth: 4,
    borderLeftColor: "#5C5CDB",
    padding: 12,
    marginBottom: 8
  },
  transactionTitle: {
    color: "#111827",
    fontSize: 17,
    fontFamily: "Sora_700Bold"
  },
  transactionMeta: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 13,
    fontFamily: "Sora_500Medium"
  },
  transactionAmount: {
    color: "#B91C1C",
    fontSize: 15,
    fontFamily: "Sora_700Bold"
  }
});
