import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from "@expo-google-fonts/sora";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { THEME_OPTIONS, useThemeStore } from "../../stores/themeStore";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const selectedThemeId = useThemeStore((state) => state.selectedThemeId);
  const activeTheme = THEME_OPTIONS.find((theme) => theme.id === selectedThemeId) ?? THEME_OPTIONS[0];
  const [prompt, setPrompt] = useState("");
  const [fontsLoaded] = useFonts({
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold
  });

  if (!fontsLoaded) return null;

  const quickPrompts = [
    "How to save 5,000 this week?",
    "Where am I overspending?",
    "Plan my budget for next month",
    "What can I cut today without stress?"
  ];

  return (
    <ScreenContainer style={[styles.screen, { backgroundColor: activeTheme.backgroundColor }]} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 22 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[activeTheme.boxColor, activeTheme.supportingAccent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, { paddingTop: insets.top + 12 }] }>
          <View style={styles.heroCircleA} />
          <View style={styles.heroCircleB} />
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroKicker}>Assistant</Text>
              <Text style={styles.heroTitle}>AI Money Coach</Text>
            </View>
            <View style={styles.heroStatusPill}>
              <View style={styles.heroStatusDot} />
              <Text style={styles.heroStatusText}>Online</Text>
            </View>
          </View>
          <Text style={styles.heroSubtitle}>Ask for spending analysis, savings plans, and instant trade-off decisions.</Text>
        </LinearGradient>

        <View style={styles.bodyContainer}>
          <View style={styles.messagesStack}>
            <View style={[styles.messageBubble, styles.assistantBubble, { backgroundColor: `${activeTheme.boxColor}12`, borderColor: `${activeTheme.boxColor}22` }]}>
              <Text style={[styles.messageAuthor, { color: activeTheme.boxColor }]}>Assistant</Text>
              <Text style={styles.messageText}>You are at 58% of your monthly budget. Consider reducing food spend this week.</Text>
            </View>

            <View style={[styles.messageBubble, styles.userBubble, { backgroundColor: `${activeTheme.supportingAccent}15`, borderColor: `${activeTheme.supportingAccent}30` }]}>
              <Text style={[styles.messageAuthor, styles.userAuthor, { color: activeTheme.supportingAccent }]}>You</Text>
              <Text style={[styles.messageText, styles.userText]}>How can I save an extra 5,000 this month?</Text>
            </View>

            <View style={[styles.messageBubble, styles.assistantBubble, { backgroundColor: `${activeTheme.boxColor}12`, borderColor: `${activeTheme.boxColor}22` }]}>
              <Text style={[styles.messageAuthor, { color: activeTheme.boxColor }]}>Assistant</Text>
              <Text style={styles.messageText}>Start by reducing ride costs 15% and shopping 12%. That should free around PKR 5,400 this month.</Text>
            </View>
          </View>

          <View style={styles.quickPromptSection}>
            <Text style={styles.quickPromptTitle}>Quick prompts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickPromptWrap}>
              {quickPrompts.map((item) => (
                <Pressable key={item} style={[styles.quickPromptChip, { borderColor: `${activeTheme.boxColor}40`, backgroundColor: activeTheme.backgroundColor }]} onPress={() => setPrompt(item)}>
                  <Text style={[styles.quickPromptText, { color: activeTheme.boxColor }]}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={[styles.composerCard, { backgroundColor: `${activeTheme.backgroundColor}F0`, borderColor: `${activeTheme.boxColor}22` }]}>
            <TextInput
              style={[styles.composerInput, { color: activeTheme.textColor }]}
              placeholder="Type a budgeting or savings question"
              placeholderTextColor="#9CA3AF"
              value={prompt}
              onChangeText={setPrompt}
              multiline
            />
            <PrimaryButton label="Send Message" onPress={() => setPrompt("")} />
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
    paddingHorizontal: 0,
    paddingTop: 0
  },
  hero: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingBottom: 16,
    marginBottom: 12,
    overflow: "hidden"
  },
  bodyContainer: {
    paddingHorizontal: 12,
    paddingTop: 6
  },
  heroCircleA: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    top: -26,
    right: -42,
    backgroundColor: "rgba(255,255,255,0.13)"
  },
  heroCircleB: {
    position: "absolute",
    width: 130,
    height: 130,
    left: -42,
    bottom: -48,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroStatusPill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.36)",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  heroStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#34D399"
  },
  heroStatusText: {
    marginLeft: 6,
    color: "#E4E7FF",
    fontSize: 11,
    fontFamily: "Sora_700Bold"
  },
  heroKicker: {
    color: "rgba(229,232,255,0.9)",
    fontSize: 13,
    fontFamily: "Sora_700Bold"
  },
  heroTitle: {
    color: "#FFFFFF",
    marginTop: 4,
    fontSize: 31,
    fontFamily: "Sora_800ExtraBold"
  },
  heroSubtitle: {
    color: "rgba(237,240,255,0.92)",
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
    fontFamily: "Sora_500Medium"
  },
  messagesStack: {
    paddingVertical: 2,
    marginBottom: 12
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1
  },
  assistantBubble: {
    backgroundColor: "#F8FAFF",
    borderColor: "#DCE4F2",
    marginRight: 24
  },
  userBubble: {
    backgroundColor: "#EEF0FF",
    borderColor: "#D7DDFF",
    marginLeft: 24
  },
  messageAuthor: {
    color: "#4338CA",
    fontSize: 12,
    fontFamily: "Sora_700Bold",
    marginBottom: 4
  },
  userAuthor: {
    color: "#2F2F8F"
  },
  messageText: {
    color: "#0F172A",
    lineHeight: 20,
    fontSize: 13,
    fontFamily: "Sora_500Medium"
  },
  userText: {
    color: "#111827"
  },
  quickPromptSection: {
    marginBottom: 12
  },
  quickPromptTitle: {
    marginTop: 0,
    marginBottom: 8,
    color: "#111827",
    fontSize: 14,
    fontFamily: "Sora_700Bold"
  },
  quickPromptWrap: {
    paddingRight: 6
  },
  quickPromptChip: {
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8
  },
  quickPromptText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontFamily: "Sora_700Bold"
  },
  composerCard: {
    backgroundColor: "#FCFCFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDE3F4",
    padding: 12
  },
  composerInput: {
    minHeight: 72,
    maxHeight: 130,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    color: "#111827",
    fontFamily: "Sora_500Medium"
  }
});
