import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-transaction" />
      <Stack.Screen name="budget" />
      <Stack.Screen name="premium" />
    </Stack>
  );
}


