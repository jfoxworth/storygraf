import React from "react";
import { Button } from "react-bootstrap";
import { BsFillTrashFill, BsGear } from "react-icons/bs";

const EditButtons = ({
  article,
  handleShowEditArticle,
  handleShowDeleteItem,
}) => {
  const deleteThisArticle = (article) => {
    handleShowDeleteItem(true, article);
  };

  return (
    <div className={"p-2 d-flex justify-content-between"}>
      <Button
        variant="outline-secondary"
        className="icon-button px-0 py-1 ml-5"
        style={{
          fontSize: "0.8em",
          width: "30px",
          height: "30px",
        }}
        onClick={() => deleteThisArticle(article)}
      >
        <BsFillTrashFill />
      </Button>
      <Button
        variant="outline-secondary"
        className="icon-button px-0 py-1 ml-5"
        style={{
          fontSize: "0.8em",
          width: "30px",
          height: "30px",
        }}
        onClick={() => handleShowEditArticle(true, article)}
      >
        <BsGear />
      </Button>
    </div>
  );
};

export default EditButtons;
