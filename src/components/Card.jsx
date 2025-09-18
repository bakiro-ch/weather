import { FaCloud } from "react-icons/fa";
import { useWeatherApi } from "../hooks/useWeatherApi";
import moment from "moment/min/moment-with-locales";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { dir } from "i18next";

export default function Card() {
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();
  //   useEffect(() => {
  //     i18n.changeLanguage(lang);
  //   }, [lang]);

  const { temp, date } = useWeatherApi(moment, lang);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-blue-700 w-full h-screen flex items-center justify-center"
    >
      <div className=" max-w-110 w-5/12 min-w-80 h-6/12 md:h-6/12  max-h-80 flex-col flex items-center gap-y-1 justify-center">
        <div className="bg-blue-900 text-white rounded-2xl w-full h-full shadow-2xl">
          <div className="flex justify-around h-1/4 items-center">
            <h1 className="text-3xl">{t("Al-Riyadh")}</h1>
            <h4 className="text-sm text-white/90 w-20 ">{date} </h4>
          </div>
          <hr className="rounded-2xl mx-4 border-1" />
          <div className="flex justify-between px-5 lg:px-10 items-center h-43 lg:h-51">
            <div>
              <FaCloud size={130} />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex justify-center items-center gap-5">
                <img src={temp.icon} alt="icon" width={70} height={50} />
                <h1 className="text-5xl md:text-7xl">{temp.temp}</h1>
              </div>

              <p className="text-gray-300 font-extralight">
                {t(temp.description)}
              </p>
              <div className="flex justify-center gap-4 font-extralight text-gray-400">
                <p>
                  {t("min")}:{temp.min}
                </p>
                <p className="font-extrabold">|</p>
                <p>
                  {t("max")}:{temp.max}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div dir="ltr" className="flex w-full">
          <button
            onClick={() => {
              if (lang === "ar") {
                setLang("en");
                i18n.changeLanguage("en");
              } else {
                setLang("ar");
                i18n.changeLanguage("ar");
              }
              // setDate(moment().format("MMMM Do YYYY"));
            }}
            className=" text-white px-4 py-2 rounded-2xl cursor-pointer text-left bg-transparent hover:bg-blue-800/50"
          >
            {lang === "en" ? "Arabic" : "انجليزي"}
          </button>
        </div>
      </div>
    </div>
  );
}
