import { faker } from "@faker-js/faker";
import { config } from "@/utils/config";
import { setupDB, teardownDB } from "./setup";
import { users } from "./schema";

async function run() {
  try {
    const { db, client } = await setupDB(config.DATABASE_URL);

    // insert users
    await Promise.all(
      Array.from({ length: 100 }, () =>
        db.insert(users).values({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          isActive: Math.random() < 0.5,
        })
      )
    );

    await teardownDB(client);

    console.log("seed db successfully");
  } catch (error) {
    console.log("failed to run seeding: ", error);
  }

  process.exit(0);
}

run();
