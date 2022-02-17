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
      window.location.href = `/level${res.data.level}.html?dogId=${res.data.dogId}`;
    })
    .catch((err) => console.log(err));
};

// levelUpBtn.addEventListener("click", incLevel);

const Confirm = {
  open(options) {
    options = Object.assign(
      {},
      {
        title: "",
        message: "",
        okText: "OK",
        cancelText: "Cancel",
        onok: function () {},
        oncancel: function () {},
      },
      options
    );
    const html = `
        <div class="confirm">
          <div class="confirm__window">
            <div class="confirm__titlebar">
              <span class="confirm__title">Are you sure you want to level up</span>
              <button class="confirm__close">&times;</button>
            </div>
            <div class="confirm__content">
              Leveling up is a big deal, you want to make sure your pup is
              responding to all commands previously listed with excitement and not
              needing to be given a treat.
            </div>
            <div class="confirm__buttons">
              <button
                class="confirm__button confirm__button--ok confirm__button--fill"
              >
                Level up!
              </button>
              <button class="confirm__button confirm__button--cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
    `;
    const template = document.createElement("template");
    template.innerHTML = html;
    const confirmEl = template.content.querySelector(".confirm");
    const btnClose = template.content.querySelector(".confirm__close");
    const btnOk = template.content.querySelector(".confirm__button--ok");
    const btnCancel = template.content.querySelector(
      ".confirm__button--cancel"
    );

    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", () => {
      options.onok();
      this._close(confirmEl);
    });

    [btnCancel, btnClose].forEach((el) => {
      el.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmEl);
      });
    });

    document.body.appendChild(template.content);
  },

  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");
    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  },
};

document.querySelector("#level-up").addEventListener("click", () => {
  Confirm.open({
    title: "Leveling up",
    message: "Are you sure you want to level up?",
    onok: () => {
      incLevel();
    },
    oncancel: () => {},
  });
});
