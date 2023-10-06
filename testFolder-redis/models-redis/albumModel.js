import { Schema } from "redis-om";
import { Repository } from "redis-om";
import redis from "../om/client.js";

const albumSchema = new Schema(
  "album",
  {
    artist: { type: "string" },
    title: { type: "text" },
    year: { type: "number", sortable: true },
    genres: { type: "string[]" },
    songDurations: { type: "number[]" },
    outOfPublication: { type: "boolean" },
  },
  {
    dataStructure: "JSON",
  }
);

export const albumRepository = new Repository(albumSchema, redis);

await albumRepository.createIndex();
