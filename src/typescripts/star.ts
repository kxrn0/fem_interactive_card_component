function start_animation(root: Element, element: Element) {
  const rootRect = root.getBoundingClientRect();

  return setInterval(() => {
    const plume = document.createElement("div");
    const rect = element.getBoundingClientRect();

    plume.classList.add("plume");
    plume.style.setProperty("--top", `${rect.top - rootRect.top}px`);
    plume.style.setProperty("--left", `${rect.left - rootRect.left}px`);

    plume.addEventListener("animationend", () =>
      plume.parentElement?.removeChild(plume)
    );

    root.append(plume);
  }, 16);
}

export default function animate_star(container: HTMLElement) {
  const star = container.querySelector(".star")!;
  let interval = 0;

  star.addEventListener("animationstart", (event) => {
    if ((event.target as Element).classList.contains("star"))
      interval = start_animation(container, star);
  });

  star.addEventListener("animationend", (event) => {
    if ((event.target as Element).classList.contains("star"))
      clearInterval(interval);
  });
}
