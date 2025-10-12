function platArrayWithNumberInBetween(array: number[][]): number[] {
  if (!array || array.length === 0) {
    return [];
  }

  return array.flatMap(([start, end]) => {
    if (
      typeof start !== 'number' ||
      typeof end !== 'number' ||
      isNaN(start) ||
      isNaN(end)
    ) {
      return [];
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
}

export default function parseSyntaxHighlighterClassName(className: string): {
  addLines: number[];
  removeLines: number[];
} {
  if (!className || typeof className !== 'string') {
    return {
      addLines: [],
      removeLines: [],
    };
  }

  const [, addLineString = '', removeLineString = ''] = className.split(',');

  const addLines = addLineString
    .split('&')
    .filter((line) => line.trim() !== '') // 빈 문자열 필터링
    .map((line) => line.split('-').map(Number));

  const removeLines = removeLineString
    .split('&')
    .filter((line) => line.trim() !== '') // 빈 문자열 필터링
    .map((line) => line.split('-').map(Number));

  return {
    addLines: platArrayWithNumberInBetween(addLines),
    removeLines: platArrayWithNumberInBetween(removeLines),
  };
}
