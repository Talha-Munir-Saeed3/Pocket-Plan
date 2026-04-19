import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function AddTransactionHelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeSection, setActiveSection] = useState("create");

  useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 22 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 8 }] }>
          <View style={styles.heroRow}>
            <Text style={styles.heroTitle}>Add Transaction Help</Text>
            <Pressable onPress={() => router.back()} style={styles.closeButton}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSubtitle}>Step-by-step guidance for adding clean and accurate entries.</Text>
        </LinearGradient>

        <View style={styles.switcherCard}>
          <Text style={styles.switcherTitle}>Choose A Topic</Text>
          <View style={styles.switcherRow}>
            <Pressable
              style={[styles.switcherButton, activeSection === "create" && styles.switcherButtonActive]}
              onPress={() => setActiveSection("create")}
            >
              <Ionicons name="create" size={16} color={activeSection === "create" ? "#FFFFFF" : "#4C46C8"} />
              <Text style={[styles.switcherButtonText, activeSection === "create" && styles.switcherButtonTextActive]}>Create</Text>
            </Pressable>

            <Pressable
              style={[styles.switcherButton, activeSection === "types" && styles.switcherButtonActive]}
              onPress={() => setActiveSection("types")}
            >
              <Ionicons name="layers" size={16} color={activeSection === "types" ? "#FFFFFF" : "#4C46C8"} />
              <Text style={[styles.switcherButtonText, activeSection === "types" && styles.switcherButtonTextActive]}>Types</Text>
            </Pressable>

            <Pressable
              style={[styles.switcherButton, activeSection === "grace" && styles.switcherButtonActive]}
              onPress={() => setActiveSection("grace")}
            >
              <Ionicons name="time" size={16} color={activeSection === "grace" ? "#FFFFFF" : "#4C46C8"} />
              <Text style={[styles.switcherButtonText, activeSection === "grace" && styles.switcherButtonTextActive]}>Grace</Text>
            </Pressable>
          </View>
        </View>

        {activeSection === "create" ? (
        <View style={styles.sectionStack}>
        <View style={[styles.card, styles.purpleCard]}>
          <Text style={styles.sectionHead}>🟣 How To Add A Transaction</Text>
          <View style={styles.stepItem}><Text style={styles.stepBadge}>1</Text><Text style={styles.item}>Choose type first: Expense, Income, Transfer, or Borrow.</Text></View>
          <View style={styles.stepItem}><Text style={styles.stepBadge}>2</Text><Text style={styles.item}>Pick the matching category emoji.</Text></View>
          <View style={styles.stepItem}><Text style={styles.stepBadge}>3</Text><Text style={styles.item}>Enter amount in numbers only.</Text></View>
          <View style={styles.stepItem}><Text style={styles.stepBadge}>4</Text><Text style={styles.item}>Select a date from the allowed date wheel.</Text></View>
          <View style={styles.stepItem}><Text style={styles.stepBadge}>5</Text><Text style={styles.item}>Description is optional. Add a note only if needed, then press Save Transaction.</Text></View>
        </View>
        <View style={[styles.card, styles.greenCard]}>
          <Text style={styles.sectionHead}>🟢 Best Practice</Text>
          <Text style={styles.item}>Enter type and amount first, then category and date, so entries stay fast and consistent.</Text>
        </View>
        </View>
        ) : null}

        {activeSection === "grace" ? (
        <View style={styles.sectionStack}>
        <View style={[styles.card, styles.amberCard]}>
          <Text style={styles.sectionHead}>🟡 Grace Period Rule</Text>
          <Text style={styles.body}>
            Transactions are kept inside the current month to avoid report imbalance. A grace window of 2 days is allowed at month start.
          </Text>
        </View>
        <View style={[styles.card, styles.amberCard]}>
          <Text style={styles.sectionHead}>🟡 Allowed Date Window</Text>
          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>Day 1-2: Previous month dates are allowed.</Text>
            <Text style={styles.highlightText}>Day 3 onward: Previous month dates are locked.</Text>
          </View>
        </View>
        </View>
        ) : null}

        {activeSection === "types" ? (
        <View style={[styles.card, styles.purpleCard]}>
          <Text style={styles.sectionHead}>🟣 Transaction Types Explained</Text>
          <View style={styles.typeGrid}>
            <View style={styles.typeCard}><Text style={styles.typeEmoji}>💸</Text><Text style={styles.typeTitle}>Expense</Text><Text style={styles.typeBody}>Money going out.</Text></View>
            <View style={styles.typeCard}><Text style={styles.typeEmoji}>💰</Text><Text style={styles.typeTitle}>Income</Text><Text style={styles.typeBody}>Money coming in.</Text></View>
            <View style={styles.typeCard}><Text style={styles.typeEmoji}>🔁</Text><Text style={styles.typeTitle}>Transfer</Text><Text style={styles.typeBody}>Move money between your accounts.</Text></View>
            <View style={styles.typeCard}><Text style={styles.typeEmoji}>🤝</Text><Text style={styles.typeTitle}>Borrow</Text><Text style={styles.typeBody}>Money taken that must be returned.</Text></View>
          </View>
        </View>
        ) : null}
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
    fontSize: 25,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSubtitle: {
    marginTop: 7,
    color: "#E2E7FF",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    borderLeftWidth: 4,
    borderLeftColor: "#DDE3F4",
    padding: 12,
    marginBottom: 10
  },
  sectionStack: {
    gap: 10,
    marginBottom: 10
  },
  purpleCard: {
    borderLeftColor: "#6D28D9",
    backgroundColor: "#F8F5FF"
  },
  greenCard: {
    borderLeftColor: "#16A34A",
    backgroundColor: "#F5FFF8"
  },
  amberCard: {
    borderLeftColor: "#D97706",
    backgroundColor: "#FFF9F2"
  },
  switcherCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12,
    marginBottom: 10
  },
  switcherTitle: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    marginBottom: 8
  },
  switcherRow: {
    flexDirection: "row",
    gap: 8
  },
  switcherButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  switcherButtonActive: {
    borderColor: "#4C46C8",
    backgroundColor: "#5C5CDB"
  },
  switcherButtonText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  switcherButtonTextActive: {
    color: "#FFFFFF"
  },
  stepItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    marginBottom: 8
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 999,
    textAlign: "center",
    lineHeight: 22,
    backgroundColor: "#EEF0FF",
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    overflow: "hidden"
  },
  highlightBox: {
    borderWidth: 1,
    borderColor: "#D4DAFF",
    backgroundColor: "#F6F7FF",
    borderRadius: 12,
    padding: 10
  },
  highlightText: {
    color: "#2E2FA8",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_700Bold",
    marginBottom: 4
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  typeCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#DDE3F4",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  typeEmoji: {
    fontSize: 22,
    marginBottom: 4
  },
  typeTitle: {
    color: "#1F2937",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginBottom: 2
  },
  typeBody: {
    color: "#475569",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "Sora_600SemiBold",
    textAlign: "center"
  },
  sectionHead: {
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    marginBottom: 8
  },
  body: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 6
  },
  item: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 4
  },
  strong: {
    color: "#1F2937",
    fontFamily: "Sora_700Bold"
  }
});
