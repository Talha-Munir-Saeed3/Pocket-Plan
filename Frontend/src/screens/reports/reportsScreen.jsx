import { ScrollView, Text, View } from "react-native";

import StatCard from "../../components/cards/statCard";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function ReportsScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>Reports</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Monthly insights and category breakdown.</Text>

        <View style={[appStyles.statGrid, { marginBottom: 14 }]}>
          <StatCard label="Total Income" value="85,000" tone="good" />
          <StatCard label="Total Spent" value="42,500" tone="bad" />
          <StatCard label="Net Savings" value="42,500" tone="good" />
          <StatCard label="Transactions" value="34" />
        </View>

        <View style={appStyles.card}>
          <Text style={appStyles.sectionTitle}>Income vs Expenses</Text>
          <Text style={appStyles.subtitle}>Chart module placeholder for monthly bars.</Text>
        </View>

        <View style={appStyles.card}>
          <Text style={appStyles.sectionTitle}>Spending by Category</Text>
          <Text style={appStyles.subtitle}>Chart module placeholder for donut/pie view.</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
