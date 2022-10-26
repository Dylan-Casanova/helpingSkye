import React, { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { AwsUpload } from "@ac";
import { Button, VStack } from "@chakra-ui/react";
import "./Course.scss";

export function CreateCourse() {
  // hooks for react-form-hok
  const {
    register,
    formState: { errors },
  } = useForm();

  const [course_id] = useState("");
  const [course_name, setCourse_name] = useState("");
  const [course_desc, setCourse_desc] = useState("");
  const [course_img, setCourse_img] = useState("");
  const [course_complete_hours, setCourse_complete_hours] = useState("");
  const [complexity_level, setComplexity_level] = useState("");
  const [course_content, setCourse_content] = useState("");

  const handleSubmit = (data) => {
    const course = {
      course_id,
      course_name,
      course_desc,
      course_img,
      course_complete_hours,
      complexity_level,
      course_content,
    };
    Axios.post("/courses", course)
      .then((res) => {
        alert("Course Created");
      })
      .catch((error) => {
        alert("Oh NO, something went wrong. try again", error);
      });
  };
  const updateImg = (imageUrl) => {
    setCourse_img(imageUrl);
  };

  const toggleForm = () => {
    document.querySelector("#plusIcon").classList.toggle("rotatePlus");
    document.querySelector("#form").classList.toggle("collapse");
  };
  return (
    <>
      <div className="container">
        <button className="addCert" onClick={toggleForm}>
          <h3 className="accordion-title">Add Course</h3>
          <svg
            id="plusIcon"
            width={14}
            className="plusIcon"
            viewBox="0 0 448 512"
          >
            <path
              className="icn"
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            ></path>
          </svg>
        </button>
      </div>
      <form id="form" className="grey collapse" onSubmit={handleSubmit}>
        <AwsUpload
          label="Image:"
          value={course_img}
          name="course_img"
          updateImg={updateImg}
          onChange={(e) => setCourse_img(e.target.value)}
        ></AwsUpload>
        <VStack spacing={1} align="auto">
          <label className="label-text">Name:</label>
          <input
            {...register("course_name")}
            type="text"
            className="input-text"
            required
            value={course_name}
            onChange={(e) => setCourse_name(e.target.value)}
          />
          <label className="label-text">Complexity Level:</label>
          <input
            {...register("complexity_level")}
            type="text"
            required
            className="input-text"
            value={complexity_level}
            onChange={(e) => setComplexity_level(e.target.value)}
          />
          <label className="label-text">Hours Completed:</label>
          <input
            {...register("course_complete_hours")}
            type="text"
            className="input-text"
            required
            value={course_complete_hours}
            onChange={(e) => setCourse_complete_hours(e.target.value)}
          />
          <label className="label-text">Content:</label>
          <input
            {...register("course_content")}
            type="text"
            className="input-text"
            required
            value={course_content}
            onChange={(e) => setCourse_content(e.target.value)}
          />
          <label className="desc_label label-text">Description:</label>
          <textarea
            {...register("course_desc")}
            className="description"
            required
            value={course_desc}
            onChange={(e) => setCourse_desc(e.target.value)}
          ></textarea>
          <Button className="primary-button" variant="outline" type="submit">
            ADD
          </Button>
        </VStack>
      </form>
    </>
  );
}
