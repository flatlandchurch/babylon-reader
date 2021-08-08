import { h } from 'preact';
import { styled } from 'goober';

import { VerseNumber, Para, DivineName } from './Paragraph';
import { useDivineName } from '../../DataProvider';

const Line = styled('span')`
  display: block;
  margin-left: 12px;

  &:not(:first-child) {
    margin-left: 24px;
  }
`;

const Stanza = (unit: { chunks: Record<string, any>[] }) => {
  const { name, smallcaps } = useDivineName();

  return (
    <Para>
      {unit.chunks
        .filter((v) => v.value)
        .map((chunk, idx) => (
          <Line>
            {idx > 0 && unit.chunks[idx - 1].verseNumber !== chunk.verseNumber && (
              <VerseNumber>{chunk.verseNumber}</VerseNumber>
            )}
            {chunk.type === 'divine_name_text' ? (
              <DivineName smallcaps={smallcaps}>{name}</DivineName>
            ) : (
              chunk.value
            )}
          </Line>
        ))}
    </Para>
  );
};

export default Stanza;
