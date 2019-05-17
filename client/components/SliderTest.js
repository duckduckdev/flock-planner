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
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};
 
ReactDOM.render(<Carousel />, document.getElementById('app'));