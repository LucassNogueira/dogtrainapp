const dogForm = document.querySelector("#dog-form");

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
    level: dogLevel.value,
    imageURL: imageURL.value,
  };

  createHouse(bodyObj);

  dogName.value = "";
  dogBreed.value = "";
  dogLevel.value = "";
  imageURL.value = "";
}

form.addEventListener("submit", submitHandler);
