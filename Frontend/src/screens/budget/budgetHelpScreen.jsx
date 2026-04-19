import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";

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
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
          </View>
          <Text style={styles.heroSub}>
            {section === "allocation" ? "Allocation guide" : "Overview guide"}
          </Text>
        </LinearGradient>

        {section === "allocation" ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Allocation Tab Help</Text>
            <Text style={styles.sectionHead}>Steps</Text>
            <Text style={styles.item}>1. Enter monthly budget first.</Text>
            <Text style={styles.item}>2. Allocate limits per category.</Text>
            <Text style={styles.item}>3. Use Split Evenly if you want a quick balanced start.</Text>
            <Text style={styles.item}>4. Fine tune categories based on your spending priorities.</Text>
            <Text style={styles.item}>5. Save Snapshot if you want to reuse this plan later.</Text>

            <Text style={styles.sectionHead}>When To Allocate</Text>
            <Text style={styles.item}>Best practice is to set allocation at the start of the month, then adjust as needed if your real spending pattern changes.</Text>

            <Text style={styles.sectionHead}>Mid-Month Update Warning</Text>
            <Text style={styles.item}>If you edit after spending has already started, you will see a warning for transparency.</Text>
            <Text style={styles.item}>Warning options:</Text>
            <Text style={styles.item}>- Cancel</Text>
            <Text style={styles.item}>- Update Anyway</Text>
            <Text style={styles.item}>- Don't Show Again (for the rest of this Allocation session)</Text>

            <Text style={styles.sectionHead}>Clear Plan Warning</Text>
            <Text style={styles.item}>Clear Plan shows a confirmation dialog before resetting all limits to 0.</Text>

            <Text style={styles.sectionHead}>Split Evenly Example</Text>
            <Text style={styles.item}>Example: Budget = PKR 75,000 and 5 categories selected. Each category gets PKR 15,000 (or near-even distribution when remainder exists).</Text>

            <Text style={styles.sectionHead}>Save Snapshot</Text>
            <Text style={styles.item}>Saves the current plan for quick reload in this session. (Will be removed once APIs are created to reduce load and auto-save.)</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Overview Tab Help</Text>
            <Text style={styles.item}>Overview shows progress only for categories where spending exists.</Text>
            <Text style={styles.sectionHead}>Color Mapping</Text>
            <Text style={styles.item}>- Green = 0% to 60%</Text>
            <Text style={styles.item}>- Amber = 61% to 80%</Text>
            <Text style={styles.item}>- Orange = 81% to 99%</Text>
            <Text style={styles.item}>- Red = 100% and above</Text>
            <Text style={styles.item}>Use the Over Limit and Critical summary cards first to identify risk categories quickly.</Text>
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
  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12
  },
  cardTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    marginBottom: 8
  },
  sectionHead: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginTop: 6,
    marginBottom: 4
  },
  item: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 4
  }
});
