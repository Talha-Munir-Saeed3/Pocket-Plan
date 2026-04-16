import { useEffect } from "react";
import { Stack } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const backSubscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }

      // Let Android handle root behavior (usually exits app).
      return false;
    });

    return () => backSubscription.remove();
  }, [router]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-transaction" />
        <Stack.Screen name="budget" />
        <Stack.Screen name="premium" />
      </Stack>
    </SafeAreaProvider>
  );
}


