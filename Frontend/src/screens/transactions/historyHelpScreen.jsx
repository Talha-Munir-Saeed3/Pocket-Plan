import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function HistoryHelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const section = useMemo(() => {
    const value = String(params.section || "transactions").toLowerCase();
    return value === "goals" ? "goals" : "transactions";
  }, [params.section]);

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
            <Text style={styles.heroTitle}>History Help</Text>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>{section === "goals" ? "Goals tab guide" : "Transactions tab guide"}</Text>
        </LinearGradient>

        {section === "transactions" ? (
          <View style={styles.stack}>
            <View style={[styles.box, styles.boxPurple]}>
              <View style={styles.headRow}>
                <Ionicons name="time" size={16} color="#6D28D9" />
                <Text style={styles.head}>Transactions Tab</Text>
              </View>
              <Text style={styles.item}>History is grouped month by month by default so you can review movement chronologically.</Text>
              <Text style={styles.item}>Use All to scan everything, Expenses to isolate outflow pressure, Income to verify incoming cash, and This Week for short-window checks.</Text>
              <Text style={styles.item}>Search helps you pinpoint a merchant or category instantly without scrolling all entries.</Text>
            </View>

            <View style={[styles.box, styles.boxGreen]}>
              <View style={styles.headRow}>
                <Ionicons name="color-palette" size={16} color="#16A34A" />
                <Text style={styles.head}>Color Guide</Text>
              </View>
              <View style={styles.legendRow}>
                <Ionicons name="ellipse" size={10} color="#16A34A" />
                <Text style={styles.item}>Green cards indicate income entries.</Text>
              </View>
              <View style={styles.legendRow}>
                <Ionicons name="ellipse" size={10} color="#F97316" />
                <Text style={styles.item}>Orange cards indicate expense entries.</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.stack}>
            <View style={[styles.box, styles.boxPurple]}>
              <View style={styles.headRow}>
                <Ionicons name="flag" size={16} color="#6D28D9" />
                <Text style={styles.head}>Goals Tab</Text>
              </View>
              <Text style={styles.item}>This timeline records what happened to goals from the start, not just recent months.</Text>
              <Text style={styles.item}>Each event includes goal name, status, event action, and date.</Text>
            </View>

            <View style={[styles.box, styles.boxGreen]}>
              <View style={styles.headRow}>
                <Ionicons name="layers" size={16} color="#16A34A" />
                <Text style={styles.head}>Status UI Preview</Text>
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewPill, styles.previewCompleted]}>
                  <Text style={styles.previewText}>Completed</Text>
                </View>
                <Text style={styles.previewMeta}>Target reached and goal closed.</Text>
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewPill, styles.previewOnTrack]}>
                  <Text style={styles.previewText}>On Track</Text>
                </View>
                <Text style={styles.previewMeta}>Progress is healthy against timeline.</Text>
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewPill, styles.previewDelayed]}>
                  <Text style={styles.previewText}>Delayed</Text>
                </View>
                <Text style={styles.previewMeta}>Contribution fell behind timeline.</Text>
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewPill, styles.previewAdjusted]}>
                  <Text style={styles.previewText}>Adjusted</Text>
                </View>
                <Text style={styles.previewMeta}>Timeline or target was revised.</Text>
              </View>
            </View>

            <View style={[styles.box, styles.boxAmber]}>
              <View style={styles.headRow}>
                <Ionicons name="bulb" size={16} color="#D97706" />
                <Text style={styles.head}>Best Use</Text>
              </View>
              <Text style={styles.item}>Use this tab to review outcome history before changing goal amounts in planning screens.</Text>
            </View>
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
  boxGreen: {
    borderLeftColor: "#16A34A",
    backgroundColor: "#F5FFF8"
  },
  boxAmber: {
    borderLeftColor: "#D97706",
    backgroundColor: "#FFF9F2"
  },
  boxPurple: {
    borderLeftColor: "#6D28D9",
    backgroundColor: "#F8F5FF"
  },
  head: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    marginBottom: 6,
    marginLeft: 6
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  item: {
    color: "#334155",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 5
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7
  },
  previewPill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8
  },
  previewCompleted: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC"
  },
  previewOnTrack: {
    backgroundColor: "#DBEAFE",
    borderColor: "#93C5FD"
  },
  previewDelayed: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5"
  },
  previewAdjusted: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D"
  },
  previewText: {
    color: "#1F2937",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  previewMeta: {
    color: "#334155",
    fontSize: 12,
    fontFamily: "Sora_600SemiBold",
    flex: 1
  }
});