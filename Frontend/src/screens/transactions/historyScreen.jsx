import { useEffect, useMemo, useState, useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../../components/common/screenContainer";
import PrimaryButton from "../../components/common/primaryButton";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";
import { defaultUserId, listTransactionsHistory } from "../../services/api";

const TRANSACTIONS = [
  { id: "1", title: "Freelance Payment", category: "Income", date: "Today, 1:20 PM", amount: 22000, month: "Apr 2026", isThisWeek: true },
  { id: "2", title: "McDonald's", category: "Food", date: "Today, 2:45 PM", amount: -850, month: "Apr 2026", isThisWeek: true },
  { id: "3", title: "Careem Ride", category: "Transport", date: "Today, 9:15 AM", amount: -450, month: "Apr 2026", isThisWeek: true },
  { id: "4", title: "Fuel", category: "Transport", date: "Yesterday", amount: -3200, month: "Apr 2026", isThisWeek: true },
  { id: "5", title: "Daraz Order", category: "Shopping", date: "Apr 12", amount: -4500, month: "Apr 2026", isThisWeek: false },
  { id: "6", title: "Client Retainer", category: "Income", date: "Mar 28", amount: 18000, month: "Mar 2026", isThisWeek: false },
  { id: "6a", title: "Goal Deposit · Emergency Fund", category: "Savings", date: "Mar 20", amount: 5000, month: "Mar 2026", isThisWeek: false },
  { id: "7", title: "Electric Bill", category: "Bills", date: "Mar 24", amount: -5400, month: "Mar 2026", isThisWeek: false },
  { id: "8", title: "Groceries", category: "Food", date: "Mar 21", amount: -3600, month: "Mar 2026", isThisWeek: false },
  { id: "9", title: "Online Course", category: "Education", date: "Mar 13", amount: -2800, month: "Mar 2026", isThisWeek: false },
  { id: "10", title: "Part-time Income", category: "Income", date: "Feb 22", amount: 12000, month: "Feb 2026", isThisWeek: false },
  { id: "11", title: "Pharmacy", category: "Health", date: "Feb 17", amount: -1200, month: "Feb 2026", isThisWeek: false },
  { id: "12a", title: "Goal Withdrawal · Emergency Fund", category: "Savings", date: "Feb 05", amount: -8000, month: "Feb 2026", isThisWeek: false },
  { id: "12", title: "Internet", category: "Bills", date: "Feb 11", amount: -2900, month: "Feb 2026", isThisWeek: false }
];

const GOAL_HISTORY = [
  {
    id: "g1",
    goalName: "Emergency Fund",
    status: "Completed",
    event: "Reached target amount",
    detail: "Saved PKR 150,000 and moved to reserve.",
    date: "Apr 18",
    month: "Apr 2026"
  },
  {
    id: "g2",
    goalName: "Laptop Upgrade",
    status: "On Track",
    event: "Monthly contribution added",
    detail: "Added PKR 12,000 this month.",
    date: "Apr 10",
    month: "Apr 2026"
  },
  {
    id: "g3",
    goalName: "Vacation Fund",
    status: "Delayed",
    event: "Missed planned contribution",
    detail: "Missed PKR 8,000 target due to higher utilities.",
    date: "Mar 26",
    month: "Mar 2026"
  },
  {
    id: "g4",
    goalName: "Wedding Savings",
    status: "Adjusted",
    event: "Timeline updated",
    detail: "Extended timeline by 2 months after budget review.",
    date: "Mar 12",
    month: "Mar 2026"
  },
  {
    id: "g5",
    goalName: "Car Down Payment",
    status: "On Track",
    event: "Goal milestone crossed",
    detail: "Reached 42% of total goal.",
    date: "Feb 21",
    month: "Feb 2026"
  },
  {
    id: "g6",
    goalName: "Medical Reserve",
    status: "Completed",
    event: "Target locked",
    detail: "Goal closed with PKR 80,000 saved.",
    date: "Feb 09",
    month: "Feb 2026"
  }
];

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((theme) => theme.id === selectedThemeId) ?? THEME_OPTIONS[0];
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const [activeTab, setActiveTab] = useState("Transactions");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const toEpoch = (value) => {
    const timestamp = Date.parse(value || "");
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const visibleTransactions = useMemo(() => {
    const merged = [...transactions, ...TRANSACTIONS];
    const uniqueById = new Map();

    merged.forEach((item) => {
      uniqueById.set(item.id, item);
    });

    return Array.from(uniqueById.values()).sort((a, b) => toEpoch(b.sortDate || b.date) - toEpoch(a.sortDate || a.date));
  }, [transactions]);

  const monthsInRange = useMemo(() => Array.from(new Set(visibleTransactions.map((item) => item.month))).slice(0, 3), [visibleTransactions]);

  const loadHistory = useCallback(() => {
    listTransactionsHistory(defaultUserId, 3)
      .then((items) => {
        if (!Array.isArray(items) || !items.length) return;

        const mappedTransactions = items.map((item) => {
          const dateValue = new Date(item.date);
          const formattedDate = dateValue.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const monthLabel = dateValue.toLocaleDateString("en-US", { month: "short", year: "numeric" });
          return {
            id: item.id,
            title: item.description || item.type || "Transaction",
            category: String(item.category || item.type || "Other").replace(/_/g, " ").replace(/\b\w/g, (s) => s.toUpperCase()),
            date: formattedDate,
            sortDate: item.date,
            amount: Number(item.amount) * (item.type === "income" ? 1 : -1),
            month: monthLabel,
            isThisWeek: false
          };
        });

        setTransactions(mappedTransactions);
      })
      .catch(() => {
        setTransactions([]);
      });
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const filteredTransactions = useMemo(() => {
    return visibleTransactions.filter((item) => {
      const matchesQuery = query
        ? `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Expenses" && item.amount < 0) ||
        (activeFilter === "Income" && item.amount > 0) ||
        (activeFilter === "This Week" && item.isThisWeek);

      return matchesQuery && matchesFilter && monthsInRange.includes(item.month);
    });
      }, [activeFilter, query, monthsInRange, visibleTransactions]);

  const filteredGoals = useMemo(() => {
    return GOAL_HISTORY.filter((item) => {
      const matchesQuery = query
        ? `${item.goalName} ${item.status} ${item.event}`.toLowerCase().includes(query.toLowerCase())
        : true;

      return matchesQuery;
    });
  }, [query]);

  const totalSpent = useMemo(
    () => filteredTransactions.filter((item) => item.amount < 0).reduce((sum, item) => sum + Math.abs(item.amount), 0),
    [filteredTransactions]
  );

  const totalIncome = useMemo(
    () => filteredTransactions.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0),
    [filteredTransactions]
  );

  const totalNet = totalIncome - totalSpent;

  const goalsCompleted = useMemo(() => filteredGoals.filter((item) => item.status === "Completed").length, [filteredGoals]);
  const goalsOnTrack = useMemo(() => filteredGoals.filter((item) => item.status === "On Track").length, [filteredGoals]);
  const goalsAttention = useMemo(
    () => filteredGoals.filter((item) => item.status === "Delayed" || item.status === "Adjusted").length,
    [filteredGoals]
  );

  const groupedByMonth = useMemo(() => {
    return monthsInRange.map((month) => ({
      month,
      items: filteredTransactions.filter((item) => item.month === month)
    }));
  }, [filteredTransactions, monthsInRange]);

  const groupedGoalsByMonth = useMemo(() => {
    const allGoalMonths = Array.from(new Set(GOAL_HISTORY.map((item) => item.month)));
    return allGoalMonths.map((month) => ({
      month,
      items: filteredGoals.filter((item) => item.month === month)
    }));
  }, [filteredGoals]);

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={[styles.screen, { backgroundColor: activeTheme.backgroundColor }]} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[activeTheme.boxColor, activeTheme.supportingAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
        >
          <View style={styles.heroOrbA} />
          <View style={styles.heroOrbB} />
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>History</Text>
            <Pressable style={styles.headerHelpButton} onPress={() => router.push(`/history-help?section=${activeTab.toLowerCase()}`)}>
              <Text style={styles.headerHelpText}>?</Text>
            </Pressable>
          </View>
          <Text style={[styles.heroBalanceLabel, compact && styles.heroBalanceLabelCompact]}>
            {activeTab === "Transactions" ? "Last 3 months transaction flow" : "All-time goal journey"}
          </Text>
          <Text style={[styles.heroBalanceValue, compact && styles.heroBalanceValueCompact]}>
            {activeTab === "Transactions"
              ? `${totalNet < 0 ? "-" : ""}PKR ${Math.abs(totalNet).toLocaleString()}`
              : `${goalsCompleted} completed`}
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>{activeTab === "Transactions" ? "Entries" : "Goal Events"}</Text>
              <Text style={styles.heroStatValue}>{activeTab === "Transactions" ? filteredTransactions.length : filteredGoals.length}</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>{activeTab === "Transactions" ? "Income" : "On Track"}</Text>
              <Text style={styles.heroStatValue}>
                {activeTab === "Transactions" ? `PKR ${totalIncome.toLocaleString()}` : goalsOnTrack}
              </Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatLabel}>{activeTab === "Transactions" ? "Spent" : "Attention"}</Text>
              <Text style={styles.heroStatValue}>
                {activeTab === "Transactions" ? `PKR ${totalSpent.toLocaleString()}` : goalsAttention}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.bodyContainer}>
          <View style={styles.controlsCard}>
            <View style={styles.viewTabsWrap}>
              {["Transactions", "Goals"].map((tab) => {
                const active = activeTab === tab;
                return (
                  <Pressable key={tab} style={[styles.viewTab, active && styles.viewTabActive]} onPress={() => setActiveTab(tab)}>
                    <Text style={[styles.viewTabText, active && styles.viewTabTextActive]}>{tab}</Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder={activeTab === "Transactions" ? "Search merchant or category" : "Search goal name or status"}
              placeholderTextColor="#93A0B4"
              value={query}
              onChangeText={setQuery}
            />

            {activeTab === "Transactions" ? (
              <View style={styles.filtersRow}>
                {["All", "Expenses", "Income", "This Week"].map((filter, index) => (
                  <Pressable
                    key={filter}
                    style={[styles.filterChip, index === 3 && styles.filterChipLast, activeFilter === filter && styles.filterChipActive]}
                    onPress={() => setActiveFilter(filter)}
                  >
                    <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>{filter}</Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View style={styles.goalInfoWrap}>
                <Text style={styles.goalInfoText}>Statuses shown: Completed, On Track, Delayed, Adjusted</Text>
              </View>
            )}
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{activeTab === "Transactions" ? "Monthly Transaction History" : "Monthly Goal History"}</Text>
            <Text style={styles.sectionMeta}>
              {activeTab === "Transactions"
                ? `${activeFilter} | ${filteredTransactions.length} shown`
                : `${filteredGoals.length} status events`}
            </Text>
          </View>

          {activeTab === "Transactions" ? (
            <View>
              {groupedByMonth.map((group) => (
                <View key={group.month} style={styles.monthCard}>
                  <View style={styles.monthHeader}>
                    <Text style={styles.monthTitle}>{group.month}</Text>
                    <Text style={styles.monthMeta}>{group.items.length} transactions</Text>
                  </View>

                  {group.items.length === 0 ? (
                    <Text style={styles.monthEmptyText}>No transactions in this month for selected filter.</Text>
                  ) : (
                    group.items.map((item) => (
                      <View
                        key={item.id}
                        style={[styles.transactionCard, item.amount < 0 ? styles.transactionExpenseCard : styles.transactionIncomeCard]}
                      >
                        <View style={styles.transactionLeft}>
                          <View style={[styles.timelineDot, item.amount < 0 ? styles.dotNegative : styles.dotPositive]} />
                          <View style={styles.transactionTextWrap}>
                            <Text style={styles.transactionTitle}>{item.title}</Text>
                            <Text style={styles.transactionMeta}>{item.category} | {item.date}</Text>
                          </View>
                        </View>

                        <Text style={[styles.transactionAmount, item.amount < 0 ? styles.amountNegative : styles.amountPositive]}>
                          {item.amount < 0 ? "-" : "+"}PKR {Math.abs(item.amount).toLocaleString()}
                        </Text>
                      </View>
                    ))
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View>
              {groupedGoalsByMonth.map((group) => (
                <View key={group.month} style={styles.monthCard}>
                  <View style={styles.monthHeader}>
                    <Text style={styles.monthTitle}>{group.month}</Text>
                    <Text style={styles.monthMeta}>{group.items.length} updates</Text>
                  </View>

                  {group.items.length === 0 ? (
                    <Text style={styles.monthEmptyText}>No goal updates in this month for current search.</Text>
                  ) : (
                    group.items.map((item) => (
                      <View key={item.id} style={styles.goalCard}>
                        <View style={styles.goalHeaderRow}>
                          <Text style={styles.goalName}>{item.goalName}</Text>
                          <View
                            style={[
                              styles.goalStatusPill,
                              item.status === "Completed" && styles.goalStatusCompleted,
                              item.status === "On Track" && styles.goalStatusOnTrack,
                              item.status === "Delayed" && styles.goalStatusDelayed,
                              item.status === "Adjusted" && styles.goalStatusAdjusted
                            ]}
                          >
                            <Text style={styles.goalStatusText}>{item.status}</Text>
                          </View>
                        </View>
                        <Text style={styles.goalEvent}>{item.event}</Text>
                        <Text style={styles.goalDetail}>{item.detail}</Text>
                        <Text style={styles.goalDate}>{item.date}</Text>
                      </View>
                    ))
                  )}
                </View>
              ))}
            </View>
          )}

          {(activeTab === "Transactions" ? filteredTransactions.length === 0 : filteredGoals.length === 0) ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Nothing matches your current search</Text>
              <Text style={styles.emptyMeta}>Reset to see the full 3-month history again.</Text>
              <PrimaryButton
                label="Reset Search"
                variant="secondary"
                onPress={() => {
                  setQuery("");
                  setActiveFilter("All");
                }}
              />
            </View>
          ) : null}
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
    paddingBottom: 28
  },
  hero: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    marginBottom: 12,
    minHeight: 300,
    overflow: "hidden"
  },
  heroOrbA: {
    position: "absolute",
    width: 128,
    height: 128,
    right: -36,
    top: -24,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  heroOrbB: {
    position: "absolute",
    width: 118,
    height: 118,
    left: -40,
    bottom: -46,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 36,
    fontFamily: "Sora_800ExtraBold"
  },
  headerHelpButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  headerHelpText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  heroBalanceLabel: {
    marginTop: 10,
    color: "#C7CEFF",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold"
  },
  heroBalanceLabelCompact: {
    fontSize: 12
  },
  heroBalanceValue: {
    color: "#FFFFFF",
    marginTop: 4,
    fontSize: 36,
    fontFamily: "Sora_800ExtraBold"
  },
  heroBalanceValueCompact: {
    fontSize: 29
  },
  heroStatsRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between"
  },
  heroStatCard: {
    width: "31.5%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 10,
    minHeight: 66,
    justifyContent: "center",
    alignItems: "center"
  },
  heroStatLabel: {
    color: "#DBE2FF",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold",
    textAlign: "center"
  },
  heroStatValue: {
    color: "#FFFFFF",
    marginTop: 4,
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    textAlign: "center"
  },
  bodyContainer: {
    backgroundColor: "#F4F4FF",
    paddingHorizontal: 12,
    paddingTop: 2,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22
  },
  controlsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E8F3",
    borderRadius: 18,
    padding: 12,
    marginBottom: 10
  },
  viewTabsWrap: {
    backgroundColor: "#E5E7FF",
    borderRadius: 14,
    padding: 4,
    flexDirection: "row",
    marginBottom: 10
  },
  viewTab: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  viewTabActive: {
    backgroundColor: "#5C5CDB"
  },
  viewTabText: {
    color: "#4B5563",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  viewTabTextActive: {
    color: "#FFFFFF"
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  tabChip: {
    borderWidth: 1,
    borderColor: "#D7DEEF",
    backgroundColor: "#F8FAFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginRight: 8
  },
  tabChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#5C5CDB"
  },
  tabChipText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  tabChipTextActive: {
    color: "#FFFFFF"
  },
  searchInput: {
    backgroundColor: "#F8FAFF",
    borderWidth: 1,
    borderColor: "#D6DDEE",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: "Sora_500Medium",
    color: "#111827"
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 10
  },
  goalInfoWrap: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10
  },
  goalInfoText: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  filterChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D7DEEF",
    backgroundColor: "#F8FAFF",
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 999
  },
  filterChipLast: {
    marginRight: 0
  },
  filterChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#5C5CDB"
  },
  filterChipText: {
    color: "#2E2FA8",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    textAlign: "center"
  },
  filterChipTextActive: {
    color: "#FFFFFF"
  },
  sectionHeaderRow: {
    marginTop: 4,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Sora_800ExtraBold",
    color: "#111827"
  },
  sectionMeta: {
    color: "#6B7280",
    fontFamily: "Sora_600SemiBold",
    fontSize: 12
  },
  monthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E8F3",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 4,
    marginBottom: 10
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#5C5CDB",
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  monthTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  monthMeta: {
    color: "#DCE2FF",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  monthEmptyText: {
    color: "#667085",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    paddingVertical: 8
  },
  transactionCard: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1
  },
  transactionExpenseCard: {
    borderColor: "#FED7AA",
    backgroundColor: "#FFF7ED"
  },
  transactionIncomeCard: {
    borderColor: "#BBF7D0",
    backgroundColor: "#F0FDF4"
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 10
  },
  dotNegative: {
    backgroundColor: "#F97316"
  },
  dotPositive: {
    backgroundColor: "#16A34A"
  },
  transactionTextWrap: {
    flex: 1,
    paddingRight: 10
  },
  transactionTitle: {
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    color: "#0F172A"
  },
  transactionMeta: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium"
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  amountNegative: {
    color: "#B91C1C"
  },
  amountPositive: {
    color: "#15803D"
  },
  goalCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#FCFCFF"
  },
  goalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  goalName: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    marginRight: 8
  },
  goalStatusPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 9
  },
  goalStatusCompleted: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC"
  },
  goalStatusOnTrack: {
    backgroundColor: "#DBEAFE",
    borderColor: "#93C5FD"
  },
  goalStatusDelayed: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5"
  },
  goalStatusAdjusted: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D"
  },
  goalStatusText: {
    color: "#1F2937",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  goalEvent: {
    marginTop: 8,
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  goalDetail: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_500Medium"
  },
  goalDate: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  emptyCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E8F3",
    borderRadius: 16,
    padding: 14
  },
  emptyTitle: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "Sora_700Bold"
  },
  emptyMeta: {
    color: "#667085",
    marginTop: 4,
    marginBottom: 10,
    fontSize: 13,
    fontFamily: "Sora_500Medium"
  }
});
