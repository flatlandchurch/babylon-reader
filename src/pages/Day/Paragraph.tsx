import { styled } from 'goober';
import { ComponentChildren, h } from 'preact';

import { useDivineName, useVerseSetting } from '../../DataProvider';

export const Para = styled('p')`
  display: block;
  margin-bottom: 24px;
  line-height: 2;
  font-size: 18px;

  span {
    position: relative;
  }
`;

const Sup = styled('sup')`
  font-size: 12px;
  position: relative;
  margin: 0 2px 0 8px;
`;

const Text = styled('span')`
  &:not(:last-child)::after {
    content: ' ';
  }

  &:not(:first-child)::before {
    content: ' ';
  }
`;

export const DivineName = styled(Text)`
  font-variant: ${(props) => props.smallcaps && 'small-caps'};
`;

export const VerseNumber = ({ children }: { children: ComponentChildren }) => {
  const showVerses = useVerseSetting();

  return showVerses && <Sup>{children}</Sup>;
};

const Paragraph = (unit: { chunks: Record<string, any>[] }) => {
  const { name, smallcaps } = useDivineName();

  return (
    <Para>
      {unit.chunks.map((chunk, idx) =>
        chunk.type === 'divine_name_text' ? (
          <DivineName smallcaps={smallcaps}>{name}</DivineName>
        ) : (
          <Text>
            {idx > 0 && unit.chunks[idx - 1].verseNumber !== chunk.verseNumber && (
              <VerseNumber>{chunk.verseNumber}</VerseNumber>
            )}
            {chunk.value}
          </Text>
        ),
      )}
    </Para>
  );
};

export default Paragraph;
