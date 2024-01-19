import "reset-css";
import "./styles/styles.scss";
import "./styles/anime.scss";
import "./styles/rating.scss";
import "./typescripts/line";
import "./typescripts/typing";
import "./typescripts/star";
import random from "./typescripts/random";

type BlockType = {
  element: Element;
  a: number;
  t: number;
  y: number;
  vy: number;
};

function animate_blocks(blocks: BlockType[]) {
  blocks.forEach((block) => {
    const element = block.element as HTMLElement;

    element.classList.remove("anime-from-above");

    element.style.setProperty("--y", `${block.y}px`);
    element.style.setProperty("--a", `${block.a}deg`);

    block.y += block.vy;
    block.a += block.t;
  });
}

function manufacture_blocks(
  root: Element | Document = document,
  identifier: string,
  toRemove: string
) {
  return [...root.querySelectorAll(identifier)!].map((block) => {
    if (toRemove) block.classList.remove(toRemove);

    return { element: block, a: 0, t: random(-1, 1), y: 0, vy: random(5, 10) };
  });
}

function handle_submit(event: Event) {
  event.preventDefault();

  const intervals: number[] = [];
  const title = document.querySelector(".fs-title.line")!;
  const titBlocks = manufacture_blocks(title, ".block", "anime-from-above");
  const intervalA = setInterval(() => animate_blocks(titBlocks), 16);
  const typing = document.querySelector(".fs-body.typing")!;
  const wordBlocks = manufacture_blocks(typing, "p:not(.sr-only)", "");
  const intervalB = setInterval(() => animate_blocks(wordBlocks), 16);
  const choices = document.querySelector(".choices")!;
  const liBlocks = manufacture_blocks(choices, "li", "anime-from-left");
  const intervalC = setInterval(() => animate_blocks(liBlocks), 16);
  const submit = document.querySelector(".submit")!;
  const star = document.querySelector(".star-container")!;
  intervals.push(intervalA, intervalB, intervalC);

  submit.classList.remove("anime-from-bottom");
  star.classList.remove("anime-follow-path");

  title.classList.add("anime-fade", "removed-from-reality");
  typing.classList.add("anime-fade", "removed-from-reality");
  choices.classList.add("anime-fade", "removed-from-reality");
  submit.classList.add("anime-to-below");
  star.classList.add("anime-to-below");

  title.addEventListener("animationend", () =>
    intervals.forEach((interval) => clearInterval(interval))
  );
}

function init() {
  const form = document.querySelector(".rating");

  form?.addEventListener("submit", handle_submit);
}

init();
