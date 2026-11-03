import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft__item">
          <div className="skeleton-avatar skeleton-animation"></div>
          <div className="skeleton-image skeleton-animation"></div>

          <div className="nft__item_info">
            <div className="skeleton-title skeleton-animation"></div>
            <div className="skeleton-price skeleton-animation"></div>
          </div>
        </div>
      </div>
      <div
        className="skeleton-box"
        style={{
          width,
          height,
          borderRadius,
        }}
      ></div>
    </>
  );
};

export default Skeleton;
