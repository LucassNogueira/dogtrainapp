const dogsArr = require('./dogdb.json')


module.exports = {
  getDogs: (req, res) => {
    let dogs = []
    for (i = 0; i < dogsArr.length; i++) {
      dogs.push(dogsArr[i])
    }
    res.status(200).send(dogs)
    },

    createDog: (req, res) => {
        console.log
      
    }
    res.status(200).send(req.body);
    }
}




