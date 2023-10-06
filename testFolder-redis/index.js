import { createClient } from "redis";

const redis = createClient({ url: "redis://localhost:10001" });
redis.on("error", (err) => console.log("Redis Client Error", err));
await redis.connect();

// const setString = await redis.set("key_1", "value_");
const getString = await redis.get("key_11");

await redis.set("key", "value__", {
  EX: 50, // 设置几秒后过期
  NX: true, // 设置key不重复时才存储进redis
});

if (getString) {
  console.log(`serving from cache -> ${getString}`);
} else {
  console.log(`serving from Mongodb -> ${getString}`);
}

// const setHash = await redis.hSet("foo", "alfa", "42", "bravo", "23");
const getHash = await redis.hGetAll("foo");

await redis.disconnect();
