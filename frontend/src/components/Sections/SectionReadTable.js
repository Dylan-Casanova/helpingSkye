import { Button } from "@chakra-ui/react";
import React from "react";

export const SectionReadTable = ({
  section,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <tr>
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
      <td>
        <Button
          id="update-button"
          onClick={(event) => {
            handleEditClick(event, section);
          }}
          variant="outline"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDeleteClick(section.section_id)}
          id="delete-button"
          variant="outline"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
