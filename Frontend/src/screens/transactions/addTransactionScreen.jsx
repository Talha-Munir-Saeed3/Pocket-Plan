import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import InputField from "../../components/common/inputField";
import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function AddTransactionScreen() {
  const router = useRouter();
  const [type, setType] = useState("Expense");

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <Text style={appStyles.title}>Add Transaction</Text>
        <Text style={[appStyles.subtitle, { marginBottom: 16 }]}>Log spending, income, transfer, or borrow/lend records.</Text>

        <View style={[appStyles.chipRow, { marginBottom: 14 }]}>
          {["Expense", "Income", "Transfer", "Borrow"].map((item) => (
            <Pressable
              key={item}
              style={[appStyles.chip, type === item && appStyles.chipActive]}
              onPress={() => setType(item)}
            >
              <Text style={[appStyles.chipText, type === item && appStyles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={appStyles.card}>
          <InputField label="Amount" placeholder="PKR 0" />
          <InputField label="Category" placeholder="Food, Transport, Rent..." />
          <InputField label="Date And Time" placeholder="Today, 2:30 PM" />
          <InputField label="Description" placeholder="Add a short note" />
          <PrimaryButton label="Save Transaction" style={{ marginTop: 6 }} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
