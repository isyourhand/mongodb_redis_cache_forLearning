import mongoose from "mongoose";
import redis from "../om/client.js";

// 覆写函数 -----------------------------------------------

// cache
mongoose.Query.prototype.cache = function (option = {}) {
  this.useCache = true;

  // 以hash格式存储在redis中。
  this.isHash = true;
  this.hashKey = JSON.stringify(option.key || "");

  return this;
};

// exec
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  // 是否以hash格式存储进
  if (this.isHash) {
    // Set the 'redisKey' first.
    const redisKey = JSON.stringify({
      ...this.getOptions(),
      ...this.getQuery(),
      collection: this.mongooseCollection.name,
    });

    const cacheValue = JSON.parse(await redis.hGet(this.hashKey, redisKey));

    if (cacheValue) {
      console.log("Already caching in as hash, take data from redis...");
      cacheValue.map((album) => new this.model(album));

      return cacheValue;
    }

    console.log(
      "New query, save the query result into redis as hash and return..."
    );
    const result = await exec.apply(this, arguments);
    await redis.hSet(this.hashKey, redisKey, JSON.stringify(result));

    return result;
  }

  // Set the 'redisKey' first.
  const redisKey = JSON.stringify({
    ...this.getOptions(),
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  const cacheValue = JSON.parse(await redis.get(redisKey));

  //console.log(cacheValue);

  if (cacheValue) {
    console.log("Already caching in, take data from redis...");
    cacheValue.map((album) => new this.model(album));

    return cacheValue;
  }

  console.log("New query, save the query result into redis and return...");
  const result = await exec.apply(this, arguments);
  await redis.set(redisKey, JSON.stringify(result));
  return result;
};

// 设置Model ---------------------------------------------

const { Schema } = mongoose;

// 我估摸着，应该可以在这里修改exec

const albumSchema = new Schema({
  artist: String,
  title: String,
  year: { type: Date, default: Date.now },
  genres: [String],
  songDurations: [Number],
  outOfPublication: Boolean,
});

albumSchema.pre(/^find/, async function (next) {
  console.log("Im gonna to do a quary.");
  return "1";
});

export const Album = mongoose.model("Album", albumSchema);

// Cache only needed on query, so there is no ceed to save the document.
// The sentence above was wrong. To implement caching effectively, Redis needs to intercept not only queries but also creations.

/* 
    artist: { type: "string" },
    title: { type: "text" },
    year: { type: "number", sortable: true },
    genres: { type: "string[]" },
    songDurations: { type: "number[]" },
    outOfPublication: { type: "boolean" },
*/

export const clearHash = function (hashKey) {
  redis.del(JSON.stringify(hashKey));
};
