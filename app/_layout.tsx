import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DatabaseProvider } from "@/context/DatabaseContext";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AppLayout>
      <Stack>
        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Currency list */}
        <Stack.Screen
          name="currency-list/page"
          options={{
            title: "Currency Lists",
            headerTitleAlign: "center",
          }}
        />

        {/* Add account */}
        <Stack.Screen
          name="add-account/page"
          options={{
            title: "Add account",
          }}
        />

        {/* Account category */}
        <Stack.Screen
          name="account-category/page"
          options={{
            title: "Account Category",
            contentStyle: { padding: 20 },
          }}
        />

        {/* Account category by ID */}
        <Stack.Screen
          name="account-category/[id]/page"
          options={{
            title: "Account Category",
            contentStyle: { padding: 20 },
          }}
        />

        {/* 404 */}
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
      <GluestackUIProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {children}
        </ThemeProvider>
      </GluestackUIProvider>
    </DatabaseProvider>
  );
}
