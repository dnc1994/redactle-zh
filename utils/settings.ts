import { encode } from "./encryption";

export const firstGameDate = new Date(2022, 5, 5);
const clearTextPageList: string[] = [];

const shuffle = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const getEncodePageList = (): string[] => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw Error("Missing encryption key");
  }
  const encoded = clearTextPageList.map((pageName: string) =>
    encode(pageName, encryptionKey)
  );
  shuffle(encoded);
  return encoded;
};

export const encodedPageList = [
  "江泽民",
  "鲁迅",
  "日本历史",
  "赫尔辛基",
  "死海古卷",
  "邪教",
  "咖哩",
  "老友记",
  "螃蟹",
  "薛定谔猫",
  "现代汽车",
];
