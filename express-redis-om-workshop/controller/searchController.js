import { Circle } from "redis-om";
import { personRepository } from "../om/person.js";

export const searchAll = async (req, res) => {
  const persons = await personRepository.search().return.all();
  res.send(persons);
};

export const searchByLastname = async (req, res) => {
  const lastName = req.params.lastName;
  const persons = await personRepository
    .search()
    .where("lastName")
    .equals(lastName)
    .return.all();
  // console.log(persons);
  res.send(persons);
};

export const searchByAge = async (req, res) => {
  const persons = await personRepository
    .search()
    .where("age")
    .gte(21)
    .return.all();
  res.send(persons);
};

export const isVerified = async (req, res) => {
  const persons = await personRepository
    .search()
    .where("verified")
    .is.not.true()
    .return.all();
  res.send(persons);
};

export const isVerifiedAndGte21 = async (req, res) => {
  const lastName = req.params.lastName;
  const persons = await personRepository
    .search()
    .where("verified")
    .is.true()
    .and("age")
    .gte(21)
    .and("lastName")
    .equals(lastName)
    .return.all();
  res.send(persons);
};

const isStatementContaining = async (req, res) => {
  const text = req.params.text;
  const persons = await personRepository
    .search()
    .where("personalStatement")
    .matches(text)
    .return.all();
  res.send(persons);
};

export const searchByLocation = async (req, res) => {
  const longtitude = Number(req.params.lng);
  const latitude = Number(req.params.lat);
  const radius = Number(req.params.radius);

  const persons = await personRepository
    .search()
    .where("location")
    .inRadius(
      (Circle) =>
        Circle.longitude(longtitude).latitude(latitude).radius(radius).miles
    )
    .return.all();

  res.status(200).json({
    status: "success",
    length: persons.length,
    data: {
      data: persons,
    },
  });
};

const searchController = {
  searchAll,
  searchByLastname,
  searchByAge,
  isVerified,
  isVerifiedAndGte21,
  isStatementContaining,
  searchByLocation,
};

export default searchController;
