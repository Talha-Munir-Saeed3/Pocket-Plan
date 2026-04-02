import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import InputField from "../../components/common/inputField";
import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <View style={appStyles.authHeader}>
          <Text style={appStyles.authTitle}>Pocket Plan</Text>
          <Text style={appStyles.authSubtitle}>Sign in and stay in control of your money.</Text>
        </View>

        <View style={appStyles.card}>
          <InputField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={[appStyles.row, { marginTop: 6, marginBottom: 14 }]}>
            <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
              <Text style={appStyles.textLink}>Forgot password?</Text>
            </Pressable>
          </View>

          <PrimaryButton label="Sign In" onPress={() => router.replace("/(tabs)")} />
          <PrimaryButton
            label="Continue With Google"
            variant="secondary"
            style={{ marginTop: 10 }}
            onPress={() => router.replace("/(tabs)")}
          />
        </View>

        <Pressable style={{ marginTop: 14 }} onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={[appStyles.subtitle, { textAlign: "center" }]}>No account yet? <Text style={appStyles.textLink}>Create one</Text></Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

