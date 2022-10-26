import React from "react";
import { Button } from "react-bootstrap";
import "./textTranslationBtn.css";

export const TranslationBtn = (props) => {
  return (
    <div>
      {props.data.map(function (item, index) {
        return (
          <Button
            variant={index === 0 ? "primary" : "outline-dark"}
            id={item.translation_language}
            onClick={props.clickhandler}
            className="btns"
            key={index}
          >
            {item.translation_language}
          </Button>
        );
      })}
    </div>
  );
};


