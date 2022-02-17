const comeCmmd = document.querySelector("#come-command");
const sitCmmd = document.querySelector("#sit-command");
const shakeCmmd = document.querySelector("#shake-command");
const levelUpBtn = document.querySelector("#level-up");
const comeCnt = document.querySelector("#come-cnt");
const sitCnt = document.querySelector("#sit-cnt");
const shakeCnt = document.querySelector("#shake-cnt");

/*comeCmmd
sitCmmd
shakeCmmd
levelUpBtn
variables for level 1*/
const comeCommand = () => {
  const comeCard = document.createElement("div");
  comeCard.classList.add("come-card");
  comeCnt.innerHTML = "";
  comeCard.innerHTML = `<p class="come-p">For come, simply put your dog on a leash and say the command while you tug lightly on their leash. When he or she comes to you, reward them with a treat. This direction will take consecutive days of training, so be patient.</p><button onclick="removeCome()">Close</button>`;

  comeCnt.appendChild(comeCard);
};
comeCmmd.addEventListener("click", comeCommand);
const removeCome = () => {
  comeCnt.innerHTML = "";
};
///////////////////////////////////////////////
////////////////////////////////////

////////////////////////////////
const sitCommand = () => {
  const sitCard = document.createElement("div");
  sitCard.classList.add("sit-card");
  sitCnt.innerHTML = "";
  sitCard.innerHTML = `<p class="sit-p"> Hold a treat close to your dog's nose. Move your hand up, allowing his head to follow the treat and causing his bottom to lower. Once he's in sitting position, say “Sit,” give him the treat, and share affection.</p><button onclick="removeSit()">Close</button>`;

  sitCnt.appendChild(sitCard);
};
sitCmmd.addEventListener("click", sitCommand);
const removeSit = () => {
  sitCnt.innerHTML = "";
};
//
const shakeCommand = () => {
  const shakeCard = document.createElement("div");
  shakeCard.classList.add("shake-card");
  shakeCnt.innerHTML = "";
  shakeCard.innerHTML = `<p class="sit-p"> Hold a treat close to your dog's nose. Move your hand up, allowing his head to follow the treat and causing his bottom to lower. Once he's in sitting position, say “Sit,” give him the treat, and share affection.</p><button onclick="removeShake()">Close</button>`;

  shakeCnt.appendChild(shakeCard);
};
shakeCmmd.addEventListener("click", shakeCommand);
const removeShake = () => {
  shakeCnt.innerHTML = "";
};

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
const incLevel = () => {
  let dogId = window.location.href.substring(window.location.href.length - 1);
  axios
    .put(`/api/level/${dogId}`)
    .then((res) => {
      window.location.href = `http://localhost:5500/level${res.data.level}.html?dogId=${res.data.dogId}`;
    })
    .catch((err) => console.log(err));
};

levelUpBtn.addEventListener("click", incLevel);
