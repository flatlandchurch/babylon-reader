import { h } from 'preact';
import { useState } from 'preact/hooks';
import { styled, keyframes } from 'goober';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const Card = styled('div')`
  width: 95%;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 12, 0.3);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 12px;
  margin: 0 auto;
  align-items: center;

  h1 {
    margin-bottom: 24px;
  }

  h3 {
    margin-bottom: 48px;
  }

  h3 ~ p {
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Ink = styled('div')`
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  background: #000;
  color: #fff;
`;

const Form = styled('form')`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 8px;
`;

const Input = styled('input')`
  font-size: 16px;
  padding: 8px 12px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Row = styled('div')`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
  grid-gap: 8px;
`;

const Button = styled<{ sending: boolean }>('button')`
  display: block;
  border: 0;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  background: #000;
  cursor: pointer;

  span {
    animation-name: ${rotate};
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-play-state: ${(props) => (props.sending ? 'running' : 'paused')};
  }
`;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    fetch('/.netlify/functions/token', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setShowConfirmation(true);
    });
  };

  return (
    <Card>
      <Ink>
        <h1>Babylon</h1>
        <h3>Login/Sign Up</h3>
        <p>
          (whether its your first time or you're back again, just pop your email in the box and
          we'll get you all set)
        </p>
      </Ink>
      {showConfirmation ? (
        <div>
          <p>
            Awesome! An email has been sent with a login link. We're so excited to read with you.
          </p>
        </div>
      ) : (
        <Form onSubmit={onSubmit}>
          <label for="email">Enter your email address:</label>
          <Row>
            <Input
              type="email"
              id="email"
              autocomplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={sending}
            />
            <Button type="submit" sending={sending} disabled={sending}>
              <span class="material-icons-outlined">
                {sending ? 'motion_photos_on' : 'arrow_forward'}
              </span>
            </Button>
          </Row>
        </Form>
      )}
    </Card>
  );
};

export default Auth;
