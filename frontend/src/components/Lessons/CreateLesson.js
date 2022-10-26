import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AwsUpload } from "@ac";
import { useForm } from "react-hook-form";
import "./Lessons.scss";
import {
  Box,
  useColorModeValue,
  Grid,
  GridItem,
  Button,
  VStack,
} from "@chakra-ui/react";

export const CreateLesson = () => {
  // hooks for react-form-hok
  const {
    register,
    formState: { errors },
  } = useForm();

  const [lesson_id] = useState("");
  const [lesson_order, setLesson_order] = useState("");
  const [chapter_id, setChapter_id] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [lesson_name, setLesson_name] = useState("");
  const [lesson_desc, setLesson_desc] = useState("");
  const [lesson_img, setLesson_img] = useState("");
  const [lesson_complexity, setLesson_complexity] = useState("");
  const [lesson_content, setLesson_content] = useState("");

  const handleSubmit = (e) => {
    const lesson = {
      lesson_id,
      lesson_order,
      chapter_id,
      course_id,
      lesson_name,
      lesson_desc,
      lesson_img,
      lesson_complexity,
      lesson_content,
    };
    Axios.post("/lessons", lesson)
      .then((response) => {
        alert("Lesson Created", response);
      })
      .catch((error) => {
        alert(
          "Oh no, something went wrong while creating the lesson. please try again",
          error
        );
      });
  };

  const updateImg = (imageUrl) => {
    setLesson_img(imageUrl);
  };
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const request1 = Axios.get("/chapters");
    const request2 = Axios.get("/courses");
    Axios.all([request1, request2])
      .then(
        Axios.spread((...responses) => {
          setChapters(responses[0].data);
          setCourses(responses[1].data);
        })
      )
      .catch((error) => {
        alert(
          "Oh no, something went wrong while fetching chapters and courses. please try again",
          error
        );
      });
  }, []);
  return (
    <Box
      className="form"
      bg={useColorModeValue("amtil.formbackground", "gray.900")}
      px={4}
      borderRadius="xl"
    >
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Add Lesson</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={3} w="100%" h="100%">
            <AwsUpload
              label="Image:"
              value={lesson_img}
              name="lesson_img"
              updateImg={updateImg}
              onChange={(e) => setLesson_img(e.target.value)}
            ></AwsUpload>
          </GridItem>
          <GridItem colSpan={3} w="80%" h="100%">
            <VStack spacing={1} align="auto">
              <label className="label-text">Lesson Name:</label>
              <input
                {...register("lesson_name")}
                type="text"
                required
                className="input-text"
                value={lesson_name}
                onChange={(e) => setLesson_name(e.target.value)}
              />
              <label className="label-text">Lesson Order:</label>
              <input
                {...register("lesson_order")}
                type="text"
                required
                className="input-text"
                value={lesson_order}
                onChange={(e) => setLesson_order(e.target.value)}
              />
              <label className="label-text"> Complexity Level:</label>
              <input
                {...register("lesson_complexity")}
                type="text"
                required
                className="input-text"
                value={lesson_complexity}
                onChange={(e) => setLesson_complexity(e.target.value)}
              />
              <label htmlFor="chapter_id" className="label-text">
                ChapterID:
              </label>
              <select
                name="chapter_id"
                className="select-bar"
                id="chapter_id"
                onChange={(e) => setChapter_id(e.target.value)}
              >
                <option value="">Chapters</option>
                {chapters.map((chapter) => (
                  <option
                    name="chapter_id"
                    key={chapter.chapter_id}
                    value={chapter.chapter_id}
                  >
                    {chapter.chapter_id}. {chapter.chapter_name}
                  </option>
                ))}
              </select>
              <label htmlFor="chapter_id" className="label-text">
                CourseID:
              </label>
              <select
                name="course_id"
                className="select-bar"
                id="course_id"
                onChange={(e) => setCourse_id(e.target.value)}
              >
                <option value="">Courses</option>
                {courses.map((course) => (
                  <option
                    name="course_id"
                    key={course.course_id}
                    value={course.course_id}
                  >
                    {course.course_id}. {course.course_name}
                  </option>
                ))}
              </select>
              <label className="label-text"> Content:</label>
              <input
                {...register("lesson_content")}
                type="text"
                required
                className="input-text"
                value={lesson_content}
                onChange={(e) => setLesson_content(e.target.value)}
              />
            </VStack>
          </GridItem>
          <GridItem colSpan={3} w="80%" h="200px">
            <VStack align="auto">
              <label className="desc_label label-text">Description:</label>
              <textarea
                {...register("lesson_desc")}
                className="description"
                required
                value={lesson_desc}
                onChange={(e) => setLesson_desc(e.target.value)}
              ></textarea>
              <Button
                className="primary-button"
                variant="outline"
                type="submit"
              >
                Add
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};
