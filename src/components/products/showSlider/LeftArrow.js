import React from 'react';

function LeftArrow(props){
  return (
    <div className="prevArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
    </div>
  );
}


export default LeftArrow;