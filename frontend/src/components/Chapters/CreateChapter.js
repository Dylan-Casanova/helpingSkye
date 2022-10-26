import Axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { AwsUpload } from "@ac";
import { useForm } from "react-hook-form";
import "./Chapter.scss";
import {
  Box,
  useColorModeValue,
  Grid,
  GridItem,
  VStack,
  Button,
} from "@chakra-ui/react";

export const CreateChapter = () => {
  // hooks for react-form-hok
  const {
    register,
    formState: { errors },
  } = useForm();

  const [courses, setCourses] = useState([]);
  const [chapter_id] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [chapter_name, setChapter_name] = useState("");
  const [chapter_desc, setChapter_desc] = useState("");
  const [chapter_img, setChapter_img] = useState([]);
  const [chapter_complexity, setChapter_complexity] = useState("");
  const [chapter_prerequisites, setChapter_prerequisites] = useState("");
  const [chapter_content, setChapter_content] = useState("");

  useEffect(() => {
    Axios.get("/courses", {
      params: {
        columns: "course_id,course_name",
      },
    })
      .then((res) => {
        setCourses([...res.data]);
      })
      .catch((error) => {
        alert("Oh No, something went wrong. try again", error);
      });
  }, []);

  const handleSubmit = (e) => {
    const chapter = {
      course_id,
      chapter_id,
      chapter_name,
      chapter_desc,
      chapter_img,
      chapter_complexity,
      chapter_prerequisites,
      chapter_content,
    };
    Axios.post("/chapters", chapter)
      .then(() => {
        alert("Chapter Created");
      })
      .catch((error) => {
        alert("Oh No, something went wrong. try again", error);
      });
  };
  const updateImg = (imageUrl) => {
    setChapter_img(imageUrl);
  };

  return (
    <Box
      className="form"
      bg={useColorModeValue("amtil.formbackground", "gray.900")}
      px={4}
      borderRadius="xl"
    >
      <form id="form" onSubmit={handleSubmit}>
        <h3 className="form-title">Add Chapter</h3>
        <p className="label-text">Course ID</p>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="50%" h="50%">
            {React.Children.toArray(
              courses.map((course) => (
                <Fragment>
                  <label htmlFor={course.course_name} className="radio-label">
                    ({course.course_id}){course.course_name}
                  </label>
                  <input
                    {...register("course_id")}
                    type="radio"
                    className="radio-input"
                    id={course.coursename}
                    value={course.course_id}
                    name="course_id"
                    onChange={(e) => setCourse_id(e.target.value)}
                  />
                </Fragment>
              ))
            )}
          </GridItem>
          <GridItem w="100%" h="100%" className="upload-grid">
            <AwsUpload
              label="Image:"
              value={chapter_img}
              name="chapter_img"
              updateImg={updateImg}
              onChange={(e) => setChapter_img(e.target.value)}
            ></AwsUpload>
          </GridItem>
          <GridItem colSpan={1} w="80%" h="100%">
            <VStack align="auto">
              <label className="label-text">Chapter Name:</label>
              <input
                className="input-text"
                {...register("chapter_name")}
                type="text"
                required
                value={chapter_name}
                onChange={(e) => setChapter_name(e.target.value)}
              />
              <label className="label-text">Complexity:</label>
              <input
                {...register("chapter_complexity")}
                className="input-text"
                type="text"
                required
                value={chapter_complexity}
                onChange={(e) => setChapter_complexity(e.target.value)}
              />
              <label className="label-text">Content:</label>
              <input
                {...register("chapter_content")}
                type="text"
                required
                className="input-text"
                value={chapter_content}
                onChange={(e) => setChapter_content(e.target.value)}
              />
              <label className="label-text">Prerequisites:</label>
              <input
                {...register("chapter_prerequisites")}
                type="text"
                required
                className="margin-bottom input-text"
                value={chapter_prerequisites}
                onChange={(e) => setChapter_prerequisites(e.target.value)}
              />
            </VStack>
          </GridItem>
          <GridItem w="100%" h="100%">
            <VStack align="auto">
              <label className="label-text">Description:</label>
              <textarea
                {...register("chapter_desc")}
                className="description"
                required
                value={chapter_desc}
                onChange={(e) => setChapter_desc(e.target.value)}
              ></textarea>
              <Button
                className="primary-button"
                variant="outline"
                type="submit"
              >
                ADD
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};
