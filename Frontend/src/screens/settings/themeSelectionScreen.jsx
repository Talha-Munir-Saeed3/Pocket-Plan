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
  const activeTheme = THEME_OPTIONS.find((theme) => theme.id === selectedTheme) ?? THEME_OPTIONS[0];

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
        <LinearGradient colors={[activeTheme.boxColor, activeTheme.supportingAccent]} style={[styles.hero, { paddingTop: insets.top + 12 }]}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroKicker}>Settings</Text>
              <Text style={styles.heroTitle}>Change Theme</Text>
            </View>
            <Pressable style={[styles.backButton, { borderColor: "rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.16)" }]} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.heroSub}>Themes from frontend documentation with text previews for each background.</Text>
        </LinearGradient>

        <View style={[styles.body, { backgroundColor: activeTheme.backgroundColor }]}>
          <View style={styles.themeGrid}>
          {THEME_OPTIONS.map((theme) => (
            <Pressable
              key={theme.id}
              style={[styles.themeCard, selectedTheme === theme.id && styles.themeCardActive]}
              onPress={() => setSelectedTheme(theme.id)}
            >
              <View style={[styles.themePreview, { backgroundColor: theme.backgroundColor }]}>
                <View style={[styles.phoneShell, { backgroundColor: theme.backgroundColor, borderColor: `${theme.boxColor}22` }]}>
                  <View style={[styles.phoneTopStrip, { backgroundColor: theme.boxColor }]}>
                    <View style={styles.phoneStatusDots}>
                      <View style={[styles.phoneStatusDot, { backgroundColor: "rgba(255,255,255,0.75)" }]} />
                      <View style={[styles.phoneStatusDot, { backgroundColor: "rgba(255,255,255,0.5)" }]} />
                    </View>
                    <Text style={styles.phoneTopTitle}>Pocket Plan</Text>
                  </View>

                  <View style={styles.phoneBody}>
                    <View style={styles.phoneHeroRow}>
                      <View style={[styles.previewAChip, { borderColor: theme.supportingAccent, backgroundColor: `${theme.supportingAccent}12` }]}>
                        <Text style={[styles.previewAChar, { color: theme.supportingAccent }]}>A</Text>
                      </View>
                      <View style={styles.phoneHeroCopy}>
                        <Text style={[styles.phoneHeroTitle, { color: theme.textColor }]}>Daily overview</Text>
                        <Text style={[styles.phoneHeroSub, { color: theme.textColor }]}>Header, content, and navigation</Text>
                      </View>
                    </View>

                    <View style={styles.phoneMetricCard}>
                      <View style={[styles.phoneMetricBar, { backgroundColor: theme.boxColor }]} />
                      <Text style={[styles.phoneMetricTitle, { color: theme.textColor }]}>Monthly Saving</Text>
                      <Text style={[styles.phoneMetricValue, { color: theme.supportingAccent }]}>PKR 12,000</Text>
                    </View>

                    <View style={styles.phoneListCard}>
                      <View style={styles.phoneListRow}>
                        <View style={[styles.phoneListBullet, { backgroundColor: theme.boxColor }]} />
                        <Text style={[styles.phoneListText, { color: theme.textColor }]}>Budget card preview</Text>
                      </View>
                      <View style={styles.phoneListRow}>
                        <View style={[styles.phoneListBullet, { backgroundColor: theme.supportingAccent }]} />
                        <Text style={[styles.phoneListText, { color: theme.textColor }]}>Savings goal preview</Text>
                      </View>
                    </View>

                    <View style={styles.phoneNavBar}>
                      <View style={[styles.phoneNavItem, { backgroundColor: theme.boxColor }]} />
                      <View style={styles.phoneNavItem} />
                      <View style={styles.phoneNavItem} />
                      <View style={styles.phoneNavItem} />
                    </View>
                  </View>
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
    gap: 12,
    borderRadius: 18,
    paddingTop: 2
  },
  themeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    columnGap: 0
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
    height: 198,
    padding: 10,
    justifyContent: "space-between"
  },
  phoneBody: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between"
  },
  phoneHeroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  phoneHeroCopy: {
    flex: 1
  },
  phoneHeroTitle: {
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  phoneHeroSub: {
    marginTop: 2,
    fontSize: 9,
    fontFamily: "Sora_500Medium"
  },
  phoneShell: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 8,
    overflow: "hidden"
  },
  phoneTopStrip: {
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  phoneStatusDots: {
    flexDirection: "row",
    gap: 4
  },
  phoneStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 99
  },
  phoneTopTitle: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Sora_700Bold"
  },
  previewAChip: {
    width: 26,
    height: 26,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  previewAChar: {
    fontSize: 14,
    fontFamily: "Sora_800ExtraBold"
  },
  phoneMetricCard: {
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.54)",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    marginTop: 10
  },
  phoneMetricBar: {
    height: 6,
    borderRadius: 99,
    marginBottom: 8
  },
  phoneMetricTitle: {
    fontSize: 10,
    fontFamily: "Sora_600SemiBold"
  },
  phoneMetricValue: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: "Sora_800ExtraBold"
  },
  phoneListCard: {
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.58)",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    marginTop: 8,
    gap: 7
  },
  phoneListRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  phoneListBullet: {
    width: 8,
    height: 8,
    borderRadius: 99
  },
  phoneListText: {
    fontSize: 9,
    fontFamily: "Sora_600SemiBold"
  },
  phoneNavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 10
  },
  phoneNavItem: {
    width: 22,
    height: 4,
    borderRadius: 99,
    backgroundColor: "rgba(15,23,42,0.12)"
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
