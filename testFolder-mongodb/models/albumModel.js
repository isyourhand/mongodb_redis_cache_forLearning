import mongoose from "mongoose";

const { Schema } = mongoose;

const albumSchema = new Schema({
  artist: { type: String, unique: true },
  title: String,
  year: { type: Date, default: Date.now },
  genres: [String],
  songDurations: [Number],
  outOfPublication: Boolean,
});

albumSchema.pre(/^find/, function (next) {
  const collection = this.mongooseCollection.name;

  this.redisKey = JSON.stringify({
    ...this.getOptions(),
    ...this.getQuery(),
    collection,
  });
  console.log("Im gonna to do a quary.");
  next();
});

export const Album = mongoose.model("Album", albumSchema);

/* 
    artist: { type: "string" },
    title: { type: "text" },
    year: { type: "number", sortable: true },
    genres: { type: "string[]" },
    songDurations: { type: "number[]" },
    outOfPublication: { type: "boolean" },
*/
