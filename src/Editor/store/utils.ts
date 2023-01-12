import { nanoid } from "nanoid";
import { EditorDraft } from "./Provider";

export const getDescription = (htmlString: string): string => {
  // grab the first paragraph tag found and remove all html tags present.
  // then only use the first 100 characters.
  const firstPar = htmlString.match(/(<p>.*?<\/p>)/g)?.[0] || "";
  const description = firstPar.slice(0, 100);
  return description.length >= 90 ? description + "..." : description;
};

export const emptyDraft = (): EditorDraft => ({
  name: "",
  content: "",
  description: "",
  id: nanoid(),
  tagIds: [],
  isFresh: true,
});
