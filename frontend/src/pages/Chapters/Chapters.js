import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { CreateChapter, ChapterEditTable, ChapterReadTable } from "@ac";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [editChapterId, setEditChapterId] = useState(null);
  const [editFormatdata, setEditFormatdata] = useState({
    chapter_id: "",
    chapter_name: "",
    chapter_desc: "",
    chapter_img: "",
    chapter_complexity: "",
    chapter_prerequisites: "",
  });
  useEffect(() => {
    Axios.get("/chapters")
      .then((res) => {
        setChapters([...res.data]);
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
    const editedChapter = {
      ...editFormatdata,
    };
    const newChapter = [...chapters];
    const index = chapters.findIndex(
      (chapter) => chapter.chapter_id === editChapterId
    );
    newChapter[index] = editedChapter;
    setChapters(newChapter);
    setEditChapterId(null);
    Axios.patch("/chapters/" + editFormatdata.chapter_id, editFormatdata)
      .then(() => {
        alert("Chapter updated successfully");
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  const handleEditClick = (event, chapter) => {
    event.preventDefault();
    setEditChapterId(chapter.chapter_id);
    const formValues = {
      ...chapter,
    };
    setEditFormatdata(formValues);
  };
  const handleCancelClick = (event) => {
    setEditChapterId(null);
  };
  const handleDeleteClick = (chapter_id) => {
    const newChapter = [...chapters];
    const index = chapters.findIndex(
      (chapter) => chapter.chapter_id === chapter_id
    );
    Axios.delete("/chapters/" + chapter_id)
      .then(() => {
        alert("Chapter deleted successfully");
        newChapter.splice(index, 1);
        setChapters(newChapter);
      })
      .catch((error) => {
        alert("Oh no, something went wrong. please try again", error);
      });
  };
  return (
    <div className="container">
      <CreateChapter />
      <h3 className="table-title">Chapters</h3>
      <form>
        <table size="sm" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Chapter Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Complexity</th>
              <th>Content</th>
              <th>Prerequisites</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {React.Children.toArray(
              chapters.map((chapter) => (
                <Fragment>
                  {editChapterId === chapter.chapter_id ? (
                    <ChapterEditTable
                      editFormatdata={editFormatdata}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ChapterReadTable
                      chapter={chapter}
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
};
export default Chapters;
