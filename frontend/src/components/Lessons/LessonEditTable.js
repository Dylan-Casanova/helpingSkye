import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AwsUpload } from "@ac";

export const LessonEditTable = ({
  editFormatdata,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [s3Url, setS3Url] = useState("");
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
          "Oh no, something went wrong while fetching the data. please try again",
          error
        );
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
          name="lesson_id"
          value={editFormatdata.lesson_id}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="ID"
          name="lesson_order"
          value={editFormatdata.lesson_order}
          onChange={handleEditFormChange}
        />
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
              <option name="chapterid" value={chapter.chapter_id}>
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
              <option name="courseid" value={course.course_id}>
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
          name="lesson_name"
          value={editFormatdata.lesson_name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Description"
          name="lesson_desc"
          value={editFormatdata.lesson_desc}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <AwsUpload editFormatdata={editFormatdata} updateImg={setS3Url} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Complexity"
          name="lesson_complexity"
          value={editFormatdata.lesson_complexity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Content"
          name="lesson_content"
          value={editFormatdata.lesson_content}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button id="save-button" onClick={handleEditFormSubmit} type="submit">
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
