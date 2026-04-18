import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";

const CATEGORY_LIBRARY = [
  { key: "rent", label: "Rent", emoji: "🏠", weight: 0.28, spent: 25000 },
  { key: "groceries", label: "Groceries", emoji: "🛒", weight: 0.16, spent: 9800 },
  { key: "transport", label: "Transport", emoji: "🚗", weight: 0.1, spent: 4300 },
  { key: "utilities", label: "Utilities", emoji: "💡", weight: 0.08, spent: 3100 },
  { key: "food", label: "Food", emoji: "🍔", weight: 0.12, spent: 7200 },
  { key: "shopping", label: "Shopping", emoji: "🛍", weight: 0.09, spent: 3000 },
  { key: "health", label: "Health", emoji: "💊", weight: 0.08, spent: 2100 },
  { key: "education", label: "Education", emoji: "📚", weight: 0.07, spent: 1800 },
  { key: "subscriptions", label: "Subscriptions", emoji: "📱", weight: 0.05, spent: 1200 },
  { key: "personal_care", label: "Personal Care", emoji: "💇", weight: 0.05, spent: 900 },
  { key: "travel", label: "Travel", emoji: "✈️", weight: 0.07, spent: 0 },
  { key: "charity", label: "Charity", emoji: "🤲", weight: 0.02, spent: 400 },
  { key: "repairs", label: "Repairs", emoji: "🔧", weight: 0.03, spent: 600 },
  { key: "insurance", label: "Insurance", emoji: "🛡", weight: 0.05, spent: 1400 },
  { key: "taxes", label: "Taxes", emoji: "📋", weight: 0.06, spent: 0 },
  { key: "gifts", label: "Gifts", emoji: "🎁", weight: 0.03, spent: 500 },
  { key: "events", label: "Events", emoji: "🎟", weight: 0.06, spent: 900 },
  { key: "sports", label: "Sports", emoji: "⚽", weight: 0.05, spent: 1200 },
  { key: "equipment", label: "Equipment", emoji: "🧰", weight: 0.06, spent: 0 },
  { key: "other", label: "Other", emoji: "➕", weight: 0.02, spent: 0 }
];

const STARTER_KEYS = ["rent", "groceries", "transport", "utilities", "food", "shopping", "other"];

const toCurrency = (value) => `PKR ${Math.max(0, Number(value) || 0).toLocaleString()}`;

const sanitizeNumber = (value) => value.replace(/[^0-9]/g, "");

const getUsageColor = (usagePercent) => {
  if (usagePercent >= 100) return "#DC2626";
  if (usagePercent >= 81) return "#EA580C";
  if (usagePercent >= 61) return "#D97706";
  return "#16A34A";
};

