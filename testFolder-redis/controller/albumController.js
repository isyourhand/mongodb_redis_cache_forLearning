import { albumRepository } from "../models-redis/albumModel.js";
import { EntityId } from "redis-om";

export const getAlbums = async (req, res) => {
  try {
    const albums = await albumRepository.search().return.all();

    res.status(200).json({
      length: albums.length,
      id: albums[EntityId],
      data: albums,
    });
  } catch (err) {
    console.log(`${err}`);

    return res.status(400).send(`Save Data error------>\n${err}`);
  }
};

export const getAlbumAndPage = async (req, res) => {
  try {
    const offset = 1; // From which position to start fetching.
    const count = 3; // How many documents need to fetch.
    const albums = await albumRepository.search().return.page(offset, count);

    res.status(200).json({
      length: albums.length,

      data: albums,
    });
  } catch (err) {
    console.log(`${err}`);

    return res.status(400).send(`${err}`);
  }
};

export const getAlbumById = async (req, res) => {
  try {
    // Do we have any cached data in redis related to this query.
    //const cachedBlogs = client.get();
    // if yes, then respond to the request right away and return.

    //if no, we need to respond to request and update our cache to store the data.

    const album = await albumRepository.fetch(req.params.id);
    console.log(Boolean(Object.values(album)));
    delete album.artist; // we can delete properties using "delete".

    res.status(200).json({
      length: album.length,
      id: album[EntityId],
      data: album,
    });
  } catch (err) {
    console.log(`${err}`);

    return res.status(400).send(`Save Data error------>\n${err}`);
  }
};

export const getAlbumsAndSortByYear = async (req, res) => {
  try {
    console.log(11);
    const albumsByYear = await albumRepository
      .search()

      .sortAscending("year")
      .return.all();
    res.status(200).json({
      data: albumsByYear,
    });
  } catch (err) {
    return res.status(400).send(`${err}`);
  }
};

export const saveAlbum = async (req, res) => {
  try {
    const album = await albumRepository.save(req.body);
    res.status(200).json({
      id: album[EntityId],
      data: album,
    });
  } catch (err) {
    console.log(`${err}`);

    return res.status(400).send(`Save Data error------>\n${err}`);
  }
};
