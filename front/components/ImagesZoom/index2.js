import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0} //처음 나오는 이미지 슬라이드
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)} // 사진 넘겼을 때 그 다음 슬라이드 설정
            infinite // 무한 반복
            arrows={false} // 사진 넘기기 위한 방향키 없애기
            slidesToShow={1} //한번에 하나씩 만 보이기
            slidesToScroll={1} // 한번에 사진 하나씩만 넘기기
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ImagesZoom;

/*
import PropTypes from "prop-types";
import { useState } from "react";
import Slick from "react-slick";
import Slider from "react-slick";
import { Global } from "@emotion/react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { CloseOutlined } from "@ant-design/icons";
// import { createGlobalStyle } from "styled-components";

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
  console.log(images);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
    // className={css`
    //   position: fixed;
    //   z-index: 100;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    // `}
    >
      <Global
        styles={css`
          .slick-slide {
            display: inline-block;
          }
        `}
      />
      <Global
        styles={{
          ".slick-track": {
            transform: "none !important",
          },
          "ant-card-cover": {
            transform: "none !important",
          },
        }}
      />


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
        <CloseOutlined
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
        </CloseOutlined>
      </header>
      <div
        className={css`
          height: calc(100% - 44px);
          background: #090909;
        `}>
        <div>
          <Slider
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v) => (
              <div
                className={css`
                  text-align: center;
                  padding: 25px;
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
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
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
*/
