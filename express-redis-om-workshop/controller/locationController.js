import { connection } from "../om/client.js";
import { personRepository } from "../om/person.js";

export const locationOfId = async (req, res) => {
  const id = req.params.id;
  const longitude = Number(req.params.lng);
  const latitude = Number(req.params.lat);

  const locationUpdated = new Date();

  const person = await personRepository.fetch(id);
  person.location = { longitude, latitude };
  person.locationUpdated = locationUpdated;
  const result = await personRepository.save(person);

  let keyName = `${person.keyName}:locationHistory`;
  console.log(keyName);
  await connection.xAdd(keyName, "*", person.location);

  res.status(200).json({
    id,
    locationUpdated,
    location: { longitude, latitude },
  });
};
