import { ScrollView, Text, View } from "react-native";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function PremiumScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <View style={[appStyles.authHeader, { backgroundColor: "#1A1B3B" }]}>
          <Text style={appStyles.authTitle}>Pocket Plan Premium</Text>
          <Text style={appStyles.authSubtitle}>Unlock deeper insights and priority AI assistance.</Text>
        </View>

        {[
          "Extended transaction history",
          "Advanced PDF and CSV exports",
          "Multiple budget profiles",
          "Priority AI chat responses",
          "Ad-free experience"
        ].map((feature) => (
          <View key={feature} style={appStyles.listItem}>
            <Text style={appStyles.itemTitle}>• {feature}</Text>
          </View>
        ))}

        <PrimaryButton label="Upgrade Now" />
      </ScrollView>
    </ScreenContainer>
  );
}

