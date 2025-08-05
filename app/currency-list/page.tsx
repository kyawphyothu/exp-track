import { ThemedView } from "@/components/ThemedView";
import { Pressable } from "@/components/ui/pressable";
import { useDatabase } from "@/context/DatabaseContext";
import { currencies } from "@/data";
import { currenciesTable, Currency, NewCurrency } from "@/db/schema";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function CurrencyList() {
  const router = useRouter();
  const { db, isReady, error } = useDatabase();
  const [search, setSearch] = useState("");

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

  const filteredCurrencies = currencies
    .filter(
      (cur) =>
        cur.name.toLowerCase().includes(search.toLowerCase()) ||
        cur.symbol.toLowerCase().includes(search.toLowerCase()) ||
        cur.code.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.code.localeCompare(b.code));

  const addCurrency = async (item: NewCurrency) => {
    try {
      await db.insert(currenciesTable).values(item);
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  const RenderItem = ({ code, name, symbol }: Omit<Currency, "id">) => (
    <Pressable onPress={() => addCurrency({ code, name, symbol })}>
      {({ pressed }) => (
        <View
          className={`h-16 px-6 flex-row items-center justify-between border-b bg-slate-200 ${
            pressed ? "bg-slate-400" : ""
          }`}
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-gray-100 px-2 py-1 rounded-md">
              {currenciesDB.some((cur) => cur.code === code) ? (
                <Text className="font-bold text-base text-red-600">{code}</Text>
              ) : (
                <Text className="font-bold text-base text-gray">{code}</Text>
              )}
            </View>
            <View>
              {currenciesDB.some((cur) => cur.code === code) ? (
                <Text className="text-lg font-medium text-red-600">{name}</Text>
              ) : (
                <Text className="text-lg font-medium text-gray-900">
                  {name}
                </Text>
              )}
              {currenciesDB.some((cur) => cur.code === code) ? (
                <Text className="text-sm text-red-600">{symbol}</Text>
              ) : (
                <Text className="text-sm text-gray-500">{symbol}</Text>
              )}
            </View>
          </View>
          {currenciesDB.some((cur) => cur.code === code) && (
            <MaterialIcons name="check" size={22} color="red" />
          )}
        </View>
      )}
    </Pressable>
  );

  return (
    <View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search currency..."
        className="border p-2 mx-2 my-4 rounded-lg"
      />
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <RenderItem code={item.code} name={item.name} symbol={item.symbol} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="h-full"
      />
    </View>
  );
}
