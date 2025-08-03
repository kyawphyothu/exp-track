import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
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
import { currenciesTable, Currency } from "@/db/schema";
import { deleteRecord } from "@/libs/actions";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

export default function CurrencyList() {
  const [search] = useState("");
  const [showModal, setShowModal] = useState(false);

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
                  Delete currency
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
                  Are you sure to delete this currency?
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
                    deleteRecord(db, item.code, setShowModal);
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
  );
}
