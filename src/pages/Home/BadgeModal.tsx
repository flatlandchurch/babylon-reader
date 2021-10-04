import { h } from 'preact';
import { styled } from 'goober';
import { useState } from 'preact/hooks';

const Modal = styled('div')`
  width: 250px;
  position: fixed;
  top: 25%;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 24px 0 rgb(0 0 5 / 30%);
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 18px;
  left: calc(50% - 125px);
`;

const Badge = styled('div')`
  width: 120px;
  height: 120px;
  position: relative;
  border: 3px solid #000;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;

  img {
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    object-fit: cover;
  }
`;

const Content = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  h2 {
    text-align: center;
    width: 100%;
  }
`;

const Button = styled('button')`
  border-radius: 8px;
  background: #000;
  color: #fff;
  width: 100%;
  font-size: 16px;
  padding: 8px 12px;
  box-sizing: border-box;
  appearance: none;
  border: none;
  cursor: pointer;
`;

const BadgeModal = ({ badges, onClose }) => {
  const [cursor, setCursor] = useState(0);

  const badge = badges[cursor];

  const handleClick = () => {
    if (badges.length > 1 && cursor + 1 !== badges.length) {
      setCursor((c) => c + 1);
    }

    if (cursor + 1 === badges.length) {
      onClose();
    }
  };

  return (
    <Modal>
      <Badge>
        <img src={badge.image} alt={`${badge.title} badge`} />
      </Badge>
      <Content>
        <h2>{badge.title}</h2>
        <p>{badge.description}</p>
      </Content>
      <Button onClick={handleClick}>
        {cursor + 1 === badges.length ? 'Close' : `Next (${cursor + 1}/${badges.length})`}
      </Button>
    </Modal>
  );
};

export default BadgeModal;
