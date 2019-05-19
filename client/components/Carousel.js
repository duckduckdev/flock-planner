import React from 'react';
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
 
const Carousel = () => {
  let reactSwipeEl;
 
  return (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >
        <div>PANE 1</div>
        <div>PANE 2</div>
        <div>PANE 3</div>
      </ReactSwipe>
      <button type="button" onClick={() => reactSwipeEl.next()}>Next</button>
      <button type="button" onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};

export default Carousel
