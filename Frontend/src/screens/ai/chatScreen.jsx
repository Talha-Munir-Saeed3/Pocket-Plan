import { ScrollView, Text, TextInput, View } from "react-native";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function ChatScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>AI Chat Assistant</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Ask for saving suggestions based on your spending behavior.</Text>

        <View style={appStyles.card}>
          <Text style={appStyles.itemTitle}>Assistant</Text>
          <Text style={appStyles.itemMeta}>You are at 58% of your monthly budget. Consider reducing food spend this week.</Text>
        </View>

        <View style={appStyles.card}>
          <Text style={appStyles.itemTitle}>You</Text>
          <Text style={appStyles.itemMeta}>How can I save an extra 5,000 this month?</Text>
        </View>

        <TextInput
          style={[appStyles.inputControl, { marginBottom: 10 }]}
          placeholder="Type your question"
          placeholderTextColor="#9CA3AF"
        />
        <PrimaryButton label="Send Message" />
      </ScrollView>
    </ScreenContainer>
  );
}
