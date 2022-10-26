import React from "react";
import { Button } from "@chakra-ui/react";
export const CourseReadTable = ({ course, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
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
      <td>
        <Button
         id="update-button"
          onClick={(event) => {
            handleEditClick(event, course);
          }}
          variant="outline"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDeleteClick(course.course_id)}
          id="delete-button"
          variant="outline"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};


