const dogForm = document.querySelector("#dog-form");
const dogContainer = document.querySelector("#current-dogs");
const getDogsbtn = document.querySelector("#seeallbtn");
const dogArrCallback = ({ data: Dogs }) => displayDogs(Dogs);
/////////////////////////////////
const deleteDog = (id) => {
  axios.delete(`/api/${id}`).then(dogArrCallback);
};
//
const train = (id) => {
  axios.get(`/api/train/${id}`).then((res) => {
    let level = res.data.level;
    // console.log(level);
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

//////////////////ADDING IMAGE//////////////////////////
const imageInput = document.querySelector("#imageInput");
let uploadedImage;

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.querySelector(
      "#displayImage"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
});
////////////CREATING DOG CARD////////
function createDogCard(newDog) {
  const dogCard = document.createElement("div");
  dogCard.classList.add("dog-card");
  dogCard.innerHTML = `<img alt='dog cover image' src=${newDog.imageURL} class="dog-cover-image"/>
  <h3 class="name">Dog Name: ${newDog.name}</h3>
  <p class="breed">Breed: ${newDog.breed}</p>
  <p class="skill">Level: ${newDog.level}</p>
  <div class="train-btn"><button id="train-btn" onclick="train(${newDog.id})">train ${newDog.name}</button>
  <button id="remove-btn" onclick="deleteDog(${newDog.id})">Remove ${newDog.name}</button><div>
  `;

  dogContainer.appendChild(dogCard);
}
////////////////////////////////
getDogsbtn.addEventListener("click", getAllDogs);

/// processing submit data ////
function submitHandler(e) {
  e.preventDefault();

  let dogName = document.querySelector("#dog-name");
  let dogBreed = document.querySelector("#dog-selector");
  let dogLevel = document.querySelector(
    "input[name=skill-level]:checked"
  ).value;
  let bodyObj = {
    name: dogName.value,
    breed: dogBreed.value,
    level: dogLevel,
    imageURL: "",
  };
  axios
    .get(`https://dog.ceo/api/breed/${dogBreed.value}/images/random`)
    .then((res) => {
      bodyObj.imageURL = res.data.message;
      // console.log(bodyObj);
      createDog(bodyObj);
    })
    .catch((err) => {
      console.log(err);
    });

  closeForm();
}
dogForm.addEventListener("submit", submitHandler);

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
