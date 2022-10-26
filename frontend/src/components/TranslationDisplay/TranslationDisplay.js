import React, { useEffect, useState } from "react";
import Axios from "axios";
import { TranslationBtn }from "@ac";
import { FcSpeaker } from "react-icons/fc";
import "./TranslationDisplay.css";

//TODO this is a hard coded id.  Should be replaced when this component is being called
const id = 2;

export const TranslationDisplay = () => {
  const [data, setData] = useState([]);
  const [translationText, setTranslationText] = useState();
  const [translationAudio, setTranslationAudio] = useState();
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState();

  const activeButtonClass = "btn-primary";
  const inactiveButtonClass = "btn-outline-dark";

  const getTranslations = async (id) => {
    let response = await Axios.get("/encyclopedia-translations/" + id);
    let translationData = response.data;

    setData([...translationData]);
    setTranslationText(translationData[0].translation_text);
    setTranslationAudio(translationData[0].translation_audio);
    setActiveButton(translationData[0].translation_language);
  };

  const handleSpeakerClick = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const toggleActiveBtn = (btn, status) => {
    btn.classList.add(status ? activeButtonClass : inactiveButtonClass);

    btn.classList.remove(status ? inactiveButtonClass : activeButtonClass);
  };

  const handleLanguageBtnClick = (e) => {
    e.preventDefault();
    let text = e.target.innerText;
    let selectedButton = e.target;
    let previousActiveBtn = document.querySelector("#" + activeButton);

    setActiveButton(text);

    toggleActiveBtn(previousActiveBtn, false);

    if (text !== activeButton) {
      toggleActiveBtn(selectedButton, true);
    }

    let selectedTranslation = data.find(
      (obj) => obj.translation_language === text
    );
    setTranslationText(selectedTranslation.translation_text);
    setTranslationAudio(selectedTranslation.translation_audio);
  };

  useEffect(() => {
    //TODO id is hardcoded for now, but will ultimate be passed a real id from whatever is calling this component
    getTranslations(id);
  }, []);

  const content = () => {
    if (data.length > 0) {
      return (
        <div className="text-border">
          <div className="btn-component">
            <FcSpeaker onClick={handleSpeakerClick} size={40} />

            <TranslationBtn
              clickhandler={handleLanguageBtnClick}
              data={data}
              activeButton={activeButton}
            />
          </div>
          {toggle && <audio controls src={translationAudio}></audio>}
          <p className="text-box">{translationText}</p>
        </div>
      );
    }
  };

  return <div>{content()}</div>;
};


