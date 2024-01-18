function line() {
  const line = document.querySelector(".line") as HTMLDivElement;
  const text = line.dataset.text;

  text?.split("").forEach((char, index) => {
    const pre = document.createElement("pre");

    pre.innerText = char;
    pre.setAttribute("aria-hidden", "true");
    pre.style.setProperty("--index", `${index}`);
    pre.classList.add("block", "anime-from-above");

    line.append(pre);
  });
}

line();
