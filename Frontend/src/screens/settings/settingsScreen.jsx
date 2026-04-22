import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/common/screenContainer";

// ─── Mock user state ──────────────────────────────────────────────────────────
// Replace with real auth context / API data when backend is connected
const MOCK_USER = {
  name: "Talha P",
  initials: "TP",
  email: "talha@email.com",
  isPremium: true,
  currency: "PKR",
  theme: "Default Purple",
};

// ─── Theme options ────────────────────────────────────────────────────────────
const THEMES = [
  { id: "default", label: "Default Purple", available: true },
  { id: "midnight", label: "Midnight Blue", available: false },
  { id: "forest", label: "Forest Green", available: false },
  { id: "rose", label: "Rose Gold", available: false },
];

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [themeSheetVisible, setThemeSheetVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");

  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  const user = MOCK_USER;

  // ─── Sign out handler ────────────────────────────────────────────────────
  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            // TODO: clear auth tokens and navigate to sign-in
            router.replace("/(auth)/sign-in");
          },
        },
      ],
      { cancelable: true }
    );
  };

  // ─── Theme picker ────────────────────────────────────────────────────────
  const currentThemeLabel =
    THEMES.find((t) => t.id === selectedTheme)?.label ?? "Default Purple";

  // ─── Reusable row component ───────────────────────────────────────────────
  const SettingsRow = ({
    icon,
    title,
    subtitle,
    rightText,
    onPress,
    isLast = false,
    danger = false,
    iconBg = "#EEEEFF",
    iconColor = "#5C5CDB",
  }) => (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
      android_ripple={{ color: "#F0F0FF" }}
    >
      <View style={[styles.rowIconBubble, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowTitle, danger && styles.rowTitleDanger]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.rowSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {rightText ? (
        <Text style={styles.rowRightText}>{rightText}</Text>
      ) : null}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={danger ? "#DC2626" : "#94A3B8"}
        style={styles.rowChevron}
      />
    </Pressable>
  );

  // ─── Section wrapper ─────────────────────────────────────────────────────
  const Section = ({ title, children }) => (
    <View style={styles.sectionPanel}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {children}
    </View>
  );

  // ─── Toggle row ──────────────────────────────────────────────────────────
  const ToggleRow = ({ icon, title, subtitle, value, onChange, isLast = false }) => (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowIconBubble}>
        <Ionicons name={icon} size={18} color="#5C5CDB" />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#E2E8F0", true: "#5C5CDB" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E2E8F0"
      />
    </View>
  );

  return (
    <ScreenContainer style={styles.screen} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <LinearGradient
          colors={["#16193B", "#5C5CDB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
        >
          {/* Glow blobs */}
          <View style={styles.heroGlowA} />
          <View style={styles.heroGlowB} />

          {/* Top row — title + avatar */}
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroKicker}>Preferences</Text>
              <Text style={styles.heroTitle}>Settings</Text>
            </View>
            {/* Avatar taps to Edit Profile */}
            <Pressable
              style={styles.heroAvatar}
              onPress={() => router.push("/edit-profile")}
            >
              <Text style={styles.heroAvatarText}>{user.initials}</Text>
            </Pressable>
          </View>

          {/* Profile pill */}
          <View style={styles.profilePill}>
            <View style={styles.pillAvatar}>
              <Text style={styles.pillAvatarText}>{user.initials}</Text>
            </View>
            <View style={styles.pillInfo}>
              <Text style={styles.pillName}>{user.name}</Text>
              <Text style={styles.pillEmail}>{user.email}</Text>
            </View>
            {/* Plan badge */}
            {user.isPremium ? (
              <View style={styles.badgePremium}>
                <Text style={styles.badgePremiumText}>Premium ✓</Text>
              </View>
            ) : (
              <View style={styles.badgeFree}>
                <Text style={styles.badgeFreeText}>Free Plan</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.body}>

          {/* ── APP PREFERENCES ─────────────────────────────────────────── */}
          <Section title="App Preferences">
            <ToggleRow
              icon="notifications-outline"
              title="Notifications"
              subtitle="Budget alerts, reminders and summaries"
              value={notificationsEnabled}
              onChange={setNotificationsEnabled}
            />
            <ToggleRow
              icon="eye-off-outline"
              title="Hide Balance"
              subtitle="Mask amounts on dashboard cards"
              value={balanceHidden}
              onChange={setBalanceHidden}
              isLast
            />
          </Section>

          {/* ── ACCOUNT ─────────────────────────────────────────────────── */}
          <Section title="Account">
            <SettingsRow
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your name and email"
              onPress={() => router.push("/edit-profile")}
            />
            <SettingsRow
              icon="image-outline"
              title="Update Avatar"
              subtitle="Choose from preset avatars"
              onPress={() => router.push("/update-avatar")}
            />
            <SettingsRow
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your account password"
              onPress={() => router.push("/change-password")}
            />
            <SettingsRow
              icon="cash-outline"
              title="Currency"
              subtitle="Select your primary currency"
              rightText={user.currency}
              onPress={() => router.push("/currency-selection")}
            />
            <SettingsRow
              icon="color-palette-outline"
              title="Change Theme"
              subtitle="Personalise your app appearance"
              rightText={currentThemeLabel}
              onPress={() => setThemeSheetVisible(true)}
              isLast
            />
          </Section>

          {/* ── SECURITY ─────────────────────────────────────────────────── */}
          <Section title="Security">
            <SettingsRow
              icon="shield-outline"
              title="App Lock"
              subtitle="Biometric or PIN protection"
              onPress={() => router.push("/app-lock")}
              iconBg="#EEF2FF"
              iconColor="#4338CA"
            />
            <SettingsRow
              icon="finger-print"
              title="Biometric Login"
              subtitle="Use fingerprint or Face ID"
              onPress={() => router.push("/biometric")}
              iconBg="#EEF2FF"
              iconColor="#4338CA"
            />
            <SettingsRow
              icon="document-text-outline"
              title="Privacy Policy"
              subtitle="How we use your data"
              onPress={() => router.push("/privacy-policy")}
              iconBg="#EEF2FF"
              iconColor="#4338CA"
              isLast
            />
          </Section>

          {/* ── SUPPORT ──────────────────────────────────────────────────── */}
          <Section title="Support">
            <SettingsRow
              icon="chatbubble-ellipses-outline"
              title="Contact Us"
              subtitle="Get help from our team"
              onPress={() => router.push("/contact")}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
            />
            <SettingsRow
              icon="help-circle-outline"
              title="Help & FAQ"
              subtitle="Common questions answered"
              onPress={() => router.push("/faq")}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
            />
            <SettingsRow
              icon="star-outline"
              title="Rate the App"
              subtitle="Enjoying Pocket Plan?"
              onPress={() => {
                // TODO: open app store rating
                Alert.alert("Thank you!", "Redirecting to the app store...");
              }}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
              isLast
            />
          </Section>

          {/* ── PREMIUM CARD (free users only) ───────────────────────────── */}
          {!user.isPremium ? (
            <LinearGradient
              colors={["#312E81", "#5C5CDB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.premiumCard}
            >
              <View style={styles.premiumGlow} />
              <Text style={styles.premiumTitle}>Unlock Premium</Text>
              <Text style={styles.premiumSub}>
                Advanced exports, more AI credits, and multiple budget profiles.
              </Text>
              <Pressable
                style={styles.premiumBtn}
                onPress={() => router.push("/premium")}
              >
                <Text style={styles.premiumBtnText}>Go Premium →</Text>
              </Pressable>
            </LinearGradient>
          ) : (
            // Premium active indicator
            <View style={styles.premiumActivePill}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text style={styles.premiumActiveText}>
                Premium Plan Active — all features unlocked
              </Text>
            </View>
          )}

          {/* ── SIGN OUT ─────────────────────────────────────────────────── */}
          <Pressable
            style={({ pressed }) => [
              styles.signOutBtn,
              pressed && styles.signOutBtnPressed,
            ]}
            onPress={handleSignOut}
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color="#DC2626"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>

          <Text style={styles.versionText}>Pocket Plan v1.0 · Team CPS</Text>
        </View>
      </ScrollView>

      {/* ── THEME PICKER BOTTOM SHEET ─────────────────────────────────────── */}
      {themeSheetVisible && (
        <Pressable
          style={styles.sheetOverlay}
          onPress={() => setThemeSheetVisible(false)}
        >
          <Pressable style={styles.sheetContainer} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Choose Theme</Text>
            <Text style={styles.sheetSub}>
              More themes coming soon — only Default is available now.
            </Text>
            {THEMES.map((theme) => (
              <Pressable
                key={theme.id}
                style={[
                  styles.themeRow,
                  selectedTheme === theme.id && styles.themeRowActive,
                  !theme.available && styles.themeRowDisabled,
                ]}
                onPress={() => {
                  if (!theme.available) return;
                  setSelectedTheme(theme.id);
                  setThemeSheetVisible(false);
                }}
                disabled={!theme.available}
              >
                <View
                  style={[
                    styles.themeColorDot,
                    {
                      backgroundColor: theme.available
                        ? "#5C5CDB"
                        : "#CBD5E1",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.themeLabel,
                    !theme.available && styles.themeLabelDisabled,
                  ]}
                >
                  {theme.label}
                </Text>
                {!theme.available && (
                  <View style={styles.comingSoonPill}>
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                )}
                {selectedTheme === theme.id && theme.available && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#5C5CDB"
                    style={{ marginLeft: "auto" }}
                  />
                )}
              </Pressable>
            ))}
            <Pressable
              style={styles.sheetCloseBtn}
              onPress={() => setThemeSheetVisible(false)}
            >
              <Text style={styles.sheetCloseBtnText}>Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      )}
    </ScreenContainer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F4F4FF",
  },
  content: {
    paddingBottom: 40,
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingBottom: 20,
    marginBottom: 12,
    overflow: "hidden",
  },
  heroGlowA: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 999,
    right: -40,
    top: -30,
    backgroundColor: "rgba(255,255,255,0.13)",
  },
  heroGlowB: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 999,
    left: -40,
    bottom: -40,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  heroKicker: {
    color: "rgba(220,226,255,0.85)",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontFamily: "Sora_800ExtraBold",
    marginTop: 4,
  },
  heroAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  heroAvatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
  },

  // Profile pill inside hero
  profilePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 16,
    padding: 12,
  },
  pillAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.24)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  pillAvatarText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
  },
  pillInfo: {
    flex: 1,
  },
  pillName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
  },
  pillEmail: {
    color: "rgba(220,226,255,0.8)",
    fontSize: 11,
    fontFamily: "Sora_500Medium",
    marginTop: 2,
  },
  badgePremium: {
    backgroundColor: "#F59E0B",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgePremiumText: {
    color: "#1A1A00",
    fontSize: 11,
    fontFamily: "Sora_700Bold",
  },
  badgeFree: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  badgeFreeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontFamily: "Sora_600SemiBold",
  },

  // ── Body ────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 12,
  },

  // ── Section panel (matches reports screen exactly) ───────────────────────
  sectionPanel: {
    backgroundColor: "#FCFCFF",
    borderWidth: 1,
    borderColor: "#DDE3F4",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingBottom: 4,
    marginBottom: 14,
  },
  sectionHeader: {
    marginTop: 14,
    marginBottom: 8,
    color: "#5C5CDB",
    fontSize: 13,
    fontFamily: "Sora_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ── Row ──────────────────────────────────────────────────────────────────
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowPressed: {
    backgroundColor: "#F8F8FF",
    borderRadius: 10,
  },
  rowIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEEEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
  },
  rowTitleDanger: {
    color: "#DC2626",
  },
  rowSubtitle: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginTop: 2,
  },
  rowRightText: {
    color: "#64748B",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    marginRight: 4,
  },
  rowChevron: {
    flexShrink: 0,
  },

  // ── Premium card ─────────────────────────────────────────────────────────
  premiumCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    overflow: "hidden",
  },
  premiumGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 999,
    right: -30,
    top: -30,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  premiumTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Sora_800ExtraBold",
    marginBottom: 6,
  },
  premiumSub: {
    color: "#DCE2FF",
    fontSize: 13,
    fontFamily: "Sora_500Medium",
    marginBottom: 14,
    lineHeight: 20,
  },
  premiumBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  premiumBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
  },

  // Premium active pill
  premiumActivePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    gap: 8,
  },
  premiumActiveText: {
    color: "#15803D",
    fontSize: 13,
    fontFamily: "Sora_600SemiBold",
    flex: 1,
  },

  // ── Sign out ─────────────────────────────────────────────────────────────
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#FECACA",
    borderRadius: 14,
    height: 50,
    marginBottom: 16,
  },
  signOutBtnPressed: {
    backgroundColor: "#FEF2F2",
  },
  signOutText: {
    color: "#DC2626",
    fontSize: 15,
    fontFamily: "Sora_700Bold",
  },

  // ── Version text ──────────────────────────────────────────────────────────
  versionText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginBottom: 8,
  },

  // ── Theme sheet ──────────────────────────────────────────────────────────
  sheetOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    alignSelf: "center",
    marginBottom: 18,
  },
  sheetTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontFamily: "Sora_800ExtraBold",
    marginBottom: 4,
  },
  sheetSub: {
    color: "#64748B",
    fontSize: 12,
    fontFamily: "Sora_500Medium",
    marginBottom: 16,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  themeRowActive: {
    backgroundColor: "#F5F3FF",
  },
  themeRowDisabled: {
    opacity: 0.5,
  },
  themeColorDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 12,
  },
  themeLabel: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
    flex: 1,
  },
  themeLabelDisabled: {
    color: "#94A3B8",
  },
  comingSoonPill: {
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: "auto",
  },
  comingSoonText: {
    color: "#64748B",
    fontSize: 10,
    fontFamily: "Sora_600SemiBold",
  },
  sheetCloseBtn: {
    marginTop: 16,
    backgroundColor: "#F4F4FF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDE3F4",
  },
  sheetCloseBtnText: {
    color: "#5C5CDB",
    fontSize: 14,
    fontFamily: "Sora_700Bold",
  },
});