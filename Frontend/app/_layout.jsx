import { useEffect } from "react";
import { Stack } from "expo-router";
import { BackHandler, LogBox, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    // Ignore noisy development keep-awake activation failures coming from Expo dev tools.
    LogBox.ignoreLogs(["Unable to activate keep awake"]);

    const previousHandler = global.ErrorUtils?.getGlobalHandler?.();
    const guardHandler = (error, isFatal) => {
      const message = String(error?.message || error || "");
      if (message.includes("Unable to activate keep awake")) {
        return;
      }

      if (typeof previousHandler === "function") {
        previousHandler(error, isFatal);
      }
    };

    global.ErrorUtils?.setGlobalHandler?.(guardHandler);

    return () => {
      if (typeof previousHandler === "function") {
        global.ErrorUtils?.setGlobalHandler?.(previousHandler);
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const previousUnhandled = globalThis.onunhandledrejection;
    globalThis.onunhandledrejection = (event) => {
      const message = String(event?.reason?.message || event?.reason || "");
      if (message.includes("Unable to activate keep awake")) {
        if (typeof event?.preventDefault === "function") {
          event.preventDefault();
        }
        return;
      }

      if (typeof previousUnhandled === "function") {
        previousUnhandled(event);
      }
    };

    return () => {
      globalThis.onunhandledrejection = previousUnhandled;
    };
  }, []);

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
        <Stack.Screen name="add-transaction-help" />
        <Stack.Screen name="history-help" />
        <Stack.Screen name="reports-help" />
        <Stack.Screen name="budget" />
        <Stack.Screen name="budget-help" />
        <Stack.Screen name="savings-goal" />
        <Stack.Screen name="savings-help" />
        <Stack.Screen name="premium" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="update-avatar" />
        <Stack.Screen name="change-password" />
        <Stack.Screen name="currency-selection" />
        <Stack.Screen name="app-lock" />
        <Stack.Screen name="biometric" />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="faq" />
        <Stack.Screen name="change-theme" />
      </Stack>
    </SafeAreaProvider>
  );
}


