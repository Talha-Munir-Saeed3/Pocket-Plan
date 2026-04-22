import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function ReportsHelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 10 }]}>
          <View style={styles.heroRow}>
            <Text style={styles.heroTitle}>Reports Help</Text>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>How trends and breakdown modes are calculated.</Text>
        </LinearGradient>

        <View style={styles.stack}>
          <View style={[styles.box, styles.boxPurple]}>
            <View style={styles.headRow}>
              <Ionicons name="analytics" size={16} color="#6D28D9" />
              <Text style={styles.head}>How Spending Trends Are Calculated</Text>
            </View>
            <View style={styles.splitCard}>
              <View style={styles.splitCardHeadRow}>
                <Ionicons name="today" size={14} color="#6D28D9" />
                <Text style={styles.splitCardHead}>Week View</Text>
              </View>
              <Text style={styles.item}>Uses daily spend percentages for the current 7-day window.</Text>
            </View>
            <View style={styles.splitCard}>
              <View style={styles.splitCardHeadRow}>
                <Ionicons name="calendar" size={14} color="#6D28D9" />
                <Text style={styles.splitCardHead}>Month View</Text>
              </View>
              <Text style={styles.item}>Uses four weekly averages instead of raw daily totals.</Text>
            </View>
            <View style={styles.splitCard}>
              <View style={styles.splitCardHeadRow}>
                <Ionicons name="calendar-clear" size={14} color="#6D28D9" />
                <Text style={styles.splitCardHead}>Quarter View</Text>
              </View>
              <Text style={styles.item}>Uses three monthly averages, one per month in the quarter.</Text>
            </View>
            <View style={styles.hintRow}>
              <Ionicons name="hand-left" size={14} color="#5B21B6" />
              <Text style={styles.hintText}>Tap any trend bar to reveal the exact percentage for that checkpoint.</Text>
            </View>
          </View>

          <View style={[styles.box, styles.boxBlue]}>
            <View style={styles.headRow}>
              <Ionicons name="grid" size={16} color="#1D4ED8" />
              <Text style={styles.head}>What Breakdown Options Provide</Text>
            </View>
            <View style={[styles.optionCard, styles.optionCardIndigo]}>
              <View style={styles.optionHeadRow}>
                <Ionicons name="bar-chart" size={14} color="#3730A3" />
                <Text style={styles.optionHead}>Category Bars</Text>
              </View>
              <Text style={styles.item}>Shows category share with progress bars and amount per category.</Text>
            </View>

            <View style={[styles.optionCard, styles.optionCardCyan]}>
              <View style={styles.optionHeadRow}>
                <Ionicons name="pie-chart" size={14} color="#0E7490" />
                <Text style={styles.optionHead}>Pie Breakdown</Text>
              </View>
              <Text style={styles.item}>Shows proportional split with legend percentages and amounts.</Text>
            </View>

            <View style={[styles.optionCard, styles.optionCardSky]}>
              <View style={styles.optionHeadRow}>
                <Ionicons name="analytics" size={14} color="#1D4ED8" />
                <Text style={styles.optionHead}>Line Trend</Text>
              </View>
              <Text style={styles.item}>Shows progression across selected period checkpoints.</Text>
            </View>

            <View style={[styles.optionCard, styles.optionCardLavender]}>
              <View style={styles.optionHeadRow}>
                <Ionicons name="sparkles" size={14} color="#7C3AED" />
                <Text style={styles.optionHead}>Insights</Text>
              </View>
              <Text style={styles.item}>Shows summary cards with recommended action and expected impact.</Text>
            </View>
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
    paddingHorizontal: 14,
    paddingTop: 0
  },
  hero: {
    marginHorizontal: -14,
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSub: {
    marginTop: 6,
    color: "#DCE2FF",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  closeBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  stack: {
    gap: 10
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    borderLeftWidth: 4,
    padding: 12
  },
  boxPurple: {
    borderLeftColor: "#6D28D9",
    backgroundColor: "#F8F5FF"
  },
  boxBlue: {
    borderLeftColor: "#1D4ED8",
    backgroundColor: "#F1F6FF"
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  head: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    marginBottom: 6,
    marginLeft: 6
  },
  splitCard: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  splitCardHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  splitCardHead: {
    color: "#4C1D95",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginLeft: 6
  },
  hintRow: {
    borderWidth: 1,
    borderColor: "#DDD6FE",
    backgroundColor: "#F3E8FF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  hintText: {
    color: "#4C1D95",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold",
    marginLeft: 6,
    flex: 1
  },
  optionCard: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  optionCardIndigo: {
    borderColor: "#C7D2FE"
  },
  optionCardCyan: {
    borderColor: "#A5F3FC"
  },
  optionCardSky: {
    borderColor: "#BFDBFE"
  },
  optionCardLavender: {
    borderColor: "#DDD6FE"
  },
  optionHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  optionHead: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginLeft: 6
  },
  item: {
    color: "#334155",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 5
  }
});
