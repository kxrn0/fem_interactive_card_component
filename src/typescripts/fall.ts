import animate_blocks from "./animate_blocks";
import manufacture_blocks from "./manufacture_blocks";

export default function fall(container: HTMLElement) {
  const intervals: number[] = [];
  const title = container.querySelector(".fs-title.line")!;
  const titBlocks = manufacture_blocks(title, ".block", "anime-from-above");
  const intervalA = setInterval(() => animate_blocks(titBlocks), 16);
  const typing = container.querySelector(".fs-body.typing")!;
  const wordBlocks = manufacture_blocks(typing, "p:not(.sr-only)", "");
  const intervalB = setInterval(() => animate_blocks(wordBlocks), 16);
  const choices = container.querySelector(".choices")!;
  const liBlocks = manufacture_blocks(choices, "li", "anime-from-left");
  const intervalC = setInterval(() => animate_blocks(liBlocks), 16);
  const submit = container.querySelector(".submit")!;
  const star = container.querySelector(".star-container")!;
  intervals.push(intervalA, intervalB, intervalC);

  container.classList.remove("anime-expand");
  submit.classList.remove("anime-from-bottom");
  star.classList.remove("anime-follow-path");

  title.classList.add("removed-from-reality");

  star.classList.add("removed-from-reality", "anime-to-below");
  typing.classList.add("removed-from-reality");
  choices.classList.add("removed-from-reality");
  submit.classList.add("anime-to-below");

  container.addEventListener("animationend", () =>
    intervals.forEach((interval) => clearInterval(interval))
  );
}
