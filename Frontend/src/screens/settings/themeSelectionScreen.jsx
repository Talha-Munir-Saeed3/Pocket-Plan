import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";

export default function ThemeSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const selectedTheme = useThemeStore((state) => state.selectedThemeId);
  const setSelectedTheme = useThemeStore((state) => state.setSelectedThemeId);

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
            <View>
              <Text style={styles.heroKicker}>Settings</Text>
              <Text style={styles.heroTitle}>Change Theme</Text>
            </View>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>Themes from frontend documentation with text previews for each background.</Text>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.themeGrid}>
          {THEME_OPTIONS.map((theme) => (
            <Pressable
              key={theme.id}
              style={[styles.themeCard, selectedTheme === theme.id && styles.themeCardActive]}
              onPress={() => setSelectedTheme(theme.id)}
            >
              <View style={[styles.themePreview, { backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.previewHeader, { backgroundColor: theme.boxColor }]}>
                  <Text style={styles.previewHeaderText}>Pocket Plan</Text>
                </View>

                <View style={styles.previewTextToneRow}>
                  <View style={styles.previewAChip}>
                    <Text style={[styles.previewAChar, { color: theme.textColor }]}>A</Text>
                  </View>
                  <Text style={[styles.previewToneLabel, { color: theme.textColor }]}>Text Color</Text>
                </View>

                <Text style={[styles.previewMainText, { color: theme.textColor }]}>Primary text on this background</Text>
                <Text style={[styles.previewSubText, { color: theme.textColor }]}>Monthly Saving: PKR 12,000</Text>

                <View style={styles.previewTokenRow}>
                  <View style={[styles.tokenDot, { backgroundColor: theme.boxColor }]} />
                  <Text style={[styles.previewTokenText, { color: theme.textColor }]}>Box: {theme.boxColor}</Text>
                </View>
                <View style={styles.previewTokenRow}>
                  <View style={[styles.tokenDot, { backgroundColor: theme.supportingAccent }]} />
                  <Text style={[styles.previewTokenText, { color: theme.textColor }]}>Text: {theme.textColor}</Text>
                </View>
              </View>

              <View style={styles.themeMetaRow}>
                <View style={styles.themeMetaTextWrap}>
                  <Text style={styles.themeTitle}>{theme.title}</Text>
                  <Text style={styles.themeSubtitle}>{theme.subtitle}</Text>
                </View>

                <View style={styles.availablePill}>
                  <Text style={styles.availableText}>{selectedTheme === theme.id ? "Selected" : "Select"}</Text>
                </View>
              </View>
            </Pressable>
          ))}
          </View>
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
  heroSub: {
    marginTop: 8,
    color: "#E2E7FF",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Sora_600SemiBold"
  },
  backButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(255,255,255,0.16)"
  },
  body: {
    gap: 12
  },
  themeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12
  },
  themeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    overflow: "hidden",
    width: "48.5%"
  },
  themeCardActive: {
    borderColor: "#5C5CDB",
    shadowColor: "#4C46C8",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },
  themePreview: {
    height: 146,
    padding: 12,
    justifyContent: "space-between"
  },
  previewHeader: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: "flex-start"
  },
  previewHeaderText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  previewMainText: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  previewSubText: {
    marginTop: 2,
    fontSize: 10,
    fontFamily: "Sora_500Medium",
    opacity: 0.85
  },
  previewTextToneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8
  },
  previewAChip: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.14)",
    alignItems: "center",
    justifyContent: "center"
  },
  previewAChar: {
    fontSize: 12,
    fontFamily: "Sora_800ExtraBold"
  },
  previewToneLabel: {
    fontSize: 9,
    fontFamily: "Sora_700Bold"
  },
  previewTokenRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 3
  },
  tokenDot: {
    width: 8,
    height: 8,
    borderRadius: 99
  },
  previewTokenText: {
    fontSize: 9,
    fontFamily: "Sora_600SemiBold"
  },
  themeMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    gap: 10
  },
  themeMetaTextWrap: {
    flex: 1
  },
  themeTitle: {
    color: "#0F172A",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  themeSubtitle: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_500Medium"
  },
  availablePill: {
    backgroundColor: "#ECFDF3",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#86EFAC"
  },
  availableText: {
    color: "#15803D",
    fontSize: 10,
    fontFamily: "Sora_700Bold"
  },
  soonPill: {
    display: "none"
  },
  soonText: {
    display: "none"
  }
});
