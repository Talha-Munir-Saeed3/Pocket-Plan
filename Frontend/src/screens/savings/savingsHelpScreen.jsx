import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function SavingsHelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const section = useMemo(() => {
    const value = String(params.section || "overview").toLowerCase();
    return value === "plan" ? "plan" : "overview";
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
            <Text style={styles.heroTitle}>Savings Help</Text>
            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>{section === "plan" ? "Plan tab guide" : "Overview tab guide"}</Text>
        </LinearGradient>

        {section === "overview" ? (
          <View style={styles.sectionStack}>
            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 Overview At A Glance</Text>
              <Text style={styles.item}>Use this tab for quick status checks.</Text>
              <Text style={styles.item}>You can see total progress, monthly health, and ETA in one view.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxGreen]}>
              <Text style={styles.sectionHead}>🟢 Monthly Progress Meaning</Text>
              <Text style={styles.item}>On Track: You are saving at or above your recommended monthly amount.</Text>
              <Text style={styles.item}>Caution: You are close, but slightly below target for this month.</Text>
              <Text style={styles.item}>Off Track: You are under target and may need to increase monthly saving.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxAmber]}>
              <Text style={styles.sectionHead}>🟡 Status Scale (With Colors)</Text>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#16A34A" }]} />
                <Text style={styles.item}>On Track = 100% and above</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#EAB308" }]} />
                <Text style={styles.item}>Caution = 75% to 99%</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#DC2626" }]} />
                <Text style={styles.item}>Off Track = below 75%</Text>
              </View>
            </View>

            <View style={[styles.sectionBox, styles.boxAmber]}>
              <Text style={styles.sectionHead}>🟡 What To Check First</Text>
              <Text style={styles.item}>1. Monthly Progress status (On Track/Caution/Off Track)</Text>
              <Text style={styles.item}>2. ETA in months</Text>
              <Text style={styles.item}>3. Remaining amount</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 How ETA Is Calculated</Text>
              <Text style={styles.item}>Formula: ETA (months) = Remaining Amount / Monthly Saving</Text>
              <Text style={styles.item}>The app rounds this up to the next full month.</Text>
              <Text style={styles.item}>Example:</Text>
              <Text style={styles.item}>Remaining = PKR 107,500</Text>
              <Text style={styles.item}>Monthly Saving = PKR 12,000</Text>
              <Text style={styles.item}>107,500 / 12,000 = 8.95, so ETA shown is 9 months.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 Progress Bar Interaction</Text>
              <Text style={styles.item}>Tap the total or monthly progress bar to reveal the exact percentage on the bar.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxGrey]}>
              <Text style={styles.sectionHead}>⚫ Tip</Text>
              <Text style={styles.item}>If status stays Low for multiple months, open Plan tab and increase Monthly Saving.</Text>
            </View>
          </View>
        ) : (
          <View style={styles.sectionStack}>
            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 Plan Tab Purpose</Text>
              <Text style={styles.item}>This tab stores the values used to calculate progress and ETA.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxGreen]}>
              <Text style={styles.sectionHead}>🟢 Adjust Button</Text>
              <Text style={styles.item}>Tap Adjust to edit only three fields in the bottom sheet:</Text>
              <Text style={styles.item}>- Goal Name</Text>
              <Text style={styles.item}>- Total Target</Text>
              <Text style={styles.item}>- Monthly Saving</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxAmber]}>
              <Text style={styles.sectionHead}>🟡 Auto-Calculated Fields</Text>
              <Text style={styles.item}>Saved amount is auto-calculated by the app.</Text>
              <Text style={styles.item}>It is not editable in Plan to keep progress data consistent.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 ETA And Plan Changes</Text>
              <Text style={styles.item}>When you change Monthly Saving, ETA updates immediately.</Text>
              <Text style={styles.item}>Higher monthly saving reduces ETA; lower saving increases ETA.</Text>
            </View>

            <View style={[styles.sectionBox, styles.boxPurple]}>
              <Text style={styles.sectionHead}>🟣 Premium Option</Text>
              <Text style={styles.item}>Add Another Goal is reserved for Premium users.</Text>
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
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    marginTop: 4,
    marginBottom: 6
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
    alignItems: "center",
    gap: 8,
    marginBottom: 2
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999
  }
});