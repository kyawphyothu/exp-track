import { ThemedView } from "@/components/ThemedView";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import { currenciesTable, Currency } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function AddAccount() {
  const [name, setName] = useState("");
  // const [balance, setBalance] = useState("");
  const [category, setCategory] = useState("Cash");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  const { db, isReady, error } = useDatabase();
  const { data: currenciesDB } = useLiveQuery(
    db.select().from(currenciesTable)
  );

  const defaultCategories = [
    "Personal",
    "Business",
    "Savings",
    "Cash",
    "Other",
  ];
  const allCategories = [...defaultCategories, ...customCategories];

  const handleAddCategory = () => {
    Alert.prompt("Add Category", "Enter a new category name:", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Add",
        onPress: (text) => {
          if (text && text.trim() && !allCategories.includes(text.trim())) {
            setCustomCategories((prev) => [...prev, text.trim()]);
          }
        },
      },
    ]);
  };

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
    <ThemedView className="flex-1 p-4">
      <View className="flex-col gap-4">
        {/* Name */}
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium w-24">Name</Text>
          <Input variant="outline" size="md" className="flex-1">
            <InputField
              placeholder="Enter account name..."
              value={name}
              onChangeText={setName}
            />
          </Input>
        </View>

        {/* Category */}
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium w-24">Category</Text>
          <Button
            variant="outline"
            className="flex-1 justify-start"
            onPress={() => setShowCategorySheet(true)}
          >
            <Text>{category}</Text>
          </Button>
        </View>
        <Actionsheet
          isOpen={showCategorySheet}
          onClose={() => setShowCategorySheet(false)}
        >
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {allCategories.map((cat) => (
              <ActionsheetItem
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setShowCategorySheet(false);
                }}
              >
                <ActionsheetItemText>
                  <Badge variant="outline" className="mr-2">
                    {cat}
                  </Badge>
                  {cat}
                </ActionsheetItemText>
              </ActionsheetItem>
            ))}
            <ActionsheetItem onPress={handleAddCategory}>
              <ActionsheetItemText className="text-blue-600 font-bold">
                + Add New Category
              </ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>

        {/* Currency */}
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium w-24">Currency</Text>
          <Button
            variant="outline"
            className="flex-1 justify-start"
            onPress={() => setShowCurrencySheet(true)}
          >
            <ButtonText>
              {currency ? (
                <Badge variant="solid" className="mr-2">
                  {currency.code} - {currency.name}
                </Badge>
              ) : (
                "Select Currency"
              )}
            </ButtonText>
          </Button>
        </View>
        <Actionsheet
          isOpen={showCurrencySheet}
          onClose={() => setShowCurrencySheet(false)}
        >
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {currenciesDB?.map((curr) => (
              <ActionsheetItem
                key={curr.id}
                onPress={() => {
                  setCurrency(curr);
                  setShowCurrencySheet(false);
                }}
              >
                <ActionsheetItemText>
                  <Badge variant="outline" className="mr-2">
                    {curr.code}
                  </Badge>
                  {curr.name}
                </ActionsheetItemText>
              </ActionsheetItem>
            ))}
          </ActionsheetContent>
        </Actionsheet>

        <Button
          className="mt-8"
          onPress={() => {
            // handle save logic here
            console.log({ name, category, currency });
          }}
        >
          <ButtonText>Add Account</ButtonText>
        </Button>
      </View>
    </ThemedView>
  );
}
