import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
  Overlay,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
} from "./styles";

import { backEndUrl } from "../../config/config";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log("images", images);
  /* eslint-disable import/prefer-default-export */
  const prod = process.env.NODE_ENV === "production";

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>Image Details</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                {prod ? (
                  <img
                    src={`${v.src.replace(/\thumb\//, "original/")}`} //// 다시 thumb을 original로 변경 하기
                    alt={v.src.replace(/\thumb\//, "original/")}
                    //   <img
                    //   src={`${v.src}`}
                    //   alt={v.src}
                    // />  /// 이전 코드 (thumb만 받아들이는 코드)
                  />
                ) : (
                  <img src={`${backEndUrl}/${v.src}`} alt={v.src} />
                )}
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import Slick from "react-slick";
// import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from "./styles";
// import SimpleImageSlider from "react-simple-image-slider";
// import { Slide } from "react-slideshow-image";

// const ImagesZoom = ({ images, onClose }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   // const [imagesArray, setImagesArray] = useState([])
//   // const images = ()=>{  }
//   const imagesArray = images.map((image) => image.src);
//   console.log("imagesArray", imagesArray);
//   console.log(images);
//   // console.log(imagesArray[0]);
//   // useEffect(() => {
//   //   const imagesArray = images.map((image) => image);
//   // }, [])(images);
//   // console.log(imagesArray);
//   return (
//     // <Overlay>
//     //   <Global />
//     //   <Header>
//     //     <h1>상세 이미지</h1>
//     //     <CloseBtn onClick={onClose} />
//     //   </Header>
//     //   <SlickWrapper>
//     //     <div>
//     //       <SimpleImageSlider images={imagesArray} />
//     //       <Indicator>
//     //         <div>
//     //           {currentSlide + 1} /{images.length}
//     //         </div>
//     //       </Indicator>
//     //     </div>
//     //   </SlickWrapper>
//     // </Overlay>
//     // );
//     <div className="slide-container">
//       {/* <SimpleImageSlider images={imagesArray} />
//       <SimpleImageSlider images={imagesArray} /> */}
//       {/* <div>
//         <img src={images[1].src} alt="" />
//         <img src={imagesArray[0].src} alt="" />
//       </div> */}
//       <Slide>
//         <div className="each-slide">
//           {images.map((image, i) =>
//             // <div key={image.src} style={{ backgroundImage: `url(${image.src})` }}>
//             // </div>
//             console.log(image.src),
//           )}
//         </div>
//       </Slide>
//     </div>
//   );
// };

// ImagesZoom.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onClose: PropTypes.func.isRequired,
// };
// export default ImagesZoom;

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
      className={css`
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}>
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
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={true}
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
          </Slick>
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
