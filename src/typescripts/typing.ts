type ItemType = { word: string; preDelay: number };

function map_words(words: string[], millisPerChar: number) {
  return words.reduce<ItemType[]>((result, word, index) => {
    const preDelay =
      index > 0
        ? result[index - 1].preDelay + words[index - 1].length * millisPerChar
        : 0;
    result.push({
      word,
      preDelay,
    });
    return result;
  }, []);
}

export default function animate_typing(container: HTMLElement, delay: number) {
  const text = container.dataset.text;
  const words = text?.split(" ");
  const split = map_words(words!, delay);

  split.forEach((item) => {
    const p = document.createElement("p");

    p.setAttribute("aria-hidden", "true");

    container.append(p);

    item.word
      .split("")
      .forEach((char, index) =>
        setTimeout(
          () => (p.innerText = `${p.innerText}${char}`),
          delay * index + item.preDelay
        )
      );
  });
}
