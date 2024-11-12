export const useHighlight = () => {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts
      .map((part) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return `<span class="text-[#FF924C] font-medium">${part}</span>`;
        }
        return part;
      })
      .join("");
  };

  return { highlightText };
};
