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
comeCommand = () => {
  console.log("hit");
  const comeCard = document.createElement("div");
  comeCard.classList.add("come-card");
  comeCard.innerHTML = `<p class="come-p">For come, simply put your dog on a leash and say the command while you tug lightly on their leash. When he or she comes to you, reward them with a treat. This direction will take consecutive days of training, so be patient.</p>`;

  comeCnt.appendChild(comeCard);
};
comeCmmd.addEventListener("click", comeCommand);

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
