function platArrayWithNumberInBetween(array) {
  return array.flatMap(([start, end]) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i),
  );
}

export default function parseSyntaxHighlighterClassName(className) {
  const [, addLineString, removeLineString] = className.split(',');

  const addLines = addLineString
    .split('&')
    .map((line) => line.split('-').map(Number));

  const removeLines = removeLineString
    .split('&')
    .map((line) => line.split('-').map(Number));

  return {
    addLines: platArrayWithNumberInBetween(addLines),
    removeLines: platArrayWithNumberInBetween(removeLines),
  };
}