const getUsageLabel = (usagePercent) => {
  if (usagePercent >= 100) return "Over Limit";
  if (usagePercent >= 81) return "Critical";
  if (usagePercent >= 61) return "Watch";
  return "Healthy";
};

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState("allocation");
  const [monthlyBudget, setMonthlyBudget] = useState("75000");
  const [savingsGoal, setSavingsGoal] = useState("15000");
  const [categories, setCategories] = useState(
    CATEGORY_LIBRARY.filter((item) => STARTER_KEYS.includes(item.key)).map((item) => ({
      ...item,
      planned: String(Math.round(75000 * item.weight))
    }))
  );
  const [savedPlans, setSavedPlans] = useState([]);
  const [savedMessage, setSavedMessage] = useState("");

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric"
      }).format(new Date()),
    []
  );

  const totalPlanned = useMemo(
    () => categories.reduce((sum, item) => sum + (Number(item.planned) || 0), 0),
    [categories]
  );

  const totalSpent = useMemo(
    () => categories.reduce((sum, item) => sum + (Number(item.spent) || 0), 0),
    [categories]
  );

  const budgetValue = Number(monthlyBudget) || 0;
  const remaining = budgetValue - totalPlanned;
  const savingsGoalValue = Number(savingsGoal) || 0;
  const projectedSavings = Math.max(0, budgetValue - totalSpent);
  const savingsProgress = savingsGoalValue > 0 ? Math.round((projectedSavings / savingsGoalValue) * 100) : 0;
  const totalUsedPercent = budgetValue > 0 ? Math.round((totalSpent / budgetValue) * 100) : 0;

  const sortedOverviewCategories = useMemo(
    () =>
      [...categories].sort((a, b) => {
        const aPlanned = Number(a.planned) || 0;
        const bPlanned = Number(b.planned) || 0;
        const aPct = aPlanned > 0 ? ((Number(a.spent) || 0) / aPlanned) * 100 : 0;
        const bPct = bPlanned > 0 ? ((Number(b.spent) || 0) / bPlanned) * 100 : 0;
        return bPct - aPct;
      }),
    [categories]
  );

  const overLimitCount = useMemo(
    () => categories.filter((item) => (Number(item.planned) || 0) > 0 && ((Number(item.spent) || 0) / (Number(item.planned) || 1)) * 100 >= 100).length,
    [categories]
  );

  const criticalCount = useMemo(
    () => categories.filter((item) => {
      const planned = Number(item.planned) || 0;
      if (planned <= 0) return false;
      const pct = ((Number(item.spent) || 0) / planned) * 100;
      return pct >= 81 && pct <= 99;
    }).length,
    [categories]
  );

  const availableToAdd = useMemo(
    () => CATEGORY_LIBRARY.filter((item) => !categories.some((existing) => existing.key === item.key)),
    [categories]
  );

  const updateCategoryPlanned = (key, value) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              planned: sanitizeNumber(value)
            }
          : item
      )
    );
  };

  const addCategory = (category) => {
    setCategories((prev) => [
      ...prev,
      {
        ...category,
        planned: "0"
      }
    ]);
  };

  const applyWeightedSplit = () => {
    const totalBudget = Number(monthlyBudget) || 0;
    if (totalBudget <= 0) return;

    setCategories((prev) =>
      prev.map((item) => {
        const source = CATEGORY_LIBRARY.find((lib) => lib.key === item.key);
        return {
          ...item,
          planned: String(Math.round(totalBudget * (source?.weight || 0.05)))
        };
      })
    );
  };

  const saveSnapshot = () => {
    const snapshot = {
      id: Date.now().toString(),
      title: `${monthLabel} Plan`,
      monthlyBudget,
      categories
    };

    setSavedPlans((prev) => [snapshot, ...prev].slice(0, 4));
    setSavedMessage("Snapshot saved in this session");
  };

  const loadSnapshot = (snapshot) => {
    setMonthlyBudget(snapshot.monthlyBudget);
    setCategories(snapshot.categories);
    setSavedMessage(`Loaded ${snapshot.title}`);
  };

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 12 }] }>
          <Text style={styles.heroTitle}>Budget Planner</Text>
          <Text style={styles.heroSub}>{monthLabel}</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Budget</Text>
              <Text style={styles.heroStatValue}>{toCurrency(budgetValue)}</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Planned</Text>
              <Text style={styles.heroStatValue}>{toCurrency(totalPlanned)}</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatLabel}>Remaining</Text>
              <Text style={[styles.heroStatValue, remaining < 0 && styles.statDanger]}>{toCurrency(remaining)}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.viewTabsWrap}>
          <Pressable
            style={[styles.viewTab, activeView === "allocation" && styles.viewTabActive]}
            onPress={() => setActiveView("allocation")}
          >
            <Text style={[styles.viewTabText, activeView === "allocation" && styles.viewTabTextActive]}>Allocation</Text>
          </Pressable>
          <Pressable
            style={[styles.viewTab, activeView === "overview" && styles.viewTabActive]}
            onPress={() => setActiveView("overview")}
          >
            <Text style={[styles.viewTabText, activeView === "overview" && styles.viewTabTextActive]}>Overview</Text>
          </Pressable>
        </View>

        {activeView === "allocation" ? (
          <>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Monthly Budget</Text>
          <TextInput
            value={monthlyBudget}
            onChangeText={(text) => setMonthlyBudget(sanitizeNumber(text))}
            placeholder="Enter monthly budget"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={styles.budgetInput}
          />
          <View style={styles.presetRow}>
            <Pressable style={styles.presetChip} onPress={applyWeightedSplit}>
              <Text style={styles.presetChipText}>Auto Split</Text>
            </Pressable>
            <Pressable style={styles.presetChip} onPress={() => setCategories((prev) => prev.map((c) => ({ ...c, planned: "0" })))}>
              <Text style={styles.presetChipText}>Clear Plan</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Savings Goal</Text>
          <TextInput
            value={savingsGoal}
            onChangeText={(text) => setSavingsGoal(sanitizeNumber(text))}
            placeholder="Enter savings goal"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={styles.budgetInput}
          />
          <View style={styles.savingsMetaRow}>
            <Text style={styles.savingsMeta}>Projected savings: {toCurrency(projectedSavings)}</Text>
            <Text style={[styles.savingsTag, savingsProgress >= 100 && styles.savingsTagGood]}>
              {Math.max(0, savingsProgress)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, Math.max(0, savingsProgress))}%`,
                  backgroundColor: savingsProgress >= 100 ? "#16A34A" : "#5C5CDB"
                }
              ]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Category Allocation</Text>
          {categories.map((item) => {
            const planned = Number(item.planned) || 0;
            const usedPct = planned > 0 ? Math.min(100, Math.round((item.spent / planned) * 100)) : 0;

            return (
              <View key={item.key} style={styles.categoryRow}>
                <View style={styles.categoryHead}>
                  <Text style={styles.categoryName}>{item.emoji} {item.label}</Text>
                  <Text style={styles.categoryMeta}>Used {usedPct}%</Text>
                </View>
                <TextInput
                  value={item.planned}
                  onChangeText={(text) => updateCategoryPlanned(item.key, text)}
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  style={styles.rowInput}
                />
              </View>
            );
          })}

          {availableToAdd.length ? (
            <View style={styles.addRow}>
              {availableToAdd.slice(0, 8).map((item) => (
                <Pressable key={item.key} style={styles.addChip} onPress={() => addCategory(item)}>
                  <Text style={styles.addChipText}>+ {item.emoji} {item.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Storage And Reuse</Text>
          <Text style={styles.helperText}>Save this plan as a quick snapshot and reload anytime in this session.</Text>
          <PrimaryButton label="Save Snapshot" onPress={saveSnapshot} />
          {savedMessage ? <Text style={styles.savedText}>{savedMessage}</Text> : null}

          {savedPlans.length ? (
            <View style={styles.snapshotList}>
              {savedPlans.map((plan) => (
                <Pressable key={plan.id} style={styles.snapshotItem} onPress={() => loadSnapshot(plan)}>
                  <Text style={styles.snapshotTitle}>{plan.title}</Text>
                  <Text style={styles.snapshotMeta}>{toCurrency(plan.monthlyBudget)}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Budget Overview</Text>
            <View style={styles.overviewSummaryRow}>
              <View style={styles.overviewSummaryCard}>
                <Text style={styles.overviewSummaryLabel}>Total Used</Text>
                <Text style={styles.overviewSummaryValue}>{Math.max(0, totalUsedPercent)}%</Text>
              </View>
              <View style={styles.overviewSummaryCard}>
                <Text style={styles.overviewSummaryLabel}>Over Limit</Text>
                <Text style={styles.overviewSummaryValue}>{overLimitCount}</Text>
              </View>
              <View style={styles.overviewSummaryCard}>
                <Text style={styles.overviewSummaryLabel}>Critical</Text>
                <Text style={styles.overviewSummaryValue}>{criticalCount}</Text>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#16A34A" }]} /><Text style={styles.legendText}>0-60</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#D97706" }]} /><Text style={styles.legendText}>61-80</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#EA580C" }]} /><Text style={styles.legendText}>81-99</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: "#DC2626" }]} /><Text style={styles.legendText}>100%+</Text></View>
            </View>

            {sortedOverviewCategories.map((item) => {
              const planned = Number(item.planned) || 0;
              const spent = Number(item.spent) || 0;
              const usedPctRaw = planned > 0 ? Math.round((spent / planned) * 100) : 0;
              const usedPctDisplay = Math.max(0, usedPctRaw);
              const progressWidth = `${Math.min(100, usedPctDisplay)}%`;
              const tone = getUsageColor(usedPctDisplay);

              return (
                <View key={item.key} style={styles.overviewRow}>
                  <View style={styles.overviewHeader}>
                    <Text style={styles.overviewName}>{item.emoji} {item.label}</Text>
                    <Text style={[styles.overviewPercent, { color: tone }]}>{usedPctDisplay}%</Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: progressWidth, backgroundColor: tone }]} />
                  </View>

                  <View style={styles.overviewMetaRow}>
                    <Text style={styles.overviewMeta}>{toCurrency(spent)} spent</Text>
                    <Text style={[styles.overviewTag, { color: tone }]}>{getUsageLabel(usedPctDisplay)}</Text>
                    <Text style={styles.overviewMeta}>{toCurrency(planned)} planned</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
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
  statDanger: {
    color: "#FFCACA"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderColor: "#DDE3F4",
    borderWidth: 1,
    padding: 12,
    marginBottom: 10
  },
  viewTabsWrap: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10
  },
  viewTab: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  viewTabActive: {
    borderColor: "#4C46C8",
    backgroundColor: "#5C5CDB"
  },
  viewTabText: {
    color: "#2E2FA8",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  viewTabTextActive: {
    color: "#FFFFFF"
  },
  sectionTitle: {
    color: "#1F2937",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
    marginBottom: 9
  },
  budgetInput: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_600SemiBold",
    backgroundColor: "#FFFFFF"
  },
  presetRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10
  },
  presetChip: {
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#EEF0FF",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12
  },
  presetChipText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  categoryRow: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8ECF9",
    borderRadius: 12,
    padding: 9
  },
  categoryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7
  },
  categoryName: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  categoryMeta: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  rowInput: {
    borderWidth: 1,
    borderColor: "#D7DEFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#0F172A",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    backgroundColor: "#FFFFFF"
  },
  addRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 5
  },
  addChip: {
    borderWidth: 1,
    borderColor: "#DDE3F4",
    backgroundColor: "#F8FAFF",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  addChipText: {
    color: "#475569",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  helperText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 10
  },
  savingsMetaRow: {
    marginTop: 8,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  savingsMeta: {
    color: "#475569",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  savingsTag: {
    color: "#2E2FA8",
    fontSize: 11,
    fontFamily: "Sora_700Bold",
    backgroundColor: "#EEF0FF",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  savingsTagGood: {
    color: "#166534",
    backgroundColor: "#DCFCE7"
  },
  overviewSummaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10
  },
  overviewSummaryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E8ECF9",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 9,
    backgroundColor: "#F8FAFF"
  },
  overviewSummaryLabel: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  overviewSummaryValue: {
    marginTop: 4,
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 99
  },
  legendText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  overviewRow: {
    borderWidth: 1,
    borderColor: "#E8ECF9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginBottom: 8,
    backgroundColor: "#FFFFFF"
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7
  },
  overviewName: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  overviewPercent: {
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 999
  },
  overviewMetaRow: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  overviewMeta: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  overviewTag: {
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  savedText: {
    color: "#2E2FA8",
    fontSize: 11,
    fontFamily: "Sora_700Bold",
    marginTop: 8
  },
  snapshotList: {
    marginTop: 10,
    gap: 7
  },
  snapshotItem: {
    borderWidth: 1,
    borderColor: "#E8ECF9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF"
  },
  snapshotTitle: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  snapshotMeta: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  
});
