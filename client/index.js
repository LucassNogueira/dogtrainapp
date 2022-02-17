const dogForm = document.querySelector("#dog-form");
const dogContainer = document.querySelector("#current-dogs");
const getDogsbtn = document.querySelector("#seeallbtn");
/////////////////////////////////
const dogArrCallback = ({ data: Dogs }) => displayDogs(Dogs);
//
//
const deleteDog = (id) => {
  axios.delete(`/api/${id}`).then(dogArrCallback);
};
const getAllDogs = () => {
  axios
    .post("/dogs")
    .then(dogArrCallback)
    .catch((err) => console.log(err));
};
function displayDogs(arr) {
  dogContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createDogCard(arr[i]);
  }
}

function createDogCard(newDog) {
  const dogCard = document.createElement("div");
  dogCard.classList.add("dog-card");
  dogCard.innerHTML = `<img alt='dog cover image' src=${newDog.imageURL} class="dog-cover-image"/>
  <p class="name">Dog Name: ${newDog.name}</p>
  <p class="breed">Breed: ${newDog.breed}</p>
  <p class="skill">Level: ${newDog.level}</p>
  <div class="train-btn"><button id="train-btn" >train ${newDog.name}</button>
  <button id="remove-btn" onclick="deleteDog(${newDog})">Remove ${newDog.name}</button><div>
  `;

  dogContainer.appendChild(dogCard);
  const trainBtn = document.querySelector("#train-btn");
  trainBtn.addEventListener("click", () => {
    let level = newDog.level;
    if (level == 1) {
      window.location.href = `http://localhost:5500/level1.html?dogId=${newDog.id}`;
    } else if (level == 2) {
      window.location.href = `http://localhost:5500/level2.html?dogId=${newDog.id}`;
    } else if (level == 3) {
      window.location.href = `http://localhost:5500/level3.html?dogId=${newDog.id}`;
    } else if (level == 4) {
      window.location.href = `http://localhost:5500/level4.html?dogId=${newDog.id}`;
    } else if (level == 5) {
      window.location.href = `http://localhost:5500/level5.html?dogId=${newDog.id}`;
    }
  });
}

////////////////////////////////
////////////////////////////////
const createDog = (body) => {
  axios.post(`/api/adddog`, body).then((res) => {
    const data = res.data;
    alert("New pup added!");
    dogContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      createDogCard(data[i]);
    }
  });
};
////////////////////////////////
getDogsbtn.addEventListener("click", getAllDogs);
////////////////////////////////////////////////////////////////

function submitHandler(e) {
  e.preventDefault();

  let dogName = document.querySelector("#dog-name");
  let dogBreed = document.querySelector("#dog-breed");
  let dogLevel = document.querySelector(
    "input[name=skill-level]:checked"
  ).value;
  let imageURL = document.querySelector("#img");

  let bodyObj = {
    name: dogName.value,
    breed: dogBreed.value,
    level: dogLevel,
    imageURL: imageURL.value,
  };

  createDog(bodyObj);

  dogName.value = "";
  dogBreed.value = "";
  dogLevel = null;
  imageURL.value = "";
  closeForm();
}

dogForm.addEventListener("submit", submitHandler);

function createDogCard(newDog) {
  const dogCard = document.createElement("div");
  dogCard.classList.add("dog-card");
  dogCard.innerHTML = `<img alt='dog cover image' src=${newDog.imageURL} class="dog-cover-image"/>
  <p class="name">Dog Name: ${newDog.name}</p>
  <p class="breed">Breed: ${newDog.breed}</p>
  <p class="skill">Level: ${newDog.level}</p>
  <div class="train-btn"><button id="train-btn">train ${newDog.name}</button>
  <button id="remove-btn" onclick="deleteDog(${newDog.id})">Remove ${newDog.name}</button><div>
  `;

  dogContainer.appendChild(dogCard);
  const trainBtn = document.querySelector("#train-btn");
  trainBtn.addEventListener("click", () => {
    let level = newDog.level;
    if (level == 1) {
      window.location.href = `http://localhost:5500/level1.html?dogId=${newDog.id}`;
    } else if (level == 2) {
      window.location.href = `http://localhost:5500/level2.html?dogId=${newDog.id}`;
    } else if (level == 3) {
      window.location.href = `http://localhost:5500/level3.html?dogId=${newDog.id}`;
    } else if (level == 4) {
      window.location.href = `http://localhost:5500/level4.html?dogId=${newDog.id}`;
    } else if (level == 5) {
      window.location.href = `http://localhost:5500/level5.html?dogId=${newDog.id}`;
    }
    // const removeBtn = document.querySelector("#remove-btn");
    // removeBtn.addEventListener("click", () => {
    //   console.log("hit");
    //   axios
    //     .delete(`/api/deletedog/${newDog.id}`)
    //     .then()
    //     .catch((err) => console.log(err));
    // });
  });
}
//
//
function openForm() {
  document.getElementById("adddog").style.display = "block";
}
function closeForm() {
  document.getElementById("adddog").style.display = "none";
}
