import { h } from 'preact';
import { Paragraph } from './styles';

const Day = () => {
  return (
    <Paragraph>
      <p>
        When we left our story yesterday, the Israelites were forced to make bricks without straw
        being provided for them. The Israelites were being overworked as a form of oppression, with
        no interest in profit margins or balance sheets.
      </p>
      <p>
        God's response is to "stretch out [his] arm" and to bring the people out of Egypt with a
        "might hand." It is in this phrase that we see a very special type of hyperlink in the Bible
        (and there are only a handful). A hyperlink to non-Biblical material. In this case, it's to
        the very way in which the Egyptian world thought of their Pharaoh.
      </p>
      <p>
        A Biblical scholar named Joshua Berman{' '}
        <a href="https://mosaicmagazine.com/essay/history-ideas/2015/03/was-there-an-exodus/#:~:text=Why%20would%20the%20book%20of%20Exodus">
          wrote about the phrase "mighty hand" and "outstretched hand"
        </a>{' '}
        as being unique within all of the ancient near east. It was a phrase used exclusively by the
        Egyptians <em>about</em> their pharaoh.
      </p>
      <p>
        But by God using this language to describe the way in which he will rescue his people from
        violence and oppression, we see him turning the power structures of the world – of Babylon –
        on their heads. Now, the ways of thinking about kings and kingdoms crumbles under God's
        mighty hand.
      </p>
    </Paragraph>
  );
};

export default Day;
