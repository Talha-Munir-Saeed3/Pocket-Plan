import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import PrimaryButton from "../../components/common/primaryButton";
import StatCard from "../../components/cards/statCard";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <View style={appStyles.authHeader}>
          <Text style={appStyles.authSubtitle}>Good afternoon</Text>
          <Text style={appStyles.authTitle}>Talha</Text>
          <Text style={[appStyles.authSubtitle, { marginTop: 10 }]}>Available balance</Text>
          <Text style={[appStyles.authTitle, { fontSize: 34 }]}>PKR 42,500</Text>
        </View>

        <Text style={appStyles.sectionTitle}>Quick Actions</Text>
        <View style={[appStyles.row, { marginBottom: 14 }]}>
          <PrimaryButton label="Add Transaction" style={{ flex: 1 }} onPress={() => router.push("/add-transaction")} />
          <PrimaryButton label="Budget" variant="secondary" style={{ flex: 1 }} onPress={() => router.push("/budget")} />
        </View>

        <Text style={appStyles.sectionTitle}>Overview</Text>
        <View style={[appStyles.statGrid, { marginBottom: 14 }]}>
          <StatCard label="Income" value="85,000" tone="good" />
          <StatCard label="Spent" value="42,500" tone="bad" />
          <StatCard label="Savings" value="42,500" tone="good" />
          <StatCard label="Budget Used" value="58%" tone="warning" />
        </View>

        <Text style={appStyles.sectionTitle}>Recent Transactions</Text>
        {[
          "McDonald's -850",
          "Careem Ride -450",
          "Fuel -3,200",
          "Pharmacy -1,200"
        ].map((item) => (
          <View key={item} style={appStyles.listItem}>
            <Text style={appStyles.itemTitle}>{item}</Text>
            <Text style={appStyles.itemMeta}>Tap history tab for full details</Text>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
