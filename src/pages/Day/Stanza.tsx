import { h } from 'preact';
import { styled } from 'goober';

import { Sup, Para } from './Paragraph';

const Line = styled('span')`
  display: block;
  margin-left: 24px;

  &:not(:first-child) {
    margin-left: 48px;
  }
`;

const Stanza = (unit: { chunks: Record<string, any>[] }) => {
  return (
    <Para>
      {unit.chunks
        .filter((v) => v.value)
        .map((chunk, idx) => (
          <Line>
            {idx > 0 && unit.chunks[idx - 1].verseNumber !== chunk.verseNumber && (
              <Sup>{chunk.verseNumber}</Sup>
            )}
            {chunk.value}
          </Line>
        ))}
    </Para>
  );
};

export default Stanza;
