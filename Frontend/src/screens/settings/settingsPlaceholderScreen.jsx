import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

export default function SettingsPlaceholderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const title = String(params.title || "Settings");
  const subtitle = String(params.subtitle || "This section is being wired up now.");

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  if (!fontsLoaded) return null;

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={[styles.hero, { paddingTop: insets.top + 12 }]}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroKicker}>Settings</Text>
            <Pressable style={styles.closeButton} onPress={() => router.back()}>
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.heroSubtitle}>{subtitle}</Text>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.headRow}>
            <Ionicons name="information-circle" size={16} color="#4C46C8" />
            <Text style={styles.cardTitle}>Coming Soon</Text>
          </View>
          <Text style={styles.cardText}>
            This settings destination is mapped now, so taps will not break. The full interaction will be added in the next pass.
          </Text>
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
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 12
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroKicker: {
    color: "rgba(220,226,255,0.85)",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontFamily: "Sora_800ExtraBold",
    marginTop: 4
  },
  heroSubtitle: {
    marginTop: 6,
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
    borderLeftColor: "#5C5CDB",
    padding: 12
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6
  },
  cardTitle: {
    color: "#1F2937",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  cardText: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold"
  }
});