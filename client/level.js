const incLevel = () => {
  let dogId = window.location.href.substring(window.location.href.length - 1);
  axios
    .put(`/api/level/${dogId}`)
    .then((res) => {
      window.location.href = `/level${res.data.level}.html?dogId=${res.data.dogId}`;
    })
    .catch((err) => console.log(err));
};

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

////
//////countdown timer///////////////////////
class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.el.reset.addEventListener("click", () => {
      const inputmin = prompt("Enter number of minutes: ");
      if (inputmin < 61) {
        this.stop();
        this.remainingSeconds = inputmin * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minuets = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.el.minutes.textContent = minuets.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) {
      return;
    } else {
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();

        if (this.remainingSeconds === 0) {
          this.stop();
        }
      }, 1000);
    }

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
    <span class="timer__part timer__part--minutes">00</span>
    <span class="timer__part">:</span>
    <span class="timer__part timer__part--seconds">00</span>
    <br>
    
    <button
      type="button"
      class="timer__btn timer__btn--control timer__btn--start"
    >
      <span class="material-icons">play_arrow</span>
    </button>
    <button type="button" class="timer__btn timer__btn--reset">
      <span class="material-icons">timer</span>
    </button>   
    `;
  }
}

new Timer(document.querySelector(".timer"));

const card = document.querySelector("#card1");
card.addEventListener("click", () => {
  card.classList.toggle("flip");
});
const card2 = document.querySelector("#card2");
card2.addEventListener("click", () => {
  card2.classList.toggle("flip");
});
const card3 = document.querySelector("#card3");
card3.addEventListener("click", () => {
  card3.classList.toggle("flip");
});

document.querySelector("#level-up").addEventListener("click", () => {
  Confirm.open({
    onok: () => {
      incLevel();
    },
    oncancel: () => {},
  });
});
