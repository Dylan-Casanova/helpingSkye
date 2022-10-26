import React, { useEffect, useState } from "react";
import Axios from "axios";
import { AwsUpload } from "@ac";

export const ChapterEditTable = ({
  editFormatdata,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  const [courses, setCourses] = useState([]);
  const [s3Url, setS3Url] = useState("");
  useEffect(() => {
    Axios.get("/courses")
      .then((res) => {
        setCourses([...res.data]);
      })
      .catch((error) => {
        alert(error);
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
          name="chapter_id"
          value={editFormatdata.chapter_id}
          onChange={handleEditFormChange}
        />
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
              <option name="cert_id" value={course.course_id}>
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
          name="chapter_name"
          value={editFormatdata.chapter_name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Description"
          name="chapter_desc"
          value={editFormatdata.chapter_desc}
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
          placeholder="Chapter Complexity"
          name="chapter_complexity"
          value={editFormatdata.chapter_complexity}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Chapter Content"
          name="chapter_content"
          value={editFormatdata.chapter_content}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Chapter Prerequisites"
          name="chapter_prerequisites"
          value={editFormatdata.chapter_prerequisites}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button
          variant="outline"
          id="save-button"
          onClick={handleEditFormSubmit}
          type="submit"
        >
          Save
        </button>
      </td>
      <td>
        <button
          variant="outline"
          id="cancel-button"
          onClick={handleCancelClick}
          type="submit"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
