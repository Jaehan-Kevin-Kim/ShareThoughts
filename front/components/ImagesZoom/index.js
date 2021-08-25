import PropTypes from "prop-types";
import { useState } from "react";
import Slick from "react-slick";
import Slider from "react-slick";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 750px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #1313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div
      className={css`
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}>
      <header
        className={css`
          header: 44px;
          background: white;
          position: relative;
          padding: 0;
          text-align: center;
        `}>
        <h1
          className={css`
            margin: 0;
            font-size: 17px;
            color: #333;
            line-height: 44px;
          `}>
          Image Details
        </h1>
        <button
          className={css`
            position: absolute;
            right: 0;
            top: 0;
            padding: 15px;
            line-height: 14px;
            cursor: pointer;
          `}
          onClick={onClose}>
          X
        </button>
      </header>
      <div
        className={css`
          height: calc(100% - 44px);
          background: #090909;
        `}>
        <div>
          <Slider
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v) => (
              <div
                className={css`
                  padding: 32px;
                  text-align: center;
                `}
                key={v.src}>
                <img
                  className={css`
                    margin: 0 auto;
                    max-height: 750px;
                  `}
                  src={v.src}
                  alt={v.src}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImagesZoom;

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};
