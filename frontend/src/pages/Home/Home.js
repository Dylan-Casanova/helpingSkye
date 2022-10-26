import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Button, Box, Table } from "@chakra-ui/react";

import "./Home.scss";

// creating views for all tables

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [uProgress, setUprogress] = useState([]);
  const [openSection1, setOpenSection1] = useState(true);
  const [openSection2, setOpenSection2] = useState(true);
  const [openSection3, setOpenSection3] = useState(true);
  const [openSection4, setOpenSection4] = useState(true);
  const [openSection5, setOpenSection5] = useState(true);

  useEffect(() => {
    const request1 = Axios.get("/courses");
    const request2 = Axios.get("/sections");
    const request3 = Axios.get("/chapters");
    const request4 = Axios.get("/lessons");
    Axios.all([request1, request2, request3, request4])
      .then(
        Axios.spread((...responses) => {
          setCourses([...responses[0].data]);
          setSections([...responses[1].data]);
          setChapters([...responses[2].data]);
          setLessons([...responses[3].data]);
        })
      )
      .catch((errors) => {
        alert("Oh no, something went wrong. please try again", errors);
      });
  }, []);
  const toggleAccordion = () => {
    toggleSection1();
    if (openSection1 === openSection2) {
      toggleSection2();
    }
    if (openSection1 === openSection3) {
      toggleSection3();
    }
    if (openSection1 === openSection4) {
      toggleSection4();
    }
    if (openSection1 === openSection5) {
      toggleSection5();
    }
  };
  const toggleSection1 = () => {
    document.querySelector("#icon1").classList.toggle("rotate");
    document.querySelector("#accordion1").classList.toggle("collapse");
    setOpenSection1(!openSection1 === true);
  };
  const toggleSection2 = () => {
    document.querySelector("#icon2").classList.toggle("rotate");
    document.querySelector("#accordion2").classList.toggle("collapse");
    setOpenSection2(!openSection2 === true);
  };
  const toggleSection3 = () => {
    document.querySelector("#icon3").classList.toggle("rotate");
    document.querySelector("#accordion3").classList.toggle("collapse");
    setOpenSection3(!openSection3 === true);
  };
  const toggleSection4 = () => {
    document.querySelector("#icon4").classList.toggle("rotate");
    document.querySelector("#accordion4").classList.toggle("collapse");
    setOpenSection4(!openSection4 === true);
  };
  const toggleSection5 = () => {
    document.querySelector("#icon5").classList.toggle("rotate");
    document.querySelector("#accordion5").classList.toggle("collapse");
    setOpenSection5(!openSection5 === true);
  };
  return (
    <Container maxW="container.xl">
      <Box id="expandCollapse">
        <Button
          id="expandCollapseButton"
          variant="outline"
          colorScheme="grey.400"
          onClick={toggleAccordion}
        >
          Expand/Collapse
        </Button>
      </Box>
      <div>
        <button className="accordion" onClick={toggleSection1}>
          <h3 className="accordion-title">Courses</h3>
          <svg
            id="icon1"
            className="accordion-icon"
            width={18}
            viewBox="0 0 530 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
      </div>
      <Box id="accordion1" className="collapse">
        {/* certifications table */}
        <Table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Hours Completed</th>
              <th>Complexity Level</th>
              <th>Last Updated</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.course_desc}</td>
                <td>
                  <img
                    width="220"
                    height="210"
                    src={course.course_img}
                    alt={course.course_name}
                  />
                </td>
                <td>{course.course_complete_hours}</td>
                <td>{course.complexity_level}</td>
                <td>{course.last_updated}</td>
                <td>{course.course_content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <div>
        <button className="accordion" onClick={toggleSection2}>
          <h3 className="accordion-title">Chapters</h3>
          <svg
            id="icon2"
            className="accordion-icon"
            width={18}
            viewBox="0 0 530 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
      </div>
      <Box id="accordion2" className="collapse">
        {/* Chapters Table */}
        <Table striped bordered hover size="sm" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Chapter Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Complexity</th>
              <th>Content</th>
              <th>Prereq.</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter, index2) => (
              <tr key={index2}>
                <td>{chapter.chapter_id}</td>
                <td>{chapter.course_id}</td>
                <td>{chapter.chapter_name}</td>
                <td>{chapter.chapter_desc}</td>
                <td>
                  <img
                    width="220"
                    height="210"
                    src={chapter.chapter_img}
                    alt={chapter.chapter_name}
                  />
                </td>
                <td>{chapter.chapter_complexity}</td>
                <td>{chapter.chapter_content}</td>
                <td>{chapter.chapter_prerequisites}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <div>
        <button className="accordion" onClick={toggleSection3}>
          <h3 className="accordion-title">Sections</h3>
          <svg
            id="icon3"
            className="accordion-icon"
            width={18}
            viewBox="0 0 530 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
      </div>
      <Box id="accordion3" className="collapse">
        {/* sections Table */}
        <Table striped bordered hover size="sm" className="table">
          <thead>
            <tr>
              <th>Section ID</th>
              <th>Section Order</th>
              <th>Lesson ID</th>
              <th>Chapter ID</th>
              <th>Course ID</th>
              <th>Section Name</th>
              <th>Description</th>
              <th>Content</th>
              <th>Image</th>
              <th>Is It Essential?</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index3) => (
              <tr key={index3}>
                <td>{section.section_id}</td>
                <td>{section.section_order}</td>
                <td>{section.lesson_id}</td>
                <td>{section.chapter_id}</td>
                <td>{section.course_id}</td>
                <td>{section.section_name}</td>
                <td>{section.section_desc}</td>
                <td>{section.section_content}</td>
                <td>
                  <img
                    width="220"
                    height="210"
                    src={section.section_img}
                    alt={section.section_name}
                  />
                </td>
                <td>{section.is_essential}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <div>
        <button className="accordion" onClick={toggleSection4}>
          <h3 className="accordion-title">Lessons</h3>
          <svg
            id="icon4"
            className="accordion-icon"
            width={18}
            viewBox="0 0 530 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
      </div>
      <Box id="accordion4" className="collapse">
        {/* lessons Table */}
        <Table striped bordered hover size="sm" className="table">
          <thead>
            <tr>
              <th>Lesson ID</th>
              <th>Lesson Order</th>
              <th>Chapter ID</th>
              <th>Course ID</th>
              <th>Lesson Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Complexity Level</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index4) => (
              <tr key={index4}>
                <td>{lesson.lesson_id}</td>
                <td>{lesson.lesson_order}</td>
                <td>{lesson.chapter_id}</td>
                <td>{lesson.course_id}</td>
                <td>{lesson.lesson_name}</td>
                <td>{lesson.lesson_desc}</td>
                <td>
                  <img
                    width="220"
                    height="210"
                    src={lesson.lesson_img}
                    alt={lesson.lesson_name}
                  />
                </td>
                <td>{lesson.lesson_complexity}</td>
                <td>{lesson.lesson_content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <div>
        <button className="accordion" onClick={toggleSection5}>
          <h3 className="accordion-title">User Progress</h3>
          <svg
            id="icon5"
            className="accordion-icon "
            width={18}
            viewBox="0 0 530 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
      </div>
      <Box id="accordion5" className="collapse">
        {/* User Progress Table */}
        <Table striped bordered hover size="sm" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>User name</th>
              <th>Content ID</th>
              <th>Prgoress Mark</th>
            </tr>
          </thead>
          <tbody>
            {uProgress.map((u_Progress, index5) => (
              <tr key={index5}>
                <td>{u_Progress.userprog_id}</td>
                <td>{u_Progress.userid}</td>
                <td>{u_Progress.username}</td>
                <td>{u_Progress.content_id}</td>
                <td>{u_Progress.progress_mark}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default Home;
