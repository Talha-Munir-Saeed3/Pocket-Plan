import { ScrollView, Text, TextInput, View } from "react-native";

import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function HistoryScreen() {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>Transaction History</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Search and filter your full transaction list.</Text>

        <TextInput style={appStyles.inputControl} placeholder="Search transactions" placeholderTextColor="#9CA3AF" />

        <View style={[appStyles.chipRow, { marginVertical: 14 }]}>
          {["All", "Expenses", "Income", "This Week"].map((filter) => (
            <View key={filter} style={appStyles.chip}>
              <Text style={appStyles.chipText}>{filter}</Text>
            </View>
          ))}
        </View>

        {[
          "McDonald's -850",
          "Careem Ride -450",
          "Fuel -3,200",
          "Pharmacy -1,200",
          "Daraz Order -4,500"
        ].map((item) => (
          <View key={item} style={appStyles.listItem}>
            <Text style={appStyles.itemTitle}>{item}</Text>
            <Text style={appStyles.itemMeta}>Tap item later for details and edit options.</Text>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
