import { Text, View } from "react-native";

import { appStyles } from "../../styles/appStyles";

export default function StatCard({ label, value, tone = "default" }) {
  const toneStyle =
    tone === "good"
      ? appStyles.statValueGood
      : tone === "warning"
      ? appStyles.statValueWarning
      : tone === "bad"
      ? appStyles.statValueBad
      : appStyles.statValue;

  return (
    <View style={appStyles.statCard}>
      <Text style={appStyles.statLabel}>{label}</Text>
      <Text style={[appStyles.statValue, toneStyle]}>{value}</Text>
    </View>
  );
}

