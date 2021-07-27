// Forked (with some stylistic preference-changes) from
// Josh Duff's world-english-bible
// (https://github.com/TehShrike/world-english-bible/blob/master/build-final-data-structure.js)

const pipr = require('pipr').default;
const flatten = require('just-flatten');

const mapFiles = require('./mapFiles');

const types = {
  PARAGRAPH_START: `paragraph_start`,
  PARAGRAPH_END: `paragraph_end`,
  STANZA_START: `stanza_start`,
  STANZA_END: `stanza_end`,
  PARAGRAPH_TEXT: `paragraph_text`,
  LINE_TEXT: `line_text`,
  LINE_BREAK: `line_break`,
  CHAPTER_NUMBER: `chapter_number`,
  VERSE_NUMBER: `verse_number`,
  CONTINUE_PREVIOUS_PARAGRAPH: `continue_previous_paragraph`,
  BREAK: `break`,
};

const stanzaStart = { type: types.STANZA_START };
const stanzaEnd = { type: types.STANZA_END };

const normalize = (file) => {
  return pipr([
    removeWhitespaceAtStartOfParagraphsOrBooks,
    removeWhitespaceAtStartOfLines,
    moveChapterNumbersIntoVerseText,
    mergeContinuedParagraphs,
    addVerseNumberToVerses,
    putContiguousLinesInsideOfStanzaStartAndEnd,
    turnBreaksInsideOfStanzasIntoStanzaStartAndEnds,
    removeBreaksBeforeStanzaStarts,
    combineContiguousTextChunks,
    addSectionNumbers,
  ])(JSON.parse(file));
};

const removeWhitespaceAtStartOfParagraphsOrBooks = (chunks) => {
  let pastFirstVerse = false;
  let lastChunk = null;
  return chunks.filter((chunk) => {
    const startOfBook = !pastFirstVerse;
    const startOfParagraph =
      lastChunk &&
      (lastChunk.type === types.PARAGRAPH_START ||
        lastChunk.type === types.CONTINUE_PREVIOUS_PARAGRAPH);

    const removeChunk =
      (startOfBook || startOfParagraph) && isTextChunk(chunk) && !chunk.value.trim();

    // console.log(removeChunk ? `removing` : `keeping`, chunk)

    lastChunk = chunk;
    if (chunk.type === types.VERSE_NUMBER) {
      pastFirstVerse = true;
    }

    return !removeChunk;
  });
};

const removeWhitespaceAtStartOfLines = (chunks) => {
  let lastChunk = null;

  return chunks.filter((chunk) => {
    const firstChunkAfterLineBreak = lastChunk && lastChunk.type === types.LINE_BREAK;

    const removeChunk = firstChunkAfterLineBreak && isTextChunk(chunk) && !chunk.value.trim();

    lastChunk = chunk;

    return !removeChunk;
  });
};

const moveChapterNumbersIntoVerseText = (chunks) => {
  let currentChapterNumber = null;
  return chunks
    .map((chunk) => {
      if (chunk.type === types.CHAPTER_NUMBER) {
        currentChapterNumber = chunk.value;
      } else if (isTextChunk(chunk)) {
        return Object.assign(
          {
            chapterNumber: currentChapterNumber,
          },
          chunk,
        );
      } else {
        return chunk;
      }
    })
    .filter((t) => t);
};

const mergeContinuedParagraphs = (chunks) => {
  const output = [];

  chunks.forEach((chunk) => {
    if (chunk.type === types.CONTINUE_PREVIOUS_PARAGRAPH) {
      output.pop();
    } else {
      output.push(chunk);
    }
  });

  return output;
};

const addVerseNumberToVerses = (chunks) => {
  let currentVerseNumber = null;
  const output = [];
  chunks.forEach((chunk) => {
    if (chunk.type === types.VERSE_NUMBER) {
      currentVerseNumber = chunk.value;
    } else if (isTextChunk(chunk)) {
      output.push(
        Object.assign(
          {
            verseNumber: currentVerseNumber,
          },
          chunk,
        ),
      );
    } else {
      output.push(chunk);
    }
  });
  return output;
};

const putContiguousLinesInsideOfStanzaStartAndEnd = (chunks) => {
  let insideStanza = false;
  return flatMap(chunks, (chunk) => {
    if (insideStanza && !isStanzaChunk(chunk) && chunk.type !== types.BREAK) {
      insideStanza = false;
      return [stanzaEnd, chunk];
    } else if (!insideStanza && isStanzaChunk(chunk)) {
      insideStanza = true;
      return [stanzaStart, chunk];
    } else {
      return chunk;
    }
  });
};

const turnBreaksInsideOfStanzasIntoStanzaStartAndEnds = (chunks) => {
  let insideStanza = false;
  return flatMap(chunks, (chunk) => {
    if (chunk.type === types.STANZA_START) {
      insideStanza = true;
    } else if (chunk.type === types.STANZA_END) {
      insideStanza = false;
    }

    if (insideStanza && chunk.type === types.BREAK) {
      return [stanzaEnd, stanzaStart];
    } else {
      return chunk;
    }
  });
};

const removeBreaksBeforeStanzaStarts = (chunks) => {
  const output = [];

  let last = null;
  chunks.forEach((chunk) => {
    if (chunk.type === types.BREAK) {
      last = chunk;
      return;
    } else if (last && chunk.type !== types.STANZA_START) {
      output.push(last);
    }

    last = null;
    output.push(chunk);
  });

  return output;
};

const combineContiguousTextChunks = (chunks) => {
  let last = null;
  const outputChunks = [];

  chunks.forEach((chunk) => {
    if (
      isTextChunk(chunk) &&
      last &&
      last.type === chunk.type &&
      last.verseNumber === chunk.verseNumber &&
      last.chapterNumber === chunk.chapterNumber
    ) {
      last.value += chunk.value;
    } else {
      last = chunk;
      outputChunks.push(chunk);
    }
  });

  return outputChunks;
};

const addSectionNumbers = (chunks) => {
  let lastChapter = null;
  let lastVerse = null;
  let lastSection = 0;

  return chunks.map((chunk) => {
    if (isTextChunk(chunk)) {
      const { verseNumber, chapterNumber } = chunk;

      if (verseNumber !== lastVerse || chapterNumber !== lastChapter) {
        lastChapter = chapterNumber;
        lastVerse = verseNumber;
        lastSection = 0;
      }

      lastSection++;

      return Object.assign(
        {
          sectionNumber: lastSection,
        },
        chunk,
      );
    } else {
      return chunk;
    }
  });
};

const isTextChunk = (chunk) =>
  chunk.type === types.PARAGRAPH_TEXT || chunk.type === types.LINE_TEXT;

const flatMap = (arr, fn) => flatten(arr.map(fn));
const isStanzaChunk = (chunk) => chunk.type === types.LINE_TEXT || chunk.type === types.LINE_BREAK;

(async () => {
  await mapFiles('intermediate', 'json', 'final', 'json', normalize, true, (f) =>
    JSON.stringify(f, null, 2),
  );
})();
