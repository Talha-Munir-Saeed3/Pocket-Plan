import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [balanceHidden, setBalanceHidden] = useState(false);

  const settingsGroups = [
    {
      title: "Account",
      items: ["Edit Profile", "Change Password", "Currency Selection"]
    },
    {
      title: "Security",
      items: ["App Lock", "Biometric Login", "Privacy Policy"]
    }
  ];

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={styles.hero}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroTitle}>Settings</Text>
          <Text style={styles.heroSubtitle}>Manage your profile, app behavior, and privacy preferences.</Text>
        </LinearGradient>

        <View style={styles.switchCard}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchTitle}>Notifications</Text>
              <Text style={styles.switchMeta}>Budget alerts, reminders and summaries</Text>
            </View>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: "#D1D5DB", true: "#A5B4FC" }} thumbColor={notificationsEnabled ? "#4F46E5" : "#9CA3AF"} />
          </View>

          <View style={[styles.switchRow, styles.switchRowLast]}>
            <View>
              <Text style={styles.switchTitle}>Hide Balance</Text>
              <Text style={styles.switchMeta}>Mask amounts on dashboard cards</Text>
            </View>
            <Switch value={balanceHidden} onValueChange={setBalanceHidden} trackColor={{ false: "#D1D5DB", true: "#A5B4FC" }} thumbColor={balanceHidden ? "#4F46E5" : "#9CA3AF"} />
          </View>
        </View>

        {settingsGroups.map((group) => (
          <View key={group.title} style={styles.groupCard}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            {group.items.map((item, idx) => (
              <Pressable key={item} style={[styles.groupItem, idx === group.items.length - 1 && styles.groupItemLast]}>
                <View style={styles.groupItemLeft}>
                  <View style={styles.badge} />
                  <Text style={styles.groupItemText}>{item}</Text>
                </View>
                <Text style={styles.chevron}>{">"}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        <View style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Unlock Premium</Text>
          <Text style={styles.premiumMeta}>Advanced exports, more AI credits, and multiple budget profiles.</Text>
          <PrimaryButton label="Go Premium" onPress={() => router.push("/premium")} />
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
    paddingBottom: 28
  },
  hero: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden"
  },
  heroGlow: {
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
  switchCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  switchRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchRowLast: {
    borderBottomWidth: 0
  },
  switchTitle: {
    color: "#0F172A",
    fontWeight: "800",
    fontSize: 14
  },
  switchMeta: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 3
  },
  groupCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  groupTitle: {
    marginTop: 12,
    marginBottom: 8,
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  groupItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  groupItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#5C5CDB"
  },
  groupItemLast: {
    borderBottomWidth: 0
  },
  groupItemText: {
    color: "#0F172A",
    fontWeight: "700"
  },
  chevron: {
    color: "#64748B",
    fontWeight: "800"
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  premiumTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900"
  },
  premiumMeta: {
    color: "#64748B",
    marginTop: 4,
    marginBottom: 10
  }
});
