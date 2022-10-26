import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { CreateSection, SectionEditTable, SectionReadTable } from "@ac";

function Sections() {
  const [sections, setSections] = useState([]);
  const [editSectionId, setEditSectionId] = useState(null);
  const [editFormatdata, setEditFormatdata] = useState({
    section_id: "",
    section_name: "",
    section_desc: "",
    section_img: "",
    is_essential: "",
  });
  useEffect(() => {
    Axios.get("/sections")
      .then((res) => {
        setSections([...res.data]);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
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
    const editedSection = {
      ...editFormatdata,
    };
    const newSection = [...sections];
    const index = sections.findIndex(
      (section) => section.section_id === editSectionId
    );
    newSection[index] = editedSection;
    setSections(newSection);
    setEditSectionId(null);
    Axios.patch("/sections/" + editFormatdata.section_id, editFormatdata).then(
      () => {
        alert("Section updated successfully");
      }
    );
  };
  const handleEditClick = (event, section) => {
    event.preventDefault();
    setEditSectionId(section.section_id);
    const formValues = {
      ...section,
    };
    setEditFormatdata(formValues);
  };
  const handleCancelClick = (event) => {
    setEditSectionId(null);
  };
  const handleDeleteClick = (section_id) => {
    const newSection = [...sections];
    const index = sections.findIndex(
      (section) => section.section_id === section_id
    );
    Axios.delete("/sections/" + section_id).then(() => {
      alert("Sections deleted");
      newSection.splice(index, 1);
      setSections(newSection);
    });
  };
  return (
    <div className="container">
      <CreateSection />
      <h3 className="table-title">Sections</h3>
      <form>
        <table size="sm" className="table">
          <thead>
            <tr>
              <th>Section ID</th>
              <th>Section Order</th>
              <th>Lesson ID</th>
              <th>Chapter ID</th>
              <th>Course ID</th>
              <th>Section Name</th>
              <th>Description</th>
              <th>Content</th>
              <th>Image</th>
              <th>Is It Essential?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              sections.map((section) => (
                <Fragment>
                  {editSectionId === section.section_id ? (
                    <SectionEditTable
                      editFormatdata={editFormatdata}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <SectionReadTable
                      section={section}
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
export default Sections;
