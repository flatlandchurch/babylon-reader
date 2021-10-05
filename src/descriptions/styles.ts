import { styled } from 'goober';

export const Paragraph = styled('p')`
  display: block;
  margin-bottom: 24px;
  line-height: 2;
  font-size: 18px;

  h2 {
    font-size: 20px;
    margin-top: 24px;
  }

  p:first-child {
    margin-top: 12px;
  }

  p:not(:last-child) {
    margin-bottom: 12px;
  }
`;
