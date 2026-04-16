import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>Settings</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Manage profile, security, notifications, and premium plan.</Text>

        {[
          "Edit Profile",
          "Notification Preferences",
          "Privacy And Security",
          "Currency Selection",
          "Manage Subscription"
        ].map((item) => (
          <View key={item} style={appStyles.listItem}>
            <Text style={appStyles.itemTitle}>{item}</Text>
          </View>
        ))}

        <PrimaryButton label="Go Premium" onPress={() => router.push("/premium")} />
      </ScrollView>
    </ScreenContainer>
  );
}
