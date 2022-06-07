// TODO: Tweak common words
export const commonWords = new Set<string>([
  "的",
  "是",
  "和",
]);

const punctuationList = "：，。！？、；“”（）【】《》·{}()\\[\\]\\\\.,;:!¡?¿/@#%\\^&*_~+\\-=<>«»\"'\\s";
const wordRegex = new RegExp(`^[^${punctuationList}]+$`, "i");
const separatorRegex = new RegExp(`([${punctuationList}]+)`, "gim");
// TODO: This doesn't include all Han Ideographs
const ChineseRegex = new RegExp('[\u4E00-\u9FFF]+', "i");

export const splitWords = (text: string): string[] => {
  const preSplitText = text.split(separatorRegex);
  const finalSplitText: string[] = [];
  for (let word of preSplitText) {
    if (isChineseWord(word)) {
      // TODO: Spliting by "" might be problematic for certain unicode characters?
      for (let character of (word.split(""))) {
        finalSplitText.push(character);
      }
    } else {
      finalSplitText.push(word);
    }
  }

  return finalSplitText;
};

export const isChineseWord = (word: string): boolean => {
  return !!word.match(ChineseRegex);
}

export const isWord = (word: string): boolean => {
  return !!word.match(wordRegex) || isChineseWord(word);
};

// TODO: This doesn't work at all for now
export const countOccurrences = (text: string, word: string): number => {
  const regex = new RegExp(
    `\([${punctuationList}]|^)(${word.toLocaleLowerCase()})([${punctuationList}]|$)`,
    "gim"
  );
  const matches = Array.from(text.matchAll(regex));
  return matches.length;
};
