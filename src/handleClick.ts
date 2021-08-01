import shouldIntercept from 'click-should-be-intercepted-for-navigation';

const handleClick = (url) => (e) => {
  if (shouldIntercept(e)) {
    e.preventDefault();
    window.history.pushState(null, '', url);
    const event = new CustomEvent('pushstate', {
      detail: { url },
    });
    window.dispatchEvent(event);
  }
};

export default handleClick;
