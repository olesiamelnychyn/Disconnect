import React from "react";
import USAFlag from "../../public/assets/usa_icon.png";
import "./LanguageBar.scss";
import { withTranslation, useTranslation, Trans } from "react-i18next";

const changeLang = (lang, i18n) => {
  i18n.changeLanguage(lang);
};

function LanguageBar() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="switch-button" >
        <input className="switch-button-checkbox" type="checkbox" onClick={() => changeLang(t("common.language"), i18n)}></input>
        <label className="switch-button-label">
          <span className="switch-button-label-span">
            <img className="USAflag" src={USAFlag} alt="english_lang" />
          </span>
        </label>
      </div>
    </div>
  );
}

export default LanguageBar;
