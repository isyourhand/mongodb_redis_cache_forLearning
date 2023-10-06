import { Schema } from "redis-om";
import { Repository } from "redis-om";

const studioSchema = new Schema(
  "studio",
  {
    name: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    location: { type: "point" },
    established: { type: "date" },
  },
  {
    dataStructure: "JSON",
  }
);

export const studioRepository = new Repository(studioSchema, redis);
