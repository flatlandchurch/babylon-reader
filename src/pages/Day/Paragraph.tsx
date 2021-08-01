import { styled } from 'goober';
import { h } from 'preact';

export const Para = styled('p')`
  display: block;
  margin-bottom: 24px;
  line-height: 2;
  font-size: 18px;

  span {
    position: relative;
  }
`;

export const Sup = styled('sup')`
  font-size: 12px;
  position: relative;
  margin: 0 2px 0 8px;
`;

const Paragraph = (unit: { chunks: Record<string, any>[] }) => {
  return (
    <Para>
      {unit.chunks.map((chunk, idx) => (
        <span>
          {idx > 0 && unit.chunks[idx - 1].verseNumber !== chunk.verseNumber && (
            <Sup>{chunk.verseNumber}</Sup>
          )}
          {chunk.value}
        </span>
      ))}
    </Para>
  );
};

export default Paragraph;
