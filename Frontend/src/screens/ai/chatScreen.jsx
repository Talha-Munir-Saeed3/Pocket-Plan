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
        <LinearGradient colors={["#5C5CDB", "#3F2E95"]} style={styles.hero}>
          <View style={styles.heroCircle} />
          <Text style={styles.heroTitle}>AI Money Coach</Text>
          <Text style={styles.heroSubtitle}>Get personalized savings tips using your latest spending patterns.</Text>
        </LinearGradient>

        <View style={[styles.messageBubble, styles.assistantBubble, styles.shadowCard]}>
          <Text style={styles.messageAuthor}>Assistant</Text>
          <Text style={styles.messageText}>You are at 58% of your monthly budget. Consider reducing food spend this week.</Text>
        </View>

        <View style={[styles.messageBubble, styles.userBubble]}>
          <Text style={[styles.messageAuthor, styles.userAuthor]}>You</Text>
          <Text style={[styles.messageText, styles.userText]}>How can I save an extra 5,000 this month?</Text>
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
          <TextInput
            style={styles.composerInput}
            placeholder="Type your question"
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
    padding: 18,
    paddingBottom: 28
  },
  hero: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden"
  },
  heroCircle: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 999,
    top: -30,
    right: -40,
    backgroundColor: "rgba(255,255,255,0.14)"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900"
  },
  heroSubtitle: {
    color: "#D6DFFF",
    fontSize: 14,
    marginTop: 6
  },
  shadowCard: {
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1
  },
  assistantBubble: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    marginRight: 28
  },
  userBubble: {
    backgroundColor: "#EEF0FF",
    borderColor: "#D7DDFF",
    marginLeft: 28
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
    gap: 8,
    marginBottom: 12
  },
  quickPromptChip: {
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DDFF",
    paddingVertical: 8,
    paddingHorizontal: 12
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
