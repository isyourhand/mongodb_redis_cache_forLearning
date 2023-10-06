import { Album } from "../models/albumModel.js";

export const createAlbum = async (req, res) => {
  try {
    const newAlbum = await Album.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newAlbum,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failure",
    });
  }
};

export const getAlbum = async (req, res) => {
  try {
    const query = Album.find({ artist: /^LYX/ })
      .where("outOfPublication")
      .equals(true)
      .limit(1);

    const album = await query;
    console.log(1, query.redisKey); // 用这玩意做redis中的key？

    res.status(200).json({
      album,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
    });
  }
};
