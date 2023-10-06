import { personRepository } from "../om/person.js";

export const savePerson = async (req, res) => {
  const person = await personRepository.createAndSave(req.body);
  // console.log(req.body);
  res.send(person);
};

export const getPerson = async (req, res) => {
  const person = await personRepository.fetch(req.params.id);
  res.send(person);
};

export const updatePerson = async (req, res) => {
  const person = await personRepository.fetch(req.params.id);

  person.firstName = req.body.firstName ?? null; // ??: 确定变量是否为null 或 undefined
  person.lastName = req.body.lastName ?? null;
  person.age = req.body.age ?? null;
  person.verified = req.body.verified ?? null;
  person.location = req.body.location ?? null;
  person.locationUpdated = req.body.locationUpdated ?? null;
  person.skills = req.body.skills ?? null;
  person.personlStatement = req.body.personlStatement ?? null;

  await personRepository.save(person);

  res.send(person);
};

export const deletePerson = async (req, res) => {
  await personRepository.remove(req.params.id);
  res.send({ entityId: req.params.id });
};
