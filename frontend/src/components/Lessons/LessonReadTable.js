import React from "react";
import { Button } from "@chakra-ui/react";

export const LessonReadTable = ({
  lesson,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr>
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
      <td>
        <Button
          id="update-button"
          onClick={(event) => {
            handleEditClick(event, lesson);
          }}
          variant="outline"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDeleteClick(lesson.lesson_id)}
          id="delete-button"
          variant="outline"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
