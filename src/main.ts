import "reset-css";
import "./styles/styles.scss";
import "./styles/anime.scss";
import "./styles/rating.scss";
import animate_line from "./typescripts/animate_line";
import animate_star from "./typescripts/star";
import animate_typing from "./typescripts/typing";
import fall from "./typescripts/fall";
import random from "./typescripts/random";

async function submit(url: string, value: number) {
  return await (
    await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ value }),
    })
  ).json();
}

function send_request(value: number) {
  const url = "https://jsonplaceholder.typicode.com/posts";

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(submit(url, value));
      } catch (error) {
        reject(error);
      }
    }, random(1000, 1500));
  });
}

function rate(form: HTMLFormElement) {
  const rating = form.parentElement!;
  const succScreen = rating.querySelector(".success-screen")!;
  const finalRating = succScreen.querySelector(".final-rating")!;
  const finalRatingValue = form["rating"].value;

  finalRating.innerHTML = `You selected ${finalRatingValue} out of 5`;
}

async function handle_submit(event: SubmitEvent) {
  event.preventDefault();

  const target = event.target as HTMLFormElement;
  const rating = target.parentElement!;
  const value = target["rating"].value;

  rate(target);
  fall(target);

  try {
    rating.classList.remove("start");
    rating.classList.add("loading");

    await send_request(value);

    rating.classList.remove("loading");
    rating.classList.add("success");

    const succLine = rating.querySelector(
      ".success-screen .line"
    ) as HTMLElement;
    const succText = rating.querySelector(
      ".success-screen .typing"
    ) as HTMLElement;

    animate_line(succLine);
    animate_typing(succText, 33);
  } catch (error) {
    console.log(error);

    const errLine = rating.querySelector(".error-screen .line") as HTMLElement;
    const errText = rating.querySelector(
      ".error-screen .typing"
    ) as HTMLElement;

    animate_line(errLine);
    animate_typing(errText, 33);

    rating.classList.add("error");
  }
}

function init() {
  const rating = document.querySelector(".rating")!;
  const form = rating.querySelector(".form") as HTMLElement;
  const first = form.querySelector(".line.first") as HTMLElement;
  const text = form.querySelector(".typing.first") as HTMLElement;

  animate_line(first);
  //kill the stars if the animation is canned
  animate_star(form);
  setTimeout(() => animate_typing(text, 33), 1330);

  form.addEventListener("submit", handle_submit);
}

init();
