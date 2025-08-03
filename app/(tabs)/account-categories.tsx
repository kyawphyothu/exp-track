import PressableComponent from "@/components/PressableComponent";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import { accountCategoriesTable, AccountCategory } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React from "react";
import { FlatList } from "react-native";

export default function AccountCategories() {
  const { db, isReady, error } = useDatabase();

  const { data: accountCategoriesDB } = useLiveQuery(
    db.select().from(accountCategoriesTable)
  );

  if (!isReady) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <Text>Migrating...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <Text>Error on migration.</Text>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={accountCategoriesDB}
      keyExtractor={(item: AccountCategory) => `${item.id}`}
      renderItem={({ item }) => (
        <PressableComponent
          db={db}
          uri="/account-category"
          item={item}
          table={accountCategoriesTable}
          icon={true}
        />
      )}
    />
  );
}
