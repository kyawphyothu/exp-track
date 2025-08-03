import { Button } from "@/components/ui/button";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DatabaseProvider } from "@/context/DatabaseContext";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const router = useRouter();
  return (
    <AppLayout>
      <Stack>
        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Currency list */}
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

        {/* Select currency */}
        <Stack.Screen
          name="select-currency"
          options={{
            title: "Select Currency",
          }}
        />

        {/* Add account */}
        <Stack.Screen
          name="add-account"
          options={{
            title: "Add account",
          }}
        />

        {/* Account setting */}
        {/* <Stack.Screen
          name="account-settings"
          options={{
            title: "Account Settings",
          }}
        /> */}

        {/* Account category */}
        <Stack.Screen
          name="account-category/page"
          options={{
            title: "Account Category",
            contentStyle: { padding: 20 },
          }}
        />

        {/* Account category with ID */}
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
