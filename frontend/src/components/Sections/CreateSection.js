import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AwsUpload } from "@ac";
import { useForm } from "react-hook-form";
import "./Sections.scss";
import {
  Box,
  useColorModeValue,
  Grid,
  GridItem,
  Button,
  VStack,
} from "@chakra-ui/react";

export const CreateSection = () => {
  // hooks for react-form-hok
  const {
    register,
    formState: { errors },
  } = useForm();

  const [section_id] = useState("");
  const [section_order, setSection_order] = useState("");
  const [lesson_id, setLesson_id] = useState("");
  const [chapter_id, setChapter_id] = useState("");
  const [course_id, setCourse_id] = useState("");
  const [section_name, setSection_name] = useState("");
  const [section_desc, setSection_desc] = useState("");
  const [section_content, setSection_content] = useState("");
  const [section_img, setSection_img] = useState("");
  const [is_essential, setIs_essential] = useState("");

  const [lessons, setLessons] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const request1 = Axios.get("/lessons");
    const request2 = Axios.get("/chapters");
    const request3 = Axios.get("/courses");
    Axios.all([request1, request2, request3])
      .then(
        Axios.spread((...responses) => {
          setLessons(responses[0].data);
          setChapters(responses[1].data);
          setCourses(responses[2].data);
        })
      )
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  }, []);
  const handleSubmit = (e) => {
    const section = {
      section_id,
      section_order,
      lesson_id,
      chapter_id,
      course_id,
      section_name,
      section_desc,
      section_content,
      section_img,
      is_essential,
    };
    Axios.post("/sections", section)
      .then((response) => {
        alert("Section created successfully", response);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  function updateImg(imageUrl) {
    setSection_img(imageUrl);
  }
  return (
    <Box
      className="form"
      bg={useColorModeValue("amtil.formbackground", "gray.900")}
      px={4}
      borderRadius="xl"
    >
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Add Section</h3>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colSpan={3} w="100%" h="100%">
            <AwsUpload
              label="Image:"
              value={section_img}
              name="section_img"
              updateImg={updateImg}
              onChange={(e) => setSection_img(e.target.value)}
            ></AwsUpload>
          </GridItem>
          <GridItem colSpan={3} w="80%" h="100%">
            <VStack spacing={1} align="auto">
              <label className="label-text">Section Name:</label>
              <input
                {...register("section_name")}
                type="text"
                required
                className="input-text"
                value={section_name}
                onChange={(e) => setSection_name(e.target.value)}
              />
              <label className="label-text">Section Order:</label>
              <input
                {...register("section_order")}
                type="text"
                required
                className="input-text"
                value={section_order}
                onChange={(e) => setSection_order(e.target.value)}
              />
              <label htmlFor="lesson_id" className="label-text">
                Lesson ID:
              </label>
              <select
                name="lesson_id"
                id="lesson_id"
                onChange={(e) => setLesson_id(e.target.value)}
              >
                <option value="">Lessons</option>
                {lessons.map((lesson) => (
                  <option
                    name="lesson_id"
                    key={lesson.lesson_id}
                    value={lesson.lesson_id}
                  >
                    {lesson.lesson_id}. {lesson.lesson_name}
                  </option>
                ))}
              </select>
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
              <label htmlFor="course_id" className="label-text">
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
              <label className="label-text">Content:</label>
              <input
                {...register("section_content")}
                type="text"
                required
                className="input-text"
                value={section_content}
                onChange={(e) => setSection_content(e.target.value)}
              />
              <label className="label-text">Is it essential?:</label>
              <input
                {...register("is_essential")}
                type="text"
                required
                className="input-text"
                value={is_essential}
                onChange={(e) => setIs_essential(e.target.value)}
              />
            </VStack>
          </GridItem>
          <GridItem colSpan={3} w="80%" h="200px">
            <VStack spacing={1} align="auto">
              <label className="desc_label label-text">Description:</label>
              <textarea
                {...register("section_desc")}
                className="description"
                required
                value={section_desc}
                onChange={(e) => setSection_desc(e.target.value)}
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
