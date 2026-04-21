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
  const [smartTipsEnabled, setSmartTipsEnabled] = useState(true);

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
        <LinearGradient colors={["#16193B", "#5C5CDB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />
          <Text style={styles.heroKicker}>Preferences</Text>
          <Text style={styles.heroTitle}>Settings</Text>
          <Text style={styles.heroSubtitle}>Manage your profile, app behavior, and privacy preferences.</Text>

          <View style={styles.profilePill}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>TP</Text>
            </View>
            <View>
              <Text style={styles.profileName}>Talha P</Text>
              <Text style={styles.profileMeta}>Premium plan active</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.switchCard}>
          <Text style={styles.groupHeader}>App Preferences</Text>
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

          <View style={[styles.switchRow, styles.switchRowLast]}>
            <View>
              <Text style={styles.switchTitle}>Smart AI Tips</Text>
              <Text style={styles.switchMeta}>Show weekly coaching insights on dashboard</Text>
            </View>
            <Switch value={smartTipsEnabled} onValueChange={setSmartTipsEnabled} trackColor={{ false: "#D1D5DB", true: "#A5B4FC" }} thumbColor={smartTipsEnabled ? "#4F46E5" : "#9CA3AF"} />
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
                <Text style={styles.chevron}>{"->"}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        <LinearGradient colors={["#312E81", "#5C5CDB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.premiumCard}>
          <Text style={styles.premiumTitle}>Unlock Premium</Text>
          <Text style={styles.premiumMeta}>Advanced exports, more AI credits, and multiple budget profiles.</Text>
          <PrimaryButton label="Go Premium" onPress={() => router.push("/premium")} />
        </LinearGradient>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FF"
  },
  content: {
    padding: 16,
    paddingBottom: 28
  },
  hero: {
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 12,
    overflow: "hidden"
  },
  heroGlowA: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 999,
    right: -34,
    top: -24,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  heroGlowB: {
    position: "absolute",
    width: 220,
    height: 66,
    left: -60,
    bottom: -32,
    transform: [{ rotate: "-12deg" }],
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  heroKicker: {
    color: "rgba(229,232,255,0.9)",
    fontSize: 12,
    fontWeight: "700"
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 6,
    fontSize: 27,
    fontWeight: "900"
  },
  heroSubtitle: {
    marginTop: 8,
    color: "rgba(237,240,255,0.92)",
    fontSize: 13.5
  },
  profilePill: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.26)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800"
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800"
  },
  profileMeta: {
    color: "#DCE2FF",
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700"
  },
  switchCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  groupHeader: {
    marginTop: 12,
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
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
    alignItems: "center"
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#5C5CDB",
    marginRight: 8
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
    borderRadius: 16,
    padding: 14,
    overflow: "hidden"
  },
  premiumTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  },
  premiumMeta: {
    color: "#DCE2FF",
    marginTop: 4,
    marginBottom: 10
  }
});
