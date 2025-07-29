import { Button } from "@/components/ui/button";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { DatabaseProvider } from "@/context/DatabaseContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RootLayout() {
  const router = useRouter();
  return (
    <AppLayout>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="currency-list"
          options={{
            title: "Currency Lists",
            headerRight: () => (
              <Button
                size="sm"
                variant="outline"
                action="primary"
                onPress={() => router.push("/select-currency")}
              >
                <MaterialIcons name="add" size={20} color="black" />
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="select-currency"
          options={{
            title: "Select Currency",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />

      {/* FAB */}
    </AppLayout>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <DatabaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </DatabaseProvider>
  );
}
