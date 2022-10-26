import React, { useState } from "react";
import { AwsUpload } from "@ac";

export const CourseEditTable = ({
  editFormatdata,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  const [s3Url, setS3Url] = useState("");

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
          name="course_id"
          value={editFormatdata.course_id}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Name"
          name="course_name"
          value={editFormatdata.course_name}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Description"
          name="course_desc"
          value={editFormatdata.course_desc}
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
          placeholder="Hours Completed"
          name="course_complete_hours"
          value={editFormatdata.course_complete_hours}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Complexity Level"
          name="complexity_level"
          value={editFormatdata.complexity_level}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Last Updated"
          name="last_updated"
          value={editFormatdata.last_updated}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Content"
          name="course_content"
          value={editFormatdata.course_content}
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
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
