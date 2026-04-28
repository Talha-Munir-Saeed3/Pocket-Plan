import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function BudgetHelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const section = useMemo(() => {
    const value = String(params.section || "overview").toLowerCase();
    return value === "allocation" ? "allocation" : "overview";
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
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 10 }] }>
          <View style={styles.heroRow}>
            <Text style={styles.heroTitle}>Budget Help</Text>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>
            {section === "allocation" ? "Allocation guide" : "Overview guide"}
          </Text>
        </LinearGradient>

        {section === "allocation" ? (
          <View style={styles.sectionStack}>
            <View style={[styles.sectionBox, styles.boxPurple]}>
              <View style={styles.headRow}>
                <Ionicons name="information-circle" size={16} color="#6D28D9" />
                <Text style={styles.sectionHead}>Steps</Text>
              </View>
              <Text style={styles.item}>1. Enter monthly budget first.</Text>
              <Text style={styles.item}>2. Allocate limits per category.</Text>
              <Text style={styles.item}>3. Use Split Evenly if you want a quick balanced start.</Text>
              <Text style={styles.item}>4. Fine tune categories based on your spending priorities.</Text>
              <Text style={styles.item}>5. Save Snapshot if you want to reuse this plan later.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxGreen]}>
              <View style={styles.headRow}>
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text style={styles.sectionHead}>When To Allocate</Text>
              </View>
              <Text style={styles.item}>Best practice is to set allocation at the start of the month, then adjust as needed if your real spending pattern changes.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxAmber]}>
              <View style={styles.headRow}>
                <Ionicons name="warning" size={16} color="#D97706" />
                <Text style={styles.sectionHead}>Mid-Month Update Warning</Text>
              </View>
              <Text style={styles.item}>If you edit after spending has already started, you will see a warning for transparency.</Text>
              <Text style={styles.item}>Warning options:</Text>
              <Text style={styles.item}>- Cancel</Text>
              <Text style={styles.item}>- Update Anyway</Text>
              <Text style={styles.item}>- Don't Show Again (for the rest of this Allocation session)</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxRed]}>
              <View style={styles.headRow}>
                <Ionicons name="alert" size={16} color="#DC2626" />
                <Text style={styles.sectionHead}>Clear Plan Warning</Text>
              </View>
              <Text style={styles.item}>Clear Plan shows a confirmation dialog before resetting all limits to 0.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxPurple]}>
              <View style={styles.headRow}>
                <Ionicons name="layers" size={16} color="#6D28D9" />
                <Text style={styles.sectionHead}>Split Evenly Example</Text>
              </View>
              <Text style={styles.item}>Example: Budget = PKR 75,000 and 5 categories selected. Each category gets PKR 15,000 (or near-even distribution when remainder exists).</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxGrey]}>
              <View style={styles.headRow}>
                <Ionicons name="document-text" size={16} color="#4B5563" />
                <Text style={styles.sectionHead}>Save Snapshot</Text>
              </View>
              <Text style={styles.item}>Saves the current plan for quick reload in this session. (Will be removed once APIs are created to reduce load and auto-save.)</Text>
            </View>
          </View>
        ) : (
          <View style={styles.sectionStack}>
            <View style={[styles.sectionBox, styles.boxPurple]}>
              <View style={styles.headRow}>
                <Ionicons name="information-circle" size={16} color="#6D28D9" />
                <Text style={styles.sectionHead}>How It Works</Text>
              </View>
              <Text style={styles.item}>Overview shows progress only for categories where spending exists.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxAmber]}>
              <View style={styles.headRow}>
                <Ionicons name="bulb" size={16} color="#D97706" />
                <Text style={styles.sectionHead}>Visual Status Guide</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#16A34A" }]} />
                <Text style={styles.item}>0% to 60% used</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#D97706" }]} />
                <Text style={styles.item}>61% to 80% used</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#EA580C" }]} />
                <Text style={styles.item}>81% to 99% used (critical)</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#DC2626" }]} />
                <Text style={styles.item}>100%+ used (over limit)</Text>
              </View>
            </View>

            <View style={[styles.sectionBox, styles.boxRed]}>
              <View style={styles.headRow}>
                <Ionicons name="alert-circle" size={16} color="#DC2626" />
                <Text style={styles.sectionHead}>Priority Check</Text>
              </View>
              <Text style={styles.item}>Use Over Limit and Critical summary cards first to identify risk categories quickly.</Text>
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
  sectionStack: {
    gap: 10
  },
  sectionBox: {
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
  boxRed: {
    borderLeftColor: "#DC2626",
    backgroundColor: "#FFF6F6"
  },
  boxPurple: {
    borderLeftColor: "#6D28D9",
    backgroundColor: "#F8F5FF"
  },
  boxGrey: {
    borderLeftColor: "#4B5563",
    backgroundColor: "#F8FAFC"
  },
  sectionHead: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginTop: 6,
    marginBottom: 4
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    marginBottom: 4
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999
  },
  item: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 4
  }
});
