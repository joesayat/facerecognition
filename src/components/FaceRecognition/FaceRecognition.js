import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ allBoundingBox, imageUrl }) => {
  return (
    <div className="face-detect__container">
      <div className="absolute">
        <img 
          id="image" 
          className="face-detect__img"
          src={imageUrl} alt=""/>
        {
          allBoundingBox.map(box => {
            return (
            <div 
              key={box.topRow} 
              className="bounding-box" 
              style={
                {
                  top: box.topRow, 
                  left: box.leftCol, 
                  bottom: box.bottomRow, 
                  right: box.rightCol 
                }
              }
            >
            </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default FaceRecognition;
