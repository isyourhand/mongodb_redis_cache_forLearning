import { Entity, Schema } from "redis-om";
import client from "./client.js";

/* our entity */
class Person extends Entity {}

/* create a Schema for Person */
const personSchema = new Schema(Person, {
  firstName: { type: "string" },
  lastName: { type: "string" },
  age: { type: "number" },
  verified: { type: "boolean" },
  location: { type: "point" },
  localStorage: { type: "date" },
  skills: { type: "string[]" },
  personalStatement: { type: "text" },
});

let point = { longitude: 12.34, latitude: 56.78 };

/* use the client to create a Repository just for Persons */
export const personRepository = client.fetchRepository(personSchema);

/* create the index for Person */
await personRepository.createIndex();
