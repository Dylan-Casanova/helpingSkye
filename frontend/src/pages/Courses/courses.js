import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { CourseEditTable, CourseReadTable, CreateCourse } from "@ac";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editFormatdata, setEditFormatdata] = useState({
    course_id: "",
    course_name: "",
    course_desc: "",
    course_img: "",
    course_complete_hours: "",
    complexity_level: "",
    course_content: "",
  });
  useEffect(() => {
    Axios.get("/courses")
      .then((res) => {
        setCourses([...res.data]);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  }, []);
  const updateImg = (imageUrl) => {
    setEditFormatdata({
      ...editFormatdata,
      course_img: imageUrl,
    });
  };
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
    const editedCourse = {
      ...editFormatdata,
    };
    const newCourse = [...courses];
    const index = courses.findIndex(
      (course) => course.course_id === editCourseId
    );
    newCourse[index] = editedCourse;
    setCourses(newCourse);
    setEditCourseId(null);
    Axios.patch(`/courses/${editFormatdata.course_id}`, editFormatdata)
      .then(() => {
        alert("Course Updated");
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  const handleEditClick = (event, course) => {
    event.preventDefault();
    setEditCourseId(course.course_id);
    const formValues = {
      ...course,
    };
    setEditFormatdata(formValues);
  };
  const handleCancelClick = (event) => {
    setEditCourseId(null);
  };
  const handleDeleteClick = (course_id) => {
    const newCourses = [...courses];

    const index = courses.findIndex((course) => course.course_id === course_id);
    Axios.delete("/courses/" + course_id)
      .then(() => {
        alert("Course Deleted");
        newCourses.splice(index, 1);
        setCourses(newCourses);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  return (
    <div className="container">
      <h3 className="table-title">Courses</h3>
      <form>
        <table>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              courses.map((course) => (
                <Fragment>
                  {editCourseId === course.course_id ? (
                    <CourseEditTable
                      uploadImg={updateImg}
                      editFormatdata={editFormatdata}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <CourseReadTable
                      course={course}
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
      <CreateCourse />
    </div>
  );
};

export default Courses;
