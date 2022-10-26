import React, { useEffect, useState } from "react";
import Axios from "axios";
import { AwsUpload } from "@ac";

export const SectionEditTable = ({
  editFormatdata,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  const [lessons, setLessons] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [s3Url, setS3Url] = useState("");
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

  const updateImg = (imageUrl) => {
    setS3Url(imageUrl);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="ID"
          name="section_id"
          value={editFormatdata.section_id}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="section_order"
          name="section_order"
          value={editFormatdata.section_order}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <p className="label-text">Lesson ID</p>
        <select
          name="lesson_id"
          id="lesson_id"
          onChange={handleEditFormChange}
          value={editFormatdata.lesson_id}
        >
          {React.Children.toArray(
            lessons.map((lesson) => (
              <option name="lesson_id" value={lesson.lesson_id}>
                {lesson.lesson_id}. {lesson.lesson_name}
              </option>
            ))
          )}
        </select>
      </td>
      <td>
        <p className="label-text">Chapter ID</p>
        <select
          name="chapter_id"
          id="chapter_id"
          onChange={handleEditFormChange}
          value={editFormatdata.chapter_id}
        >
          {React.Children.toArray(
            chapters.map((chapter) => (
              <option name="chapter_id" value={chapter.chapter_id}>
                {chapter.chapter_id}. {chapter.chapter_name}
              </option>
            ))
          )}
        </select>
      </td>
      <td>
        <p className="label-text">Course ID</p>
        <select
          name="course_id"
          id="course_id"
          onChange={handleEditFormChange}
          value={editFormatdata.course_id}
        >
          {React.Children.toArray(
            courses.map((course) => (
              <option name="course_id" value={course.course_id}>
                {course.course_id}. {course.course_name}
              </option>
            ))
          )}
        </select>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Name"
          name="section_name"
          value={editFormatdata.section_name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Description"
          name="section_desc"
          value={editFormatdata.section_desc}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Content"
          name="section_content"
          value={editFormatdata.section_content}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <AwsUpload editFormatdata={editFormatdata} updateImg={setS3Url} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="is_essential?"
          name="is_essential"
          value={editFormatdata.is_essential}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button
          variant="outline-primary"
          id="save-button"
          onClick={handleEditFormSubmit}
          type="submit"
        >
          Save
        </button>
      </td>
      <td>
        <button id="cancel-button" onClick={handleCancelClick} type="submit">
          Cancel
        </button>
      </td>
    </tr>
  );
};
