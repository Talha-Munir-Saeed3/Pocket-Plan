import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";

export default function PremiumScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const selectedThemeId = useThemeStore((s) => s.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((t) => t.id === selectedThemeId) ?? THEME_OPTIONS[0];
  const [fontsLoaded] = useFonts({ Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold });
  if (!fontsLoaded) return null;

  const onStartTrial = () => {
    Alert.alert("Start Trial", "Start 7-day free trial — purchase flow coming soon.");
  };

  const onGetYearly = () => {
    Alert.alert("Get Yearly", "Yearly purchase flow coming soon.");
  };

  return (
    <ScreenContainer style={[styles.screen, { backgroundColor: activeTheme.backgroundColor }]} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[activeTheme.boxColor, activeTheme.supportingAccent]} style={[styles.hero, { paddingTop: insets.top + 12 }]}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroTitle}>Premium Plans</Text>
            <Pressable onPress={() => router.back()} style={styles.closeBtn}><Ionicons name="close" size={16} color="#FFF" /></Pressable>
          </View>
          <Text style={styles.heroSub}>Choose a plan that fits your needs. Prices in PKR.</Text>
        </LinearGradient>

        <View style={styles.body}>
          {/* Plan cards */}
          <View style={styles.plansRow}>
            {/* Free */}
            <View style={[styles.planCard, styles.planFree]}>
              <Text style={styles.planTitle}>Free</Text>
              <Text style={styles.planPrice}>PKR 0 / month</Text>
              <View style={styles.planFeatures}>
                <Text style={styles.feature}>✅ Basic transaction tracking</Text>
                <Text style={styles.feature}>✅ 3 months history only</Text>
                <Text style={styles.feature}>✅ Basic reports</Text>
                <Text style={styles.featureMuted}>❌ AI Chatbot</Text>
                <Text style={styles.featureMuted}>❌ Export reports</Text>
                <Text style={styles.featureMuted}>❌ Multiple goals</Text>
                <Text style={styles.featureMuted}>❌ Multiple accounts</Text>
              </View>
              <View style={styles.currentPill}><Text style={styles.currentPillText}>Current Plan</Text></View>
            </View>

            {/* Monthly */}
            <View style={[styles.planCard, styles.planMonthly, { borderColor: activeTheme.boxColor }]}> 
              <Text style={styles.mostPopular}>Most Popular</Text>
              <Text style={styles.planTitle}>Monthly</Text>
              <Text style={[styles.planPrice, { color: activeTheme.boxColor }]}>PKR 499 / month</Text>
              <View style={styles.planFeatures}>
                <Text style={styles.feature}>✅ Everything in Free</Text>
                <Text style={styles.feature}>✅ Unlimited transaction history</Text>
                <Text style={styles.feature}>✅ AI Budget Assistant </Text>
                <Text style={styles.feature}>✅ PDF and CSV export</Text>
                <Text style={styles.feature}>✅ Multiple savings goals</Text>
                <Text style={styles.feature}>✅ Multiple accounts</Text>
                <Text style={styles.feature}>✅ Priority support</Text>
              </View>
              <Pressable style={[styles.primaryBtn, { backgroundColor: activeTheme.boxColor }]} onPress={onStartTrial}>
                <Text style={styles.primaryBtnText}>Start 7-Day Free Trial</Text>
              </Pressable>
            </View>

            {/* Yearly */}
            <View style={[styles.planCard, styles.planYearly]}>
              <View style={styles.saveBadge}><Text style={styles.saveBadgeText}>SAVE 40%</Text></View>
              <Text style={styles.planTitle}>Yearly</Text>
              <Text style={[styles.planPrice, { color: "#B7791F" }]}>PKR 3,499 / year</Text>
              <Text style={styles.planSubtitle}>Best value — PKR 292/month</Text>
              <View style={styles.planFeatures}>
                <Text style={styles.feature}>✅ Everything in Monthly</Text>
                <Text style={styles.feature}>✅ Early access to new features</Text>
                <Text style={styles.feature}>✅ Priority AI responses</Text>
              </View>
              <Pressable style={[styles.secondaryBtn]} onPress={onGetYearly}>
                <Text style={styles.secondaryBtnText}>Get Yearly Plan</Text>
              </Pressable>
            </View>
          </View>

          {/* Comparison table */}
          <View style={styles.tableCard}>
            <Text style={styles.tableTitle}>Plan comparison</Text>
            <View style={styles.tableHeaderRow}><Text style={styles.tableCell}></Text><Text style={styles.tableCell}>Free</Text><Text style={styles.tableCell}>Monthly</Text><Text style={styles.tableCell}>Yearly</Text></View>
            {[
              ["Accounts","1","∞","∞"],
              ["Transaction history","3 mo","∞","∞"],
              ["Savings goals","1","∞","∞"],
              ["AI Chatbot","❌","✅","✅"],
              ["Export PDF/CSV","❌","✅","✅"],
              ["Category limits","3","∞","∞"],
              ["Priority support","❌","✅","✅"],
              ["Early access","❌","❌","✅"]
            ].map((row) => (
              <View key={row[0]} style={styles.tableRow}><Text style={styles.tableCell}>{row[0]}</Text><Text style={styles.tableCellCenter}>{row[1]}</Text><Text style={styles.tableCellCenter}>{row[2]}</Text><Text style={styles.tableCellCenter}>{row[3]}</Text></View>
            ))}
          </View>

          <Text style={styles.noteText}>Cancel anytime. Billed through your app store account. Prices in PKR.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#F4F4FF" },
  content: { paddingHorizontal: 14, paddingTop: 0 },
  hero: { marginHorizontal: -14, paddingHorizontal: 14, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 12 },
  heroTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  heroTitle: { color: "#FFFFFF", fontSize: 26, fontFamily: "Sora_800ExtraBold" },
  heroSub: { marginTop: 8, color: "rgba(229,232,255,0.95)", fontSize: 13, fontFamily: "Sora_500Medium" },
  closeBtn: { padding: 8 },
  body: { paddingHorizontal: 0, paddingTop: 12 },
  plansRow: { flexDirection: "column", gap: 12 },
  planCard: { borderWidth: 1, borderColor: "#E6E6F8", borderRadius: 12, padding: 14, backgroundColor: "#FFF", marginBottom: 12 },
  planFree: { opacity: 0.95 },
  planMonthly: { borderWidth: 2 },
  planYearly: { borderColor: "#B7791F" },
  planTitle: { fontSize: 18, fontFamily: "Sora_700Bold", marginBottom: 6 },
  planPrice: { fontSize: 16, fontFamily: "Sora_700Bold", marginBottom: 6 },
  planSubtitle: { color: "#6B4C00", marginBottom: 8 },
  planFeatures: { marginVertical: 8, gap: 6 },
  feature: { color: "#0F172A" },
  featureMuted: { color: "#94A3B8", textDecorationLine: "line-through" },
  primaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  primaryBtnText: { color: "#FFFFFF", fontFamily: "Sora_700Bold" },
  secondaryBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 10, alignItems: "center", backgroundColor: "#FCD34D" },
  secondaryBtnText: { color: "#92400E", fontFamily: "Sora_700Bold" },
  currentPill: { marginTop: 10, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: "#F3F4F6", alignSelf: "flex-start" },
  currentPillText: { color: "#374151", fontFamily: "Sora_700Bold" },
  mostPopular: { position: "absolute", right: 12, top: 8, backgroundColor: "#EEF2FF", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, color: "#2E2FA8" },
  saveBadge: { position: "absolute", right: 12, top: 8, backgroundColor: "#FDE68A", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  saveBadgeText: { color: "#92400E", fontFamily: "Sora_700Bold" },
  tableCard: { borderWidth: 1, borderColor: "#E6E6F8", borderRadius: 12, padding: 12, backgroundColor: "#FFFFFF", marginTop: 6 },
  tableTitle: { fontFamily: "Sora_700Bold", marginBottom: 8 },
  tableHeaderRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  tableCell: { flex: 1, fontFamily: "Sora_600SemiBold" },
  tableCellCenter: { flex: 1, textAlign: "center" },
  noteText: { marginTop: 12, color: "#6B7280", fontSize: 12 }
});

