import DeleteButton from "@/components/DeleteButton";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import { accountCategoriesTable, accountsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { useMemo } from "react";
import { SectionList, View } from "react-native";

export default function AccountsScreen() {
  const { db, isReady, error } = useDatabase();

  const { data: accountsDB } = useLiveQuery(
    db
      .select({
        id: accountsTable.id,
        name: accountsTable.name,
        balance: accountsTable.balance,
        categoryId: accountsTable.categoryId,
        currencyId: accountsTable.currencyId,
        categoryName: accountCategoriesTable.name,
      })
      .from(accountsTable)
      .leftJoin(
        accountCategoriesTable,
        eq(accountsTable.categoryId, accountCategoriesTable.id)
      )
  );

  // Group accounts by category
  const groupedAccounts = useMemo(() => {
    if (!accountsDB) return [];

    const groups = accountsDB.reduce((acc, account) => {
      const categoryName = account.categoryName || "-";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      acc[categoryName].push(account);

      return acc;
    }, {} as Record<string, typeof accountsDB>);

    return Object.entries(groups).map(([categoryName, accounts]) => ({
      title: categoryName,
      data: accounts,
    }));
  }, [accountsDB]);

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
    <>
      <HStack space="sm" className="justify-between border-b" reversed={false}>
        <Box className="h-16 border px-6 flex-col items-center justify-center">
          <Text size="xl">Accounts</Text>
          <Text className="text-black">{accountsDB?.length || 0}</Text>
        </Box>
      </HStack>
      <SectionList
        className="h-full"
        sections={groupedAccounts}
        keyExtractor={(item: any) => `${item.id}`}
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-gray-100 px-6 py-3 border-b">
            <Text className="font-semibold text-gray-700 uppercase text-sm">
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item }: { item: any }) => (
          <View className="h-16 px-6 flex-row justify-between items-center border-b bg-white">
            <View className="flex-1">
              <Text className="capitalize font-medium">{item.name}</Text>
              <Text className="text-sm text-gray-500">
                Balance: {item.balance}
              </Text>
            </View>
            <DeleteButton
              type="account"
              db={db}
              item={item}
              table={accountsTable}
            />
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />
    </>
  );
}
