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
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import {
  accountCategoriesTable,
  accountsTable,
  currenciesTable,
  Currency,
} from "@/db/schema";
import { insertAccount } from "@/libs/actions";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function AddAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [currencyId, setCurrencyId] = useState<Currency | null>(null);

  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const { db, isReady, error } = useDatabase();

  // Account categories
  const { data: accountCategoriesDB } = useLiveQuery(
    db.select().from(accountCategoriesTable)
  );

  // Currencies
  const { data: currenciesDB } = useLiveQuery(
    db.select().from(currenciesTable)
  );

  // Set default category to "Cash" when data is loaded
  useEffect(() => {
    if (accountCategoriesDB && !categoryId) {
      const cashCategory = accountCategoriesDB.find(
        (cat) => cat.name === "Cash"
      );
      if (cashCategory) setCategoryId(cashCategory.id);
    }
  }, [accountCategoriesDB, categoryId]);

  // Loading check
  if (!accountCategoriesDB || !currenciesDB) {
    return (
      <ThemedView className="p-6 flex-1">
        <Text>Loading...</Text>
      </ThemedView>
    );
  }

  // Submit
  const onSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(""); // Clear previous error

    try {
      if (!categoryId || !currencyId) {
        setErrorMessage("Please select both category and currency");
        return;
      }

      const data = await insertAccount(
        db,
        name,
        balance,
        categoryId,
        currencyId.id,
        accountsTable
      );
      if (data.success) {
        setName("");
        setBalance(0);
        setCategoryId(null);
        setCurrencyId(null);
        router.back();
      } else {
        setErrorMessage(data.message || "Failed to save account");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while saving"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <ThemedView className="p-6 flex-1">
        <Text>Migrating...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView className="p-6 flex-1">
        <Text>Error on migration.</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-col gap-4 p-6">
      {/* Name */}
      <View className="gap-2">
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium w-24">Name</Text>
          <Input variant="outline" size="md" className="flex-1">
            <InputField
              placeholder="Enter account name"
              value={name}
              onChangeText={setName}
            />
          </Input>
        </View>
        {errorMessage ? (
          <Text className="text-red-500 text-sm ml-28">{errorMessage}</Text>
        ) : null}
      </View>

      {/* Balance */}
      <View className="flex-row items-center gap-4">
        <Text className="text-lg font-medium w-24">Balance</Text>
        <Input variant="outline" size="md" className="flex-1">
          <InputField
            placeholder="Enter balance"
            value={String(balance)}
            onChangeText={(text) => setBalance(Number(text))}
            onSubmitEditing={onSubmit}
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
          <Text>
            {accountCategoriesDB.find((cat) => cat.id === categoryId)?.name ||
              "Select Category"}
          </Text>
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
          {accountCategoriesDB.map((cat) => (
            <ActionsheetItem
              key={cat.id}
              onPress={() => {
                setCategoryId(cat.id);
                setShowCategorySheet(false);
              }}
            >
              <ActionsheetItemText>
                <Text>{cat.name}</Text>
              </ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>

      {/* Currency */}
      <View className="flex-row items-center gap-4">
        <Text className="text-lg font-medium w-24">Currency</Text>
        <View className="flex-1">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {currenciesDB.map((curr) => (
              <Button
                key={curr.id}
                variant={currencyId?.id === curr.id ? "solid" : "outline"}
                size="sm"
                onPress={() => setCurrencyId(curr)}
              >
                <ButtonText className="text-xs">{curr.symbol}</ButtonText>
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                router.push("/currency-list/page");
              }}
              className="border-dashed"
            >
              <ButtonText className="text-lg">+</ButtonText>
            </Button>
          </ScrollView>
        </View>
      </View>

      <Button
        className="mt-8"
        onPress={onSubmit}
        isDisabled={isSubmitting || !name.trim() || !currencyId}
      >
        <ButtonText>Add Account</ButtonText>
      </Button>
    </ThemedView>
  );
}
