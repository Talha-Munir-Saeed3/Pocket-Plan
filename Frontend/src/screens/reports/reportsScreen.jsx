import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StatCard from "../../components/cards/statCard";
import ScreenContainer from "../../components/common/screenContainer";

export default function ReportsScreen() {
  const [period, setPeriod] = useState("Month");

  const periodOptions = ["Week", "Month", "Quarter"];

  const trendByPeriod = {
    Week: [48, 67, 42, 83, 59, 37, 52],
    Month: [64, 58, 78, 47, 72, 56, 69],
    Quarter: [42, 55, 71, 63, 82, 76, 68]
  };

  const categoryByPeriod = {
    Week: [
      { label: "Food", percent: 29, color: "#5C5CDB", amount: "PKR 6,200" },
      { label: "Transport", percent: 25, color: "#0EA5E9", amount: "PKR 5,300" },
      { label: "Shopping", percent: 19, color: "#F97316", amount: "PKR 4,000" },
      { label: "Bills", percent: 14, color: "#10B981", amount: "PKR 3,100" }
    ],
    Month: [
      { label: "Food", percent: 34, color: "#5C5CDB", amount: "PKR 14,500" },
      { label: "Transport", percent: 24, color: "#0EA5E9", amount: "PKR 10,200" },
      { label: "Shopping", percent: 17, color: "#F97316", amount: "PKR 7,100" },
      { label: "Health", percent: 11, color: "#10B981", amount: "PKR 4,600" }
    ],
    Quarter: [
      { label: "Food", percent: 31, color: "#5C5CDB", amount: "PKR 42,000" },
      { label: "Transport", percent: 21, color: "#0EA5E9", amount: "PKR 28,500" },
      { label: "Shopping", percent: 23, color: "#F97316", amount: "PKR 30,900" },
      { label: "Bills", percent: 15, color: "#10B981", amount: "PKR 20,100" }
    ]
  };

  const trendBars = useMemo(() => trendByPeriod[period], [period]);
  const categoryData = useMemo(() => categoryByPeriod[period], [period]);

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#16193B", "#5C5CDB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroLightA} />
          <View style={styles.heroLightB} />
          <Text style={styles.heroKicker}>Insights</Text>
          <Text style={styles.heroTitle}>Reports</Text>
          <Text style={styles.heroSubtitle}>Visual breakdowns to support smarter weekly and monthly choices.</Text>

          <View style={styles.segmentWrap}>
            {periodOptions.map((item) => {
              const active = item === period;
              return (
                <Pressable key={item} style={[styles.segmentChip, active && styles.segmentChipActive]} onPress={() => setPeriod(item)}>
                  <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <StatCard label="Total Income" value="85,000" tone="good" />
          <StatCard label="Total Spent" value="42,500" tone="bad" />
          <StatCard label="Net Savings" value="42,500" tone="good" />
          <StatCard label="Transactions" value="34" />
        </View>

        <View style={styles.analyticsCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>{period} Spending Trend</Text>
            <Text style={styles.labelText}>Last 7 checkpoints</Text>
          </View>
          <View style={styles.barsRow}>
            {trendBars.map((bar, idx) => {
              const labels = ["M", "T", "W", "T", "F", "S", "S"];
              return (
                <View key={`bar-${idx}`} style={styles.barColumn}>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: `${bar}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{labels[idx]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.analyticsCard}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
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

        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Top Insight</Text>
          <Text style={styles.insightText}>
            Transport and food together make up more than half of your spend. A 10% cut in these two categories could free up around PKR 2,400 monthly.
          </Text>
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
    padding: 16,
    paddingBottom: 26
  },
  hero: {
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 12,
    overflow: "hidden"
  },
  heroLightA: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 999,
    right: -34,
    top: -24,
    backgroundColor: "rgba(255,255,255,0.15)"
  },
  heroLightB: {
    position: "absolute",
    width: 220,
    height: 64,
    left: -62,
    bottom: -32,
    transform: [{ rotate: "-12deg" }],
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  heroKicker: {
    color: "rgba(229,232,255,0.9)",
    fontSize: 12,
    fontWeight: "700"
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 6,
    fontSize: 27,
    fontWeight: "900"
  },
  heroSubtitle: {
    marginTop: 8,
    color: "rgba(237,240,255,0.92)",
    fontSize: 13.5
  },
  segmentWrap: {
    marginTop: 12,
    flexDirection: "row"
  },
  segmentChip: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: 8
  },
  segmentChipActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF"
  },
  segmentText: {
    color: "#E5E7FF",
    fontSize: 12,
    fontWeight: "800"
  },
  segmentTextActive: {
    color: "#3730A3"
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12
  },
  analyticsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    marginBottom: 14
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0F172A"
  },
  labelText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700"
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
    fontWeight: "700"
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
    fontWeight: "700",
    fontSize: 14
  },
  percentText: {
    color: "#334155",
    fontWeight: "800"
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
    fontWeight: "700"
  },
  insightCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D7DEEF",
    backgroundColor: "#F8FAFF",
    padding: 14
  },
  insightTitle: {
    color: "#3730A3",
    fontSize: 14,
    fontWeight: "900"
  },
  insightText: {
    color: "#334155",
    marginTop: 6,
    lineHeight: 20,
    fontSize: 13
  }
});
