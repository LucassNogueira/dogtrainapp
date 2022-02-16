const dogsArr = require("./dogdb.json");
let dogId = 2;
module.exports = {
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
    res.status(200).send(dogsArr);
    dogId++;
  },
};
