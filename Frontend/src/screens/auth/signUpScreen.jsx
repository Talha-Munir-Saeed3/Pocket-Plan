import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import InputField from "../../components/common/inputField";
import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <View style={appStyles.authHeader}>
          <Text style={appStyles.authTitle}>Create Account</Text>
          <Text style={appStyles.authSubtitle}>Get started with your personal finance workspace.</Text>
        </View>

        <View style={appStyles.card}>
          <InputField label="Full Name" placeholder="Talha" value={fullName} onChangeText={setFullName} />
          <InputField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <InputField
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <PrimaryButton label="Create Account" onPress={() => router.replace("/(tabs)")} />
        </View>

        <Pressable style={{ marginTop: 14 }} onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={[appStyles.subtitle, { textAlign: "center" }]}>Already have an account? <Text style={appStyles.textLink}>Sign in</Text></Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

