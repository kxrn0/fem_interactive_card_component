import random from "./random";

export default function manufacture_blocks(
  root: Element | Document = document,
  identifier: string,
  toRemove: string
) {
  return [...root.querySelectorAll(identifier)!].map((block) => {
    if (toRemove) block.classList.remove(toRemove);

    return { element: block, a: 0, t: random(-1, 1), y: 0, vy: random(5, 10) };
  });
}
