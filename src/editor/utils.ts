export const getDescription = (htmlString: string): string => {
  // grab the first paragraph tag found and remove all html tags present.
  const firstPar = htmlString.match(/(<p>.*?<\/p>)/g)?.[0] || '';
  const description = firstPar.replaceAll(/<.+?>/g, '');
  return description;
};
