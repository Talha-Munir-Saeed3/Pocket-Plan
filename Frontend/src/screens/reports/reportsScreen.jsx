import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StatCard from "../../components/cards/statCard";
import ScreenContainer from "../../components/common/screenContainer";

export default function ReportsScreen() {
  const categoryData = [
    { label: "Food", percent: 34, color: "#5C5CDB" },
    { label: "Transport", percent: 24, color: "#0EA5E9" },
    { label: "Shopping", percent: 17, color: "#F97316" },
    { label: "Health", percent: 11, color: "#10B981" }
  ];

  const weeklyBars = [56, 72, 38, 91, 64, 40, 52];

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={styles.hero}>
          <View style={styles.heroLight} />
          <Text style={styles.heroTitle}>Reports</Text>
          <Text style={styles.heroSubtitle}>Visual insights for better spending decisions.</Text>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <StatCard label="Total Income" value="85,000" tone="good" />
          <StatCard label="Total Spent" value="42,500" tone="bad" />
          <StatCard label="Net Savings" value="42,500" tone="good" />
          <StatCard label="Transactions" value="34" />
        </View>

        <View style={styles.analyticsCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Weekly Spending Trend</Text>
            <Text style={styles.labelText}>Last 7 days</Text>
          </View>
          <View style={styles.barsRow}>
            {weeklyBars.map((bar, idx) => (
              <View key={`bar-${idx}`} style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${bar}%` }]} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.analyticsCard}>
          <Text style={styles.sectionTitle}>Spending by Category</Text>
          {categoryData.map((item) => (
            <View key={item.label} style={styles.categoryRow}>
              <View style={styles.categoryLabelWrap}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.categoryText}>{item.label}</Text>
              </View>
              <Text style={styles.percentText}>{item.percent}%</Text>
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
    padding: 18,
    paddingBottom: 26
  },
  hero: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden"
  },
  heroLight: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    right: -45,
    top: -30,
    backgroundColor: "rgba(255,255,255,0.14)"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900"
  },
  heroSubtitle: {
    marginTop: 6,
    color: "#D6DFFF",
    fontSize: 14
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14
  },
  analyticsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
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
    gap: 8,
    height: 130,
    marginTop: 14
  },
  barTrack: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden"
  },
  barFill: {
    width: "100%",
    backgroundColor: "#5C5CDB",
    borderRadius: 8
  },
  categoryRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999
  },
  categoryText: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 14
  },
  percentText: {
    color: "#334155",
    fontWeight: "800"
  }
});
