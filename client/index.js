const dogForm = document.querySelector("#dog-form");
const dogContainer = document.querySelector("#current-dogs");
const getDogsbtn = document.querySelector("#seeallbtn");
let dogBreed = document.querySelector("#dog-selector");
const dogArrCallback = ({ data: Dogs }) => displayDogs(Dogs);
/////////////////////////////////

const deleteDog = (id) => {
  axios.delete(`/api/${id}`).then(dogArrCallback);
};
//
const train = (id) => {
  axios.get(`/api/train/${id}`).then((res) => {
    let level = res.data.level;

    if (level == 1) {
      window.location.href = `/level1.html?dogId=${id}`;
    } else if (level == 2) {
      window.location.href = `/level2.html?dogId=${id}`;
    } else if (level == 3) {
      window.location.href = `/level3.html?dogId=${id}`;
    } else if (level == 4) {
      window.location.href = `/level4.html?dogId=${id}`;
    } else if (level == 5) {
      window.location.href = `/level5.html?dogId=${id}`;
    }
  });
};
//
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
////////////////////////////////
////////////////////////////////
const createDog = (body) => {
  axios.post(`/api/adddog`, body).then((res) => {
    const data = res.data;
    dogContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      createDogCard(data[i]);
    }
  });
};

////////////CREATING DOG CARD////////

function createDogCard(newDog) {
  const dogCard = document.createElement("div");
  dogCard.classList.add("dog-card");
  dogCard.innerHTML = `<img alt='dog cover image' src=${newDog.imageURL} class="dog-cover-image"/>
  <h3 class="name">${newDog.name}</h3>
  <p class="breed">${newDog.breed}</p>
  <p class="skill">Level: ${newDog.level}</p>
  <div class="train-btn"><button id="train-btn" onclick="train(${newDog.id})">train ${newDog.name}</button>
  <button id="remove-btn" onclick="deleteDog(${newDog.id})">Remove ${newDog.name}</button><div>
  `;

  dogContainer.appendChild(dogCard);
}
////////////////////////////////
getDogsbtn.addEventListener("click", getAllDogs);

function submitHandler(e) {
  e.preventDefault();

  let dogName = document.querySelector("#dog-name");
  let dogLevel = document.querySelector("input[name=skill-level]:checked");
  let imageURL = document.querySelector("#img");
  let bodyObj = null;
  if (imageURL.value.length === 0) {
    console.log("hit1");
    axios
      .get(`https://dog.ceo/api/breed/${dogBreed.value}/images/random`)
      .then((res) => {
        bodyObj = {
          name: dogName.value,
          breed: dogBreed.value,
          level: dogLevel.value,
          imageURL: res.data.message,
        };

        handleres();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("hit2");
    bodyObj = {
      name: dogName.value,
      breed: dogBreed.value,
      level: dogLevel.value,
      imageURL: imageURL.value,
    };
    handleres();
  }
  function handleres() {
    createDog(bodyObj);
    closeForm();
    location.href = "alldogs.html";
  }
}

//
// FORM FUNCTION
function openForm() {
  document.getElementById("adddog").style.display = "block";
}
function closeForm() {
  document.getElementById("adddog").style.display = "none";
}

// MENU STUFF //
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
  menuLinks.addEventListener("click", () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
  });
});

dogForm.addEventListener("submit", submitHandler);
