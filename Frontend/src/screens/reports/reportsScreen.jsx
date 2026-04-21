import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

const CATEGORY_COLORS = {
  Food: "#5C5CDB",
  Transport: "#0EA5E9",
  Shopping: "#F97316",
  Bills: "#10B981",
  Health: "#EF4444",
  Education: "#8B5CF6",
  Entertainment: "#EC4899",
  Utilities: "#14B8A6"
};

const getCategoryColor = (label) => CATEGORY_COLORS[label] ?? "#64748B";

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState("Month");
  const [chartType, setChartType] = useState("Category Bars");
  const [chartMenuOpen, setChartMenuOpen] = useState(false);
  const [selectedTrendPoint, setSelectedTrendPoint] = useState(null);
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  const periodOptions = ["Week", "Month", "Quarter"];
  const chartOptions = ["Category Bars", "Pie Breakdown", "Line Trend", "Insights"];

  const trendByPeriod = {
    Week: [
      { label: "M", value: 48 },
      { label: "T", value: 67 },
      { label: "W", value: 42 },
      { label: "T", value: 83 },
      { label: "F", value: 59 },
      { label: "S", value: 37 },
      { label: "S", value: 52 }
    ],
    Month: [
      { label: "W1", value: 64 },
      { label: "W2", value: 58 },
      { label: "W3", value: 78 },
      { label: "W4", value: 61 }
    ],
    Quarter: [
      { label: "M1", value: 55 },
      { label: "M2", value: 67 },
      { label: "M3", value: 73 }
    ]
  };

  const categoryByPeriod = {
    Week: [
      { label: "Food", percent: 29, amount: "PKR 6,200" },
      { label: "Transport", percent: 25, amount: "PKR 5,300" },
      { label: "Shopping", percent: 19, amount: "PKR 4,000" },
      { label: "Bills", percent: 14, amount: "PKR 3,100" }
    ],
    Month: [
      { label: "Food", percent: 34, amount: "PKR 14,500" },
      { label: "Transport", percent: 24, amount: "PKR 10,200" },
      { label: "Shopping", percent: 17, amount: "PKR 7,100" },
      { label: "Health", percent: 11, amount: "PKR 4,600" }
    ],
    Quarter: [
      { label: "Food", percent: 31, amount: "PKR 42,000" },
      { label: "Transport", percent: 21, amount: "PKR 28,500" },
      { label: "Shopping", percent: 23, amount: "PKR 30,900" },
      { label: "Bills", percent: 15, amount: "PKR 20,100" }
    ]
  };

  const trendBars = useMemo(() => trendByPeriod[period], [period]);
  const categoryData = useMemo(
    () => categoryByPeriod[period].map((item) => ({ ...item, color: getCategoryColor(item.label) })),
    [period]
  );
  const trendDescriptor = useMemo(() => {
    if (period === "Week") return "Daily spend in the current week.";
    if (period === "Month") return "Average spend per week in this month.";
    return "Average spend per month in this quarter.";
  }, [period]);

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#5C5CDB", "#3F2E95"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
        >
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />
          <Text style={styles.heroGreeting}>Analytics Hub</Text>
          <Text style={styles.heroTitle}>Reports</Text>
          <Text style={styles.heroSub}>Deep spending patterns, smarter decisions.</Text>

          <View style={styles.heroInsightsRow}>
            <View style={styles.heroInsightCard}>
              <Text style={styles.heroInsightTitle}>Top Spend</Text>
              <Text style={styles.heroInsightValue}>Food</Text>
              <Text style={styles.heroInsightNote}>34% share</Text>
            </View>
            <View style={styles.heroInsightCard}>
              <Text style={styles.heroInsightTitle}>Savings Rate</Text>
              <Text style={styles.heroInsightValue}>50%</Text>
              <Text style={styles.heroInsightNote}>Stable trend</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.bodyContainer}>
          <View style={styles.sectionPanel}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Reporting Period</Text>
              <Ionicons name="calendar" size={16} color="#4C46C8" />
            </View>

            <View style={styles.segmentWrapPanel}>
              {periodOptions.map((item) => {
                const active = item === period;
                return (
                  <Pressable key={item} style={[styles.segmentChipPanel, active && styles.segmentChipPanelActive]} onPress={() => setPeriod(item)}>
                    <Text style={[styles.segmentTextPanel, active && styles.segmentTextPanelActive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.kpiGrid}>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Total Income</Text>
                <Text style={[styles.kpiValue, styles.kpiGood]}>PKR 85,000</Text>
              </View>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Total Spent</Text>
                <Text style={[styles.kpiValue, styles.kpiBad]}>PKR 42,500</Text>
              </View>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Net Savings</Text>
                <Text style={[styles.kpiValue, styles.kpiGood]}>PKR 42,500</Text>
              </View>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiLabel}>Transactions</Text>
                <Text style={styles.kpiValue}>34</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionPanel}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>{period} Spending Trend</Text>
              <Text style={styles.labelText}>{period === "Week" ? "7 days" : period === "Month" ? "4 week averages" : "3 month averages"}</Text>
            </View>
            <Text style={styles.trendHint}>{trendDescriptor}</Text>
            <Text style={styles.trendTapHint}>Tap a bar to view exact percentage.</Text>
            <View style={styles.barsRow}>
              {trendBars.map((bar, idx) => {
                const barKey = `${period}-${bar.label}-${idx}`;
                const isSelected = selectedTrendPoint === barKey;
                return (
                  <View key={`bar-${idx}`} style={styles.barColumn}>
                    {isSelected ? <Text style={styles.barValueBubble}>{bar.value}%</Text> : <View style={styles.barBubbleSpacer} />}
                    <Pressable
                      style={styles.barTrack}
                      onPress={() => setSelectedTrendPoint((prev) => (prev === barKey ? null : barKey))}
                    >
                      <View style={[styles.barFill, { height: `${bar.value}%` }]} />
                    </Pressable>
                    <Text style={styles.barLabel}>{bar.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionPanel}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Breakdown</Text>
              <View style={styles.dropdownWrap}>
                <Pressable style={styles.dropdownTrigger} onPress={() => setChartMenuOpen((prev) => !prev)}>
                  <Text style={styles.dropdownTriggerText}>{chartType}</Text>
                  <Ionicons name={chartMenuOpen ? "chevron-up" : "chevron-down"} size={14} color="#4C46C8" />
                </Pressable>
                {chartMenuOpen ? (
                  <View style={styles.dropdownMenu}>
                    {chartOptions.map((option) => {
                      const selected = option === chartType;
                      return (
                        <Pressable
                          key={option}
                          style={[styles.dropdownItem, selected && styles.dropdownItemSelected]}
                          onPress={() => {
                            setChartType(option);
                            setChartMenuOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownItemText, selected && styles.dropdownItemTextSelected]}>{option}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>

            {chartType === "Category Bars" ? (
              <View>
                {categoryData.map((item) => (
                  <View key={item.label} style={styles.categoryRow}>
                    <View style={styles.categoryTopRow}>
                      <View style={styles.categoryLabelWrap}>
                        <View style={[styles.dot, { backgroundColor: item.color }]} />
                        <Text style={styles.categoryText}>{item.label}</Text>
                      </View>
                      <Text style={styles.percentText}>{item.percent}%</Text>
                    </View>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
                    </View>
                    <Text style={styles.categoryAmount}>{item.amount}</Text>
                  </View>
                ))}
              </View>
            ) : chartType === "Pie Breakdown" ? (
              <View>
                <View style={styles.pieStripRow}>
                  {categoryData.map((item) => (
                    <View key={`${item.label}-strip`} style={[styles.pieStripSegment, { width: `${item.percent}%`, backgroundColor: item.color }]} />
                  ))}
                </View>
                {categoryData.map((item) => (
                  <View key={`${item.label}-legend`} style={styles.pieLegendRow}>
                    <View style={[styles.dot, { backgroundColor: item.color }]} />
                    <Text style={styles.categoryText}>{item.label}</Text>
                    <Text style={styles.pieLegendMeta}>{item.percent}% | {item.amount}</Text>
                  </View>
                ))}
              </View>
            ) : chartType === "Line Trend" ? (
              <View style={styles.lineStack}>
                {trendBars.map((point, idx) => (
                  <View key={`${point.label}-${idx}`} style={styles.linePointRow}>
                    <Text style={styles.linePointLabel}>{point.label}</Text>
                    <View style={styles.lineTrack}>
                      <View style={[styles.lineFill, { width: `${point.value}%` }]} />
                    </View>
                    <Text style={styles.linePointValue}>{point.value}%</Text>
                  </View>
                ))}
                <Text style={styles.lineFootnote}>Tip: This line-style view emphasizes progression between checkpoints.</Text>
              </View>
            ) : (
              <View style={styles.insightStack}>
                <View style={styles.insightCard}>
                  <Text style={styles.insightTitle}>Top Insight</Text>
                  <Text style={styles.insightText}>
                    Transport and food together make up more than half of your spend. A 10% cut in both could free around PKR 2,400 monthly.
                  </Text>
                </View>
                <View style={styles.insightCard}>
                  <Text style={styles.insightTitle}>Action Suggestion</Text>
                  <Text style={styles.insightText}>
                    Shift two non-essential purchases from this week to next month to reduce current cycle pressure.
                  </Text>
                </View>
              </View>
            )}
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
    paddingBottom: 20,
    minHeight: 290,
    marginBottom: 12,
    overflow: "hidden"
  },
  bodyContainer: {
    backgroundColor: "#F4F4FF",
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22
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
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 38,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSub: {
    marginTop: 2,
    color: "#D7DEFF",
    fontSize: 13,
    fontFamily: "Sora_500Medium"
  },
  heroInsightsRow: {
    flexDirection: "row"
  },
  heroInsightCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    marginTop: 16,
    marginRight: 10
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
    marginBottom: 14
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  segmentWrapPanel: {
    backgroundColor: "#E5E7FF",
    borderRadius: 14,
    padding: 4,
    flexDirection: "row",
    marginBottom: 10
  },
  segmentChipPanel: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  segmentChipPanelActive: {
    backgroundColor: "#5C5CDB"
  },
  segmentTextPanel: {
    color: "#4B5563",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  segmentTextPanelActive: {
    color: "#FFFFFF"
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  kpiCard: {
    width: "48.5%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8DEF6",
    padding: 12,
    marginBottom: 9
  },
  kpiLabel: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  kpiValue: {
    color: "#1F2937",
    marginTop: 5,
    fontSize: 15,
    fontFamily: "Sora_700Bold"
  },
  kpiGood: {
    color: "#15803D"
  },
  kpiBad: {
    color: "#B91C1C"
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Sora_800ExtraBold",
    color: "#0F172A"
  },
  labelText: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  trendHint: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginTop: -2
  },
  trendTapHint: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_500Medium",
    marginTop: 2
  },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 130,
    marginTop: 14
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    marginRight: 6
  },
  barValueBubble: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 8,
    color: "#3730A3",
    fontSize: 10,
    fontFamily: "Sora_700Bold"
  },
  barBubbleSpacer: {
    height: 24
  },
  barTrack: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
    height: 108,
    justifyContent: "flex-end",
    overflow: "hidden"
  },
  barFill: {
    width: "100%",
    backgroundColor: "#5C5CDB",
    borderRadius: 8
  },
  barLabel: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold"
  },
  dropdownWrap: {
    position: "relative"
  },
  dropdownTrigger: {
    minWidth: 138,
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dropdownTriggerText: {
    color: "#3730A3",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    overflow: "hidden"
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2FF"
  },
  dropdownItemSelected: {
    backgroundColor: "#EEF2FF"
  },
  dropdownItemText: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  dropdownItemTextSelected: {
    color: "#3730A3",
    fontFamily: "Sora_700Bold"
  },
  categoryRow: {
    marginTop: 12
  },
  categoryTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  categoryLabelWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 8
  },
  categoryText: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  percentText: {
    color: "#334155",
    fontFamily: "Sora_700Bold"
  },
  progressTrack: {
    marginTop: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 999
  },
  categoryAmount: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  pieStripRow: {
    flexDirection: "row",
    height: 14,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10
  },
  pieStripSegment: {
    height: "100%"
  },
  pieLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  pieLegendMeta: {
    marginLeft: "auto",
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  lineStack: {
    marginTop: 2
  },
  linePointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  linePointLabel: {
    width: 30,
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  lineTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden"
  },
  lineFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  linePointValue: {
    width: 42,
    textAlign: "right",
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold"
  },
  lineFootnote: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium"
  }
});
