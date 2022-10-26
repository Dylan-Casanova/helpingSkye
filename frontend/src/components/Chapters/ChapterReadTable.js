import React from "react";
import { Button } from "@chakra-ui/react";

export const ChapterReadTable = ({
  chapter,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr>
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
      <td>
        <Button
          id="update-button"
          onClick={(event) => {
            handleEditClick(event, chapter);
          }}
          variant="outline"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDeleteClick(chapter.chapter_id)}
          id="delete-button"
          variant="outline"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
