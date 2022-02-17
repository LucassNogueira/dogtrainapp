const dogsArr = require("./dogdb.json");
const path = require("path");
let dogId = 3;
module.exports = {
  getDogs: (req, res) => {
    res.status(200).send(dogsArr);
  },
  createDog: (req, res) => {
    let { name, breed, level, imageURL } = req.body;
    let newDog = {
      id: dogId,
      name: name,
      breed: breed,
      level: level,
      imageURL: imageURL,
    };
    dogsArr.push(newDog);
    dogId++;
    res.status(200).send(dogsArr);
  },
  increaseLevel: (req, res) => {
    const dogId = +req.params.dogId;
    let index = dogsArr.findIndex((dogObj) => {
      return dogObj.id === dogId;
    });
    dogsArr[index].level++;
    let newLevel = dogsArr[index].level;
    res.status(200).send({
      dogId: dogId,
      level: dogsArr[index].level,
    });
  },
  deleteDog: (req, res) => {
    const dogId = +req.params.dogId;
    let index = dogsArr.findIndex((dogObj) => +dogObj.id === dogId);
    dogsArr.splice(index, 1);
    res.status(200).send(dogsArr);
  },
};
