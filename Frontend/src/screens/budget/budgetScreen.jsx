import { ScrollView, Text, View } from "react-native";

import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function BudgetScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>Budget Planner</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Set monthly and category budgets with carry-forward support.</Text>

        <View style={appStyles.card}>
          <Text style={appStyles.sectionTitle}>Monthly Budget</Text>
          <Text style={appStyles.itemMeta}>PKR 75,000</Text>
        </View>

        <View style={appStyles.card}>
          <Text style={appStyles.sectionTitle}>Category Budgets</Text>
          <Text style={appStyles.itemMeta}>Food: 20,000 (72% used)</Text>
          <Text style={appStyles.itemMeta}>Transport: 8,000 (55% used)</Text>
          <Text style={appStyles.itemMeta}>Shopping: 12,000 (40% used)</Text>
        </View>

        <PrimaryButton label="Update Budget" />
      </ScrollView>
    </ScreenContainer>
  );
}
