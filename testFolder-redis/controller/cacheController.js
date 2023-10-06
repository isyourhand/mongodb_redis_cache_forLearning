import { Album } from "../models-mongodb/albumModel-M.js";

export const getAlbum_c = async (req, res) => {
  try {
    console.log(req.params);
    // mongoose
    const query = Album.find({ artist: /^LYX/ })
      .cache()
      .where("outOfPublication")
      .equals(Boolean(req.params.isPublication))
      .limit(+req.params.limit);

    const album = await query;

    res.status(200).json({
      data: album,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const updateAlbum_m = async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!album) {
    res.status(400).send("No such album.");
  }

  res.status(200).json({
    status: "success",
    data: {
      album,
    },
  });
};

// 这里是
// export const getAlbum_c = async (req, res) => {
//   try {
//     console.log(req.params);
//     // mongoose
//     const query = Album.find({ artist: /^LYX/ })
//       .where("outOfPublication")
//       .equals(Boolean(req.params.isPublication))
//       .limit(+req.params.limit);

//     // Set the 'redisKey' first.
//     const redisKey = JSON.stringify({
//       ...query.getOptions(),
//       ...query.getQuery(),
//       collection: query.mongooseCollection.name,
//     });

//     // Check if there is a corresponding value for the redisKey.
//     const cacheValue = await redis.get(redisKey);

//     // If the cacheValue does not exist, then perform a MongoDB query and store it in Redis.
//     if (!cacheValue) {
//       // mongoose
//       const album = await query;

//       // redis
//       await redis.set(redisKey, JSON.stringify(album));

//       let album_redis = await redis.get(redisKey);
//       album_redis = JSON.parse(album_redis);
//       // Determine whether the variable is an array or an object.
//       if (Array.isArray(album_redis)) {
//         console.log(1);
//         album_redis = album_redis.map((album) => new query.model(album));
//       } else {
//         console.log(2);
//         album_redis = new query.model(album_redis);
//       }

//       console.log(album_redis);
//       console.log(album);
//       console.log(album_redis == album);

//       res.status(200).json({
//         data: album,
//       });
//     } else {
//       // If the cacheValue exist, then send it to client.
//       res.status(200).json({
//         data: JSON.parse(cacheValue),
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// };
