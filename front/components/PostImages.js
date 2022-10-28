import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { backEndUrl } from "../config/config";
import ImagesZoom from "./ImagesZoom";
import { CloseBtn } from "./ImagesZoom/styles";
import { Button } from "antd";

const PostImages = ({ images, editMode, onRemoveImage }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const prod = process.env.NODE_ENV === "production";

  // console.log("images", images);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        {editMode ? (
          <div
            role="presentation"
            style={{
              display: "inline-block",
              width: "100%",
              position: "relative",
            }}
            // onClick={(e) => e.stopPropagation}
          >
            {/* <div style={{ background: "white", position: "relative" }}> */}
            {/* <Button
              onClick={onRemoveImage(images[0].src)}
              type="danger"
              size="small">
              {" "}
              Delete Image{" "}
            </Button> */}
            <CloseBtn
              onClick={onRemoveImage(images[0].src)}
              style={{
                background: "white",
                left: 0,
                right: "auto",
                opacity: 0.7,
              }}
            />
            {/* </div> */}
            <img
              role="presentation"
              width="100%"
              src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
              alt={images[0].src}
              onClick={onZoom}
            />
          </div>
        ) : (
          <img
            role="presentation"
            src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
          />
        )}
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        {editMode ? (
          <>
            <div
              role="presentation"
              style={{
                display: "inline-block",
                width: "50%",
                position: "relative",
              }}>
              {/* <div style={{ background: "white", position: "relative" }}> */}
              <CloseBtn
                onClick={onRemoveImage(images[0].src)}
                style={{
                  background: "white",
                  left: 0,
                  right: "auto",
                  opacity: 0.7,
                }}
              />
              {/* </div> */}
              <img
                role="presentation"
                width="100%"
                src={
                  prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`
                }
                alt={images[0].src}
                onClick={onZoom}
              />
            </div>
            <div
              role="presentation"
              style={{
                display: "inline-block",
                width: "50%",
                position: "relative",
              }}>
              {/* <div style={{ background: "white", position: "relative" }}> */}
              <CloseBtn
                onClick={onRemoveImage(images[1].src)}
                style={{
                  background: "white",
                  left: 0,
                  right: "auto",
                  opacity: 0.7,
                }}
              />
              {/* </div> */}
              <img
                role="presentation"
                width="100%"
                src={
                  prod ? `${images[1].src}` : `${backEndUrl}/${images[1].src}`
                }
                alt={images[1].src}
                onClick={onZoom}
              />
            </div>
          </>
        ) : (
          <>
            <img
              role="presentation"
              style={{ width: "50%", display: "inline-block" }}
              src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
              alt={images[0].src}
              onClick={onZoom}
            />
            <img
              role="presentation"
              style={{ width: "50%", display: "inline-block" }}
              src={prod ? `${images[1].src}` : `${backEndUrl}/${images[1].src}`}
              alt={images[1].src}
              onClick={onZoom}
            />
          </>
        )}
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        {editMode ? (
          <div
            role="presentation"
            style={{
              display: "inline-block",
              width: "50%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}>
            {/* <div style={{ background: "white", position: "relative" }}> */}
            <CloseBtn
              onClick={onRemoveImage(images[0].src)}
              style={{
                background: "white",
                left: 0,
                right: "auto",
                opacity: 0.7,
              }}
            />
            {/* </div> */}
            <img
              role="presentation"
              // width="100%"
              src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
              alt={images[0].src}
              onClick={onZoom}
            />
          </div>
        ) : (
          <img
            role="presentation"
            width="50%"
            src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
          />
        )}

        {/* <img
          role="presentation"
          width="50%"
          src={prod ? `${images[0].src}` : `${backEndUrl}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          /> */}

        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}>
          <PlusOutlined />
          <br />
          See {images.length - 1} more photos
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  editMode: PropTypes.bool,
  onRemoveImage: PropTypes.func,
};

PostImages.defaultProps = {
  images: undefined,
  editMode: false,
};
