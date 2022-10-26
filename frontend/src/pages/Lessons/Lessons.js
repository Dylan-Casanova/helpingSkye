import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { CreateLesson, LessonEditTable, LessonReadTable } from "@ac";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [editLessonId, setEditLessonId] = useState(null);
  const [editFormatdata, setEditFormatdata] = useState({
    lesson_id: "",
    lesson_order: "",
    chapter_id: "",
    course_id: "",
    lesson_name: "",
    lesson_desc: "",
    lesson_img: "",
    lesson_complexity: "",
    lesson_content: "",
  });
  useEffect(() => {
    Axios.get("/lessons")
      .then((res) => {
        setLessons([...res.data]);
      })
      .catch((error) => {
        alert(
          "Oh no, something went wrong while getting the lessons. please try again",
          error
        );
      });
  }, []);
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormatdata };
    newFormData[fieldName] = fieldValue;
    setEditFormatdata(newFormData);
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedLesson = {
      ...editFormatdata,
    };
    const newLesson = [...lessons];
    const index = lessons.findIndex(
      (lesson) => lesson.lesson_id === editLessonId
    );
    newLesson[index] = editedLesson;
    setLessons(newLesson);
    setEditLessonId(null);
    Axios.patch("/lessons/" + editFormatdata.lesson_id, editFormatdata)
      .then(() => {
        alert("Lesson Updated");
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  const handleEditClick = (event, lesson) => {
    event.preventDefault();
    setEditLessonId(lesson.lesson_id);
    const formValues = {
      ...lesson,
    };
    setEditFormatdata(formValues);
  };
  const handleCancelClick = (event) => {
    setEditLessonId(null);
  };
  const handleDeleteClick = (lesson_id) => {
    const newLessons = [...lessons];
    const index = lessons.findIndex((lesson) => lesson.lesson_id === lesson_id);
    Axios.delete("/lessons/" + lesson_id)
      .then(() => {
        alert("Lesson deleted successfully");
        newLessons.splice(index, 1);
        setLessons(newLessons);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  return (
    <div className="container">
      <CreateLesson />
      <h3 className="table-title">Lessons</h3>
      <form>
        <table size="sm" className="table">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              lessons.map((lesson, index) => (
                <Fragment>
                  {editLessonId === lesson.lesson_id ? (
                    <LessonEditTable
                      editFormatdata={editFormatdata}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <LessonReadTable
                      lesson={lesson}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Lessons;
