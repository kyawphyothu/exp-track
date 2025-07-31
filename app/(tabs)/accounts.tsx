import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { useDatabase } from "@/context/DatabaseContext";
import { Account, accountsTable } from "@/db/schema";
import { deleteAccount } from "@/libs/actions";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export default function AccountsScreen() {
  const [showModal, setShowModal] = useState(false);

  const { db, isReady, error } = useDatabase();

  const { data: accountsDB } = useLiveQuery(db.select().from(accountsTable));

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
    <View>
      <HStack space="sm" className="justify-between border-b" reversed={false}>
        <Box className="h-20 w-40 flex-col items-center justify-center">
          <Text size="xl">Accounts</Text>
          <Text className="text-green-400">99</Text>
        </Box>

        <Box className="h-20 w-40 flex-col items-center justify-center">
          <Text size="xl">Total</Text>
          <Text>9999</Text>
        </Box>
      </HStack>
      <FlatList
        data={accountsDB}
        keyExtractor={(item: Account) => `${item.id}`}
        renderItem={({ item }: { item: Account }) => (
          <View className="h-20 px-2 py-4 flex-row items-center border-b">
            <Text className="capitalize" style={{ flex: 1 }}>
              {item.name}
            </Text>
            <Button
              variant="outline"
              className="border"
              onPress={() => setShowModal(true)}
            >
              <ButtonText>
                <IconSymbol name="trash" size={20} color="#e53935" />
              </ButtonText>
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              size="md"
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="md" className="text-typography-950">
                    Delete account
                  </Heading>
                  <ModalCloseButton>
                    <Icon
                      as={CloseIcon}
                      size="md"
                      className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                    />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                  <Text size="sm" className="text-typography-500">
                    Are you sure to delete this account?
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    <ButtonText>No</ButtonText>
                  </Button>
                  <Button
                    onPress={() => {
                      deleteAccount(db, item.id, setShowModal);
                    }}
                  >
                    <ButtonText>Yes</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </View>
        )}
      />
    </View>
  );
}
