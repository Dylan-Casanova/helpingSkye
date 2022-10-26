import React, { useState, useRef, Fragment } from "react";
import { Button, VStack, HStack } from "@chakra-ui/react";
import "./AwsUpload.scss";

// let imageUrl = "";
export const AwsUpload = ({ editFormatdata, updateImg, label, ...props }) => {
  const [savedImages, setSavedImages] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageInputEl = useRef(null);

  const saveImage = async (e) => {
    e.preventDefault();
    const imageUpload = imageInputEl.current.files[0];
    setLoading(true);
    // get secure url from AWS server
    const { url } = await fetch("/s3Url").then((res) => res.json());
    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: imageUpload,
    });
    let imageUrl = url.split("?")[0];
    setSavedImages(imageUrl);
    console.log(imageUrl);
    setUploadSuccess(true);

    // this function (props.updateImg) updates the
    // state of Cert_img with the value returned from
    // the AWS upload
    updateImg(imageUrl);
    if (editFormatdata) {
      if (editFormatdata.course_img) {
        editFormatdata.course_img = imageUrl;
      } else if (editFormatdata.section_img) {
        editFormatdata.section_img = imageUrl;
      } else if (editFormatdata.lesson_img) {
        editFormatdata.lesson_img = imageUrl;
      } else {
        editFormatdata.chapter_img = imageUrl;
      }
      setLoading(false);
    }
  };
  return (
    <div className="upload-container">
      <VStack spacing={1} align="auto">
        {label ? (
          <Fragment>
            <label className="label-text">{label} </label> 
          </Fragment>
        ) : null}
        <HStack spacing={1} align="center">
        <input
          id="imageInput"
          type="file"
          ref={imageInputEl}
          accept="image/*"
        />
        <Button onClick={saveImage} variant="outline" id="upload-button">
          Upload
        </Button>
        </HStack>
        {uploadSuccess ? (
          <p className="success-message">Image uploaded successfully</p>
        ) : (
          <p className="warning-message">
            After selecting an image, please upload it first before proceeding
          </p>
        )}
      </VStack>
    </div>
  );
};
