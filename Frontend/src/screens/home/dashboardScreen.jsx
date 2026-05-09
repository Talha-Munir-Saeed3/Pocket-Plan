import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";
import { defaultUserId, getReportSummary, listRecentTransactions } from "../../services/api";

const DEMO_RECENT_TRANSACTIONS = [
  {
    title: "Freelance Payment",
    category: "income",
    date: "2026-05-10T13:20:00",
    amount: 22000,
  },
  {
    title: "McDonald's",
    category: "food",
    date: "2026-05-10T14:45:00",
    amount: -850,
  },
  {
    title: "Careem Ride",
    category: "transport",
    date: "2026-05-10T09:15:00",
    amount: -450,
  },
  {
    title: "Fuel",
    category: "transport",
    date: "2026-05-09T08:10:00",
    amount: -3200,
  }
];

const CATEGORY_EMOJIS = {
  income: "💰",
  food: "🥗",
  groceries: "🛒",
  transport: "🚗",
  shopping: "🛍️",
  health: "💊",
  savings: "🗄️",
  education: "📚",
  bills: "🧾",
  sports: "⚽",
  other: "💸"
};

const formatRecentMeta = (category, dateValue) => {
  const value = new Date(dateValue);
  const now = new Date();
  const isSameDay =
    value.getFullYear() === now.getFullYear() &&
    value.getMonth() === now.getMonth() &&
    value.getDate() === now.getDate();

  const isYesterday =
    value.getFullYear() === now.getFullYear() &&
    value.getMonth() === now.getMonth() &&
    value.getDate() === now.getDate() - 1;

  const label = String(category || "other").replace(/_/g, " ");
  const timeLabel = value.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (isSameDay) return `${label} | Today, ${timeLabel}`;
  if (isYesterday) return `${label} | Yesterday`;
  return `${label} | ${value.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" })}`;
};

