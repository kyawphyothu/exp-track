import DeleteButton from "@/components/DeleteButton";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import { currenciesTable, Currency } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export default function CurrencyList() {
  const [search] = useState("");

  const { db, isReady, error } = useDatabase();

  const { data: currenciesDB } = useLiveQuery(
    db.select().from(currenciesTable)
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
      data={currenciesDB.filter(
        (set) =>
          set.name.toLowerCase().includes(search.toLowerCase()) ||
          set.code.toLowerCase().includes(search.toLowerCase())
      )}
      keyExtractor={(item: Currency) => item.code}
      renderItem={({ item }: { item: Currency }) => (
        <View className="px-2 py-4 flex-row items-center border-b">
          <Text className="capitalize" style={{ flex: 1 }}>
            {item.name}
          </Text>
          <DeleteButton
            type="currency"
            db={db}
            item={item}
            table={currenciesTable}
          />
        </View>
      )}
    />
  );
}
