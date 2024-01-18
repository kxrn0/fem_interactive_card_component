import "reset-css";
import "./styles/styles.scss";
import "./styles/rating.scss";
import "./typescripts/line";
import "./typescripts/typing";

function init() {
  const form = document.querySelector("rating");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("form submitted");
  });
}

init();
