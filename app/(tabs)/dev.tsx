import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useDatabase } from "@/context/DatabaseContext";
import { currenciesTable, Currency, Income, incomesTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function DevScreen(){
  const { db, isReady, error } = useDatabase()
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if(isReady){
      fetchData();
    }
  }, [isReady])

  const fetchData = async () => {
    try {
      const resultCurrency = await db.select().from(currenciesTable);
      const resultIncome = await db.select().from(incomesTable).limit(2);
      setCurrencies(resultCurrency)
      setIncomes(resultIncome)
    } catch (e) {
      console.log("Error Fetch currency: ", e);
    }
  }

  const resetDatabase = async () => {
    try{
      await db.run(sql`DROP TABLE IF EXISTS expenses`);
      await db.run(sql`DROP TABLE IF EXISTS incomes`);
      await db.run(sql`DROP TABLE IF EXISTS accounts`);
      await db.run(sql`DROP TABLE IF EXISTS expense_categories`);
      await db.run(sql`DROP TABLE IF EXISTS income_categories`);
      await db.run(sql`DROP TABLE IF EXISTS account_categories`);
      await db.run(sql`DROP TABLE IF EXISTS currencies`);

      await db.run(sql`DROP TABLE IF EXISTS __drizzle_migrations`);

      console.log('✅ All tables dropped successfully');
      fetchData();
      Alert.alert("Success", "Reset Database Successfully, please Refresh")
      return true;
    }catch(e) {
      console.log("Error reset database: ", e)
    }
  }

  const seedAdditionalData = async () => {
    try {
      setIsSeeding(true);
      console.log('🌱 Seeding additional data...');

      await db.run(sql`DELETE FROM expenses`);
      await db.run(sql`DELETE FROM incomes`);
      await db.run(sql`DELETE FROM accounts`);

      // Reset auto-increment counters (optional)
      await db.run(sql`DELETE FROM sqlite_sequence WHERE name IN ('expenses', 'incomes', 'accounts')`);

      // Insert Accounts
      await db.run(sql`
        INSERT INTO accounts (name, balance, category_id, currency_id) VALUES
        ('Cash Wallet MMK', 150000.00, 1, 2),
        ('KBZ Bank Current', 850000.00, 2, 2),
        ('Cash Wallet USD', 500.00, 1, 1),
        ('CB Bank Savings', 2500000.00, 2, 2),
        ('USD Savings Account', 2000.00, 2, 1),
        ('VND Travel Cash', 2500000.00, 1, 3),
        ('Bitcoin Wallet', 0.05, 3, 1),
        ('Ethereum Wallet', 1.2, 3, 1)
      `);

      // Insert Income Records
      await db.run(sql`
        INSERT INTO incomes (amount, date, description, account_id, category_id) VALUES
        (1200000.00, strftime('%s', '2025-01-30'), 'January Salary', 2, 1),
        (800000.00, strftime('%s', '2025-01-15'), 'Freelance Payment', 2, 1),
        (50000.00, strftime('%s', '2025-01-20'), 'Pocket Money from Parents', 1, 2),
        (150000.00, strftime('%s', '2025-01-13'), 'Bonus Pocket Money', 1, 2),
        (1100000.00, strftime('%s', '2025-01-27'), 'Consulting Work', 4, 1),
        (25000.00, strftime('%s', '2025-01-07'), 'Weekly Allowance', 3, 2),
        (75000.00, strftime('%s', '2025-01-14'), 'Extra Pocket Money', 1, 2),
        (1050000.00, strftime('%s', '2025-01-21'), 'Side Project', 2, 1),
        (30000.00, strftime('%s', '2025-01-28'), 'Birthday Money', 1, 2),
        (200.00, strftime('%s', '2025-01-04'), 'USD Pocket Money', 5, 2)
      `);

      // Insert Expense Records
      await db.run(sql`
        INSERT INTO expenses (amount, date, description, account_id, category_id) VALUES
        (300000.00, strftime('%s', '2025-01-30'), 'Monthly Rent', 2, 1),
        (25000.00, strftime('%s', '2025-01-30'), 'Lunch at Restaurant', 1, 2),
        (15000.00, strftime('%s', '2025-01-30'), 'Bus Fare', 1, 3),
        (280000.00, strftime('%s', '2025-01-29'), 'Apartment Rent', 4, 1),
        (35000.00, strftime('%s', '2025-01-29'), 'Dinner with Friends', 1, 2),
        (20000.00, strftime('%s', '2025-01-29'), 'Taxi to Work', 1, 3),
        (300000.00, strftime('%s', '2025-01-28'), 'Office Rent', 2, 1),
        (18000.00, strftime('%s', '2025-01-28'), 'Coffee Shop', 1, 2),
        (12000.00, strftime('%s', '2025-01-28'), 'Metro Card', 1, 3),
        (250000.00, strftime('%s', '2025-01-27'), 'House Rent', 4, 1),
        (40000.00, strftime('%s', '2025-01-27'), 'Grocery Shopping', 1, 2),
        (25000.00, strftime('%s', '2025-01-27'), 'Grab Ride', 1, 3),
        (320000.00, strftime('%s', '2025-01-26'), 'Studio Rent', 2, 1),
        (22000.00, strftime('%s', '2025-01-26'), 'Street Food', 1, 2),
        (8000.00, strftime('%s', '2025-01-26'), 'Bus Ticket', 1, 3),
        (275000.00, strftime('%s', '2025-01-25'), 'Shop Rent', 4, 1),
        (30000.00, strftime('%s', '2025-01-25'), 'Restaurant Bill', 1, 2),
        (18000.00, strftime('%s', '2025-01-25'), 'Motorcycle Taxi', 1, 3),
        (290000.00, strftime('%s', '2025-01-24'), 'Warehouse Rent', 2, 1),
        (28000.00, strftime('%s', '2025-01-24'), 'Fast Food', 1, 2)
      `);

      console.log('✅ Additional data seeded successfully');

      // Refresh currencies display
      await fetchData();

      Alert.alert('Success', 'Additional data has been seeded successfully!');

    } catch (e) {
      console.error('Error seeding additional data:', e);
      Alert.alert('Error', 'Failed to seed additional data');
    } finally {
      setIsSeeding(false);
    }
  }

  if(!isReady) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <Text>Migration is not ready yet</Text>
      </ThemedView>
    )
  }

  if(error){
    return (
      <ThemedView style={{ flex: 1 }}>
        <Text>Migration error.</Text>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <VStack className="mx-2 my-3 gap-4">
        {
          currencies.length < 1 ? (
            <Box>
              <Text className="text-warning-500">No currencies Data.</Text>
            </Box>
          ) : (
            <>
              {
                currencies.map(i => (
                  <Box key={i.code}>
                    <Text>{i.name}</Text>
                  </Box>
                ))
              }
            </>
          )
        }
        {
          incomes.length < 1 ? (
            <Box>
              <Text className="text-warning-500">No income Data.</Text>
            </Box>
          ) : (
            <>
              {
                incomes.map(i => (
                  <Box key={i.id}>
                    <Text>{i.amount}</Text>
                  </Box>
                ))
              }
            </>
          )
        }
        <Button variant="solid" size="md" action="negative" onPress={() => {
          console.log("Reset")
          resetDatabase();
        }}>
          <ButtonText>Reset</ButtonText>
        </Button>
        <Button
          action="secondary"
          onPress={() => {
            seedAdditionalData();
          }}
          disabled={isSeeding}
        >
          <ButtonText>
            {isSeeding ? "Seeding..." : "Seed Additional Data"}
          </ButtonText>
        </Button>
      </VStack>
    </ThemedView>
  )
}