import { Note } from "@/app/world";
import { nanoid } from "nanoid";

export const getDescription = (htmlString: string): string => {
  // grab the first paragraph tag found and remove all html tags present.
  // then only use the first 100 characters.
  const firstPar = htmlString.match(/(<p>.*?<\/p>)/g)?.[0] || "";
  const description = firstPar.replaceAll(/<.+?>/g, "").slice(0, 100) + "...";
  return description;
};

export const emptyNote = (): Note => ({
  name: "",
  content: "",
  description: "",
  id: nanoid(),
  tagIds: [],
});