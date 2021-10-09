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
  &::before {
    content: ${(props) => (props.spaceBefore ? '" "' : '')};
  }

  &::after {
    content: ${(props) => (props.spaceAfter ? '" "' : '')};
  }
`;

export const DivineName = styled(Text)`
  font-variant: ${(props) => props.smallcaps && 'small-caps'};

  &::before {
    content: ${(props) => (props.spaceBefore ? '" "' : '')};
  }

  &::after {
    content: ${(props) => (props.spaceAfter ? '" "' : '')};
  }
`;

export const VerseNumber = ({ children }: { children: ComponentChildren }) => {
  const showVerses = useVerseSetting();

  return showVerses && <Sup>{children}</Sup>;
};

const Paragraph = (unit: { chunks: Record<string, any>[] }) => {
  return (
    <Para>
      {unit.chunks.map((chunk, idx) =>
        chunk.type === 'divine_name_text' ? (
          <DivineName
            smallcaps={true}
            spaceBefore={idx > 0 && /\w$/.test(unit.chunks[idx - 1].value)}
            spaceAfter={idx < unit.chunks.length - 1 && /^\w/.test(unit.chunks[idx + 1].value)}
          >
            {idx > 0 && !/the$/i.test(unit.chunks[idx - 1].value) ? 'YHWH' : 'Lord'}
          </DivineName>
        ) : (
          <Text
            spaceBefore={idx > 0 && /\W$/.test(unit.chunks[idx - 1].value)}
            spaceAfter={idx < unit.chunks.length - 1 && /^\W/.test(unit.chunks[idx + 1].value)}
          >
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
