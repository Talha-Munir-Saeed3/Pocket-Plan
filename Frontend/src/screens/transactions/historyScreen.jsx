import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ScreenContainer from "../../components/common/screenContainer";
import PrimaryButton from "../../components/common/primaryButton";

export default function HistoryScreen() {
  const { width } = useWindowDimensions();
  const compact = width < 380;
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const transactions = [
    { id: "1", title: "McDonald's", category: "Food", date: "Today, 2:45 PM", amount: -850 },
    { id: "2", title: "Careem Ride", category: "Transport", date: "Today, 9:15 AM", amount: -450 },
    { id: "3", title: "Freelance Payment", category: "Income", date: "Yesterday", amount: 18000 },
    { id: "4", title: "Fuel", category: "Transport", date: "Yesterday", amount: -3200 },
    { id: "5", title: "Daraz Order", category: "Shopping", date: "Apr 12", amount: -4500 }
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesQuery = query
        ? `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Expenses" && item.amount < 0) ||
        (activeFilter === "Income" && item.amount > 0) ||
        (activeFilter === "This Week" && item.id !== "5");

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={styles.hero}>
          <View style={styles.heroOrb} />
          <Text style={styles.heroTitle}>Transaction History</Text>
          <Text style={[styles.heroSubtitle, compact && styles.heroSubtitleCompact]}>Search and filter your full transaction timeline.</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>This month</Text>
              <Text style={styles.summaryValue}>34 entries</Text>
            </View>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>Spent</Text>
              <Text style={styles.summaryValue}>PKR 42,500</Text>
            </View>
          </View>
        </LinearGradient>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or category"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
        />

        <View style={styles.filtersRow}>
          {["All", "Expenses", "Income", "This Week"].map((filter) => (
            <Pressable
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterChipText, activeFilter === filter && styles.filterChipTextActive]}>{filter}</Text>
            </Pressable>
          ))}
        </View>

        {filteredTransactions.map((item) => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View style={styles.timelineDot} />
              <View>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionMeta}>{item.category} | {item.date}</Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, item.amount < 0 ? styles.amountNegative : styles.amountPositive]}>
              {item.amount < 0 ? "-" : "+"}PKR {Math.abs(item.amount).toLocaleString()}
            </Text>
          </View>
        ))}

        {filteredTransactions.length === 0 ? <PrimaryButton label="Reset Filters" variant="secondary" onPress={() => { setQuery(""); setActiveFilter("All"); }} /> : null}
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
  heroOrb: {
    position: "absolute",
    width: 150,
    height: 150,
    right: -40,
    top: -30,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900"
  },
  heroSubtitle: {
    color: "#D6DFFF",
    marginTop: 6,
    fontSize: 14
  },
  heroSubtitleCompact: {
    fontSize: 13
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14
  },
  summaryChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 10
  },
  summaryLabel: {
    color: "#D6DFFF",
    fontSize: 11,
    fontWeight: "700"
  },
  summaryValue: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "800"
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827"
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 10
  },
  filterChip: {
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999
  },
  filterChipActive: {
    borderColor: "#5C5CDB",
    backgroundColor: "#5C5CDB"
  },
  filterChipText: {
    color: "#2E2FA8",
    fontSize: 13,
    fontWeight: "700"
  },
  filterChipTextActive: {
    color: "#FFFFFF"
  },
  transactionCard: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A"
  },
  transactionMeta: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "800"
  },
  amountNegative: {
    color: "#B91C1C"
  },
  amountPositive: {
    color: "#15803D"
  }
});
