import { nanoid } from "nanoid";
import { EditorDraft } from "./Provider";

export const getDescription = (htmlString: string): string => {
  // grab the first paragraph tag found and remove all html tags present.
  // then only use the first 100 characters.
  let firstPar = htmlString.match(/(<p>.*?<\/p>)/g)?.[0] || "";
  firstPar = firstPar.replaceAll(/(<a.*?>)|(<\/a>)/g, "");

  let validCharCount = 0;
  let isInsideTag = false;
  let isInsideString = false;
  let endingSliceIndex = 0;

  for (let i = 0; i < firstPar.length; i++) {
    const ch = firstPar[i];
    endingSliceIndex++;
    if (isInsideTag) {
      // check if ch is an end tag and not inside a string.
      if (ch === ">" && !isInsideString) {
        isInsideTag = false;
      }
      // check if we are inside a string or not.
      if (ch === '"') {
        isInsideString = !isInsideString;
      }
      continue;
    } else if (ch === "<") {
      // check if we just entered the inside of a tag.
      isInsideTag = true;
      continue;
    }

    // only count the valid characters.
    validCharCount++;
    if (validCharCount >= 100) {
      break;
    }
  }

  const description = firstPar.slice(0, endingSliceIndex);
  console.log(description);
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
