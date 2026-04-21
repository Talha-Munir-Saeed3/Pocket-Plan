import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";

export default function ChatScreen() {
  const [prompt, setPrompt] = useState("");

  const quickPrompts = [
    "How to save 5,000 this week?",
    "Where am I overspending?",
    "Plan my budget for next month"
  ];

  return (
    <ScreenContainer style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#16193B", "#5C5CDB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroCircleA} />
          <View style={styles.heroCircleB} />
          <Text style={styles.heroKicker}>Assistant</Text>
          <Text style={styles.heroTitle}>AI Money Coach</Text>
          <Text style={styles.heroSubtitle}>Ask for spending analysis, savings plans, or quick budget decisions.</Text>

          <View style={styles.heroTagsRow}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>Live Suggestions</Text>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>Goal Planning</Text>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>Weekly Review</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Current Snapshot</Text>
          <Text style={styles.insightText}>You are at 58% of your monthly budget and food spending is trending above plan by 9%.</Text>
        </View>

        <View style={styles.chatCard}>
          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <Text style={styles.messageAuthor}>Assistant</Text>
            <Text style={styles.messageText}>You are at 58% of your monthly budget. Consider reducing food spend this week.</Text>
          </View>

          <View style={[styles.messageBubble, styles.userBubble]}>
            <Text style={[styles.messageAuthor, styles.userAuthor]}>You</Text>
            <Text style={[styles.messageText, styles.userText]}>How can I save an extra 5,000 this month?</Text>
          </View>

          <View style={[styles.messageBubble, styles.assistantBubble]}>
            <Text style={styles.messageAuthor}>Assistant</Text>
            <Text style={styles.messageText}>Start by reducing ride costs 15% and shopping 12%. That should free around PKR 5,400 this month.</Text>
          </View>
        </View>

        <Text style={styles.quickPromptTitle}>Quick prompts</Text>
        <View style={styles.quickPromptWrap}>
          {quickPrompts.map((item) => (
            <Pressable key={item} style={styles.quickPromptChip} onPress={() => setPrompt(item)}>
              <Text style={styles.quickPromptText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.composerCard}>
          <Text style={styles.composerLabel}>Ask Pocket Plan AI</Text>
          <TextInput
            style={styles.composerInput}
            placeholder="Type a budgeting or savings question"
            placeholderTextColor="#9CA3AF"
            value={prompt}
            onChangeText={setPrompt}
            multiline
          />
          <PrimaryButton label="Send Message" onPress={() => setPrompt("")} />
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
  heroCircleA: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 999,
    top: -22,
    right: -34,
    backgroundColor: "rgba(255,255,255,0.15)"
  },
  heroCircleB: {
    position: "absolute",
    width: 220,
    height: 66,
    left: -60,
    bottom: -32,
    transform: [{ rotate: "-12deg" }],
    backgroundColor: "rgba(255,255,255,0.11)"
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
    color: "rgba(237,240,255,0.92)",
    fontSize: 13.5,
    marginTop: 8
  },
  heroTagsRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  heroTag: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8
  },
  heroTagText: {
    color: "#E4E7FF",
    fontWeight: "800",
    fontSize: 11.5
  },
  insightCard: {
    backgroundColor: "#F8FAFF",
    borderWidth: 1,
    borderColor: "#D7DEEF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10
  },
  insightTitle: {
    color: "#3730A3",
    fontSize: 13,
    fontWeight: "900"
  },
  insightText: {
    color: "#334155",
    marginTop: 4,
    lineHeight: 19,
    fontSize: 13
  },
  chatCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 12,
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
    fontWeight: "800",
    marginBottom: 4
  },
  userAuthor: {
    color: "#2F2F8F"
  },
  messageText: {
    color: "#0F172A",
    lineHeight: 20
  },
  userText: {
    color: "#111827"
  },
  quickPromptTitle: {
    marginTop: 2,
    marginBottom: 8,
    color: "#111827",
    fontWeight: "800",
    fontSize: 16
  },
  quickPromptWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12
  },
  quickPromptChip: {
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DDFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8
  },
  quickPromptText: {
    color: "#2E2FA8",
    fontSize: 12,
    fontWeight: "800"
  },
  composerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12
  },
  composerLabel: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 8
  },
  composerInput: {
    minHeight: 72,
    maxHeight: 130,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    color: "#111827"
  }
});
