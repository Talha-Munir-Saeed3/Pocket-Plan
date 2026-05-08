import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";

export default function PlanScreen() {
  const router = useRouter();
  const selectedThemeId = useThemeStore((s) => s.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((t) => t.id === selectedThemeId) ?? THEME_OPTIONS[0];

  return (
    <ScreenContainer style={[styles.container, { backgroundColor: "rgba(0,0,0,0.35)" }]} edges={["left", "right"]}>
      <View style={[styles.sheet, { backgroundColor: activeTheme.backgroundColor, borderTopColor: `${activeTheme.boxColor}22`, borderTopWidth: 1 }]}>
        <View style={styles.headerRow}>
          <View style={[styles.lockBubble, { backgroundColor: activeTheme.boxColor }]}><Ionicons name="lock-closed" size={20} color="#ffffff" /></View>
          <Text style={[styles.title, { color: activeTheme.boxColor }]}>This is a Premium Feature</Text>
        </View>
        <Text style={styles.desc}>Unlock unlimited access to this feature and more with Pocket Plan Premium.</Text>

        <Pressable style={[styles.primaryBtn, { backgroundColor: activeTheme.boxColor }]} onPress={() => router.push('/premium')}>
          <Text style={styles.primaryBtnText}>Go Premium →</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.maybeLater}><Text style={styles.maybeLaterText}>Maybe Later</Text></Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 18, minHeight: 220 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 },
  lockBubble: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontFamily: "Sora_700Bold" },
  desc: { color: "#64748B", marginTop: 6, marginBottom: 18 },
  primaryBtn: { paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  primaryBtnText: { color: "#FFFFFF", fontFamily: "Sora_700Bold" },
  maybeLater: { alignItems: "center", marginTop: 12 },
  maybeLaterText: { color: "#6B7280", fontFamily: "Sora_600SemiBold" },
});