const sortByNewest = (items = []) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function DashboardScreen() {
  const router = useRouter();
  const addTransactionLockRef = useRef(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((theme) => theme.id === selectedThemeId) ?? THEME_OPTIONS[0];
  const compact = width < 380;
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [overviewData, setOverviewData] = useState({
    income: 85000,
    spent: 42500,
    saved: 42500,
    budgetUsed: 58
  });

  const overviewCards = [
    { label: "Income", value: `PKR ${Math.max(0, overviewData.income).toLocaleString()}`, tone: "good", icon: "trending-up", accent: "#16A34A" },
    { label: "Spent", value: `PKR ${Math.max(0, overviewData.spent).toLocaleString()}`, tone: "bad", icon: "trending-down", accent: "#DC2626" },
    { label: "Saved", value: `PKR ${Math.max(0, overviewData.saved).toLocaleString()}`, tone: "good", icon: "wallet", accent: "#059669" },
    { label: "Budget Used", value: `${Math.max(0, overviewData.budgetUsed)}%`, tone: "warn", icon: "pie-chart", accent: "#D97706" }
  ];

  const totalAvailable = 42500;

  const loadRecentTransactions = useCallback(() => {
    listRecentTransactions(defaultUserId, 4)
      .then((items) => {
        const mappedItems = (items || []).map((item) => ({
          title: item.description || item.type || "Transaction",
          category: String(item.category || item.type || "other").toLowerCase(),
          date: item.date,
          amount: item.type === "income" ? Number(item.amount) : -Math.abs(Number(item.amount)),
          icon: CATEGORY_EMOJIS[String(item.category || item.type || "other").toLowerCase()] || CATEGORY_EMOJIS.other
        }));
        setRecentTransactions(mappedItems.length ? sortByNewest(mappedItems) : sortByNewest(DEMO_RECENT_TRANSACTIONS).map((item) => ({
          ...item,
          icon: CATEGORY_EMOJIS[item.category] || CATEGORY_EMOJIS.other,
          meta: formatRecentMeta(item.category, item.date)
        })));
      })
      .catch(() => {
        setRecentTransactions(sortByNewest(DEMO_RECENT_TRANSACTIONS).map((item) => ({
          ...item,
          icon: CATEGORY_EMOJIS[item.category] || CATEGORY_EMOJIS.other,
          meta: formatRecentMeta(item.category, item.date)
        })));
      });
  }, []);

  const loadSummary = useCallback(() => {
    getReportSummary(defaultUserId)
      .then((summary) => {
        const income = Number(summary?.totals?.income || 0);
        const spent = Number(summary?.totals?.expense || 0);
        const saved = Number(summary?.totals?.savings || 0);
        const budgetTotal = Number(summary?.budget?.total_budget || 0);
        const budgetSpent = Number(summary?.budget?.total_spent || spent);
        const budgetUsed = budgetTotal > 0 ? Math.round((budgetSpent / budgetTotal) * 100) : 0;

        setOverviewData({
          income,
          spent,
          saved,
          budgetUsed
        });
      })
      .catch(() => {
        // Keep existing values when summary request fails.
      });
  }, []);

  useEffect(() => {
    loadRecentTransactions();
    loadSummary();
  }, [loadRecentTransactions, loadSummary]);

  useFocusEffect(
    useCallback(() => {
      loadRecentTransactions();
      loadSummary();
    }, [loadRecentTransactions, loadSummary])
  );

  if (!fontsLoaded) return null;

  const openAddTransaction = () => {
    if (addTransactionLockRef.current) return;
    addTransactionLockRef.current = true;
    router.navigate("/add-transaction");

    setTimeout(() => {
      addTransactionLockRef.current = false;
    }, 1200);
  };

  return (
    <ScreenContainer style={[styles.screen, { backgroundColor: activeTheme.backgroundColor }]} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[activeTheme.boxColor, activeTheme.supportingAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
        >
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />
          <Text style={styles.heroGreeting}>Welcome back, Talha</Text>
          <Text style={[styles.heroBalanceLabel, compact && styles.heroBalanceLabelCompact]}>Total available</Text>
          <Text style={[styles.heroBalanceValue, compact && styles.heroBalanceValueCompact]}>PKR {totalAvailable.toLocaleString()}</Text>
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

        <View style={[styles.bodyContainer, { backgroundColor: activeTheme.backgroundColor }]}>
          <View style={styles.sectionPanel}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.row}>
              <PrimaryButton
                label="Add Transaction"
                variant="secondary"
                leftIcon={<Ionicons name="add-circle" size={18} color="#4C46C8" style={styles.actionIconGraphic} />}
                style={styles.actionButtonSingle}
                onPress={openAddTransaction}
              />
            </View>
            <View style={styles.row}>
              <PrimaryButton
                label="Budget"
                variant="secondary"
                leftIcon={<Ionicons name="wallet" size={18} color="#4C46C8" style={styles.actionIconGraphic} />}
                style={styles.actionButtonHalf}
                onPress={() => router.push("/budget")}
              />
              <PrimaryButton
                label="Savings Goal"
                variant="secondary"
                leftIcon={<Ionicons name="trophy" size={18} color="#4C46C8" style={styles.actionIconGraphic} />}
                style={styles.actionButtonHalf}
                onPress={() => router.push("/savings-goal")}
              />
            </View>
          </View>

          <View style={styles.sectionPanel}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.overviewGrid}>
              {overviewCards.map((item) => (
                <View key={item.label} style={[styles.overviewCard, { borderLeftColor: item.accent }]}> 
                  <View style={styles.overviewLabelRow}>
                    <Ionicons name={item.icon} size={14} color={item.accent} />
                    <Text style={styles.overviewLabel}>{item.label}</Text>
                  </View>
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
              <View key={`${item.title}-${item.date || item.meta}`} style={styles.transactionItem}>
                <View style={styles.rowBetweenInner}>
                  <View style={styles.transactionLeft}>
                    <Text style={styles.transactionEmoji}>{item.icon}</Text>
                    <View>
                    <Text style={styles.transactionTitle}>{item.title}</Text>
                    <Text style={styles.transactionMeta}>{item.meta || formatRecentMeta(item.category, item.date)}</Text>
                    </View>
                  </View>
                  <Text style={[styles.transactionAmount, item.amount >= 0 ? styles.transactionAmountPositive : styles.transactionAmountNegative]}>
                    {item.amount >= 0 ? "+" : "-"}PKR {Math.abs(item.amount).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 30
  },
  hero: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 20,
    minHeight: 290,
    overflow: "hidden"
  },
  bodyContainer: {
    backgroundColor: "#F4F4FF",
    paddingHorizontal: 12,
    paddingTop: 12,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: 0
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
    marginBottom: 8
  },
  actionButton: {
    flex: 1,
    minHeight: 48
  },
  actionButtonHalf: {
    flex: 1,
    minHeight: 48
  },
  actionButtonSingle: {
    width: "100%",
    minHeight: 48
  },
  actionIconGraphic: {
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
    borderLeftWidth: 4,
    padding: 12,
    shadowColor: "#2F2F8F",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  overviewLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
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
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  transactionEmoji: {
    fontSize: 18
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
    fontSize: 15,
    fontFamily: "Sora_700Bold"
  },
  transactionAmountPositive: {
    color: "#15803D"
  },
  transactionAmountNegative: {
    color: "#B91C1C"
  }
});
