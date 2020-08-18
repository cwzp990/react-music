import React, { useEffect, useState } from "react";
import Swiper from "swiper";

import "swiper/swiper-bundle.min.css";

function Slider(props) {
  const [slider, setSlider] = useState(null);
  const { imgList } = props;

  useEffect(() => {
    return () => {
      if (slider) setSlider(null);
    };
  }, []);

  useEffect(() => {
    if (imgList.length && !slider) {
      let slider = new Swiper(".swiper-container", {
        pagination: { el: ".swiper-pagination" },
      });
      setSlider(slider);
    }
  }, [imgList.length, slider]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {imgList.map((slider) => {
          return (
            <div className="swiper-slide" key={slider.bannerId}>
              <img src={slider.pic} alt="推荐" />
            </div>
          );
        })}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}

export default React.memo(Slider);
