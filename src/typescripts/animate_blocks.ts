type BlockType = {
  element: Element;
  a: number;
  t: number;
  y: number;
  vy: number;
};

export default function animate_blocks(blocks: BlockType[]) {
  blocks.forEach((block) => {
    const element = block.element as HTMLElement;

    element.classList.remove("anime-from-above");

    element.style.setProperty("--y", `${block.y}px`);
    element.style.setProperty("--a", `${block.a}deg`);

    block.y += block.vy;
    block.a += block.t;
  });
}
