import axios from "axios";
// import moment from "moment/min/moment-with-locales";

import { useEffect, useState } from "react";

export const useWeatherApi = (moment, lang) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    moment.locale(lang === "ar" ? "ar" : "en");
    setDate(moment().format("MMMM Do YYYY"));
  }, [lang]);

  const [temp, setTemp] = useState({
    temp: null,
    min: null,
    max: null,
    description: "",
    icon: null,
  });

  useEffect(() => {
    const date = moment().format("MMMM Do YYYY");

    setDate(date);

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchApi() {
      try {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?lat=40.2253569&lon=-82.6881395&appid=65381f7cdf92381348a7fb9f544b20e1",
          { signal }
        );

        if (!signal.aborted) {
          const tmp = Math.round(data.main.temp - 273.15);
          const tmp_min = Math.round(data.main.temp_min - 273.15);
          const tmp_max = Math.round(data.main.temp_max - 273.15);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;
          //   const date = new Date().;

          setTemp({
            temp: tmp,
            min: tmp_min,
            max: tmp_max,
            description: desc,
            icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          });
        }
      } catch (err) {
        if (signal.aborted) {
          // الآن فقط تطبع الرسالة إذا فعلاً أُلغي الطلب قبل أن ينتهي
          console.log("✅ Request was really canceled");
        } else {
          console.error("❌ Error in request:", err.message);
        }
      }
    }

    fetchApi();

    return () => {
      controller.abort();
    };
  }, []);

  return { temp, date };
};

// import axios from "axios";
// import moment from "moment/min/moment-with-locales";

// import { useEffect, useState } from "react";

// export const useWeatherApi = () => {
//   moment.locale("ar");
//   const [date, setDate] = useState("");
//   const [temp, setTemp] = useState({
//     temp: null,
//     min: null,
//     max: null,
//     description: "",
//     icon: null,
//   });

//   useEffect(() => {
//     const date = moment().format("MMMM Do YYYY");

//     setDate(date);

//     const controller = new AbortController();
//     const signal = controller.signal;

//     async function fetchApi() {
//       try {
//         const { data } = await axios.get(
//           "https://api.openweathermap.org/data/2.5/weather?lat=40.2253569&lon=-82.6881395&appid=65381f7cdf92381348a7fb9f544b20e1",
//           { signal }
//         );

//         if (!signal.aborted) {
//           const tmp = Math.round(data.main.temp - 273.15);
//           const tmp_min = Math.round(data.main.temp_min - 273.15);
//           const tmp_max = Math.round(data.main.temp_max - 273.15);
//           const desc = data.weather[0].description;
//           const icon = data.weather[0].icon;
//           //   const date = new Date().;

//           setTemp({
//             temp: tmp,
//             min: tmp_min,
//             max: tmp_max,
//             description: desc,
//             icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
//           });
//         }
//       } catch (err) {
//         if (signal.aborted) {
//           // الآن فقط تطبع الرسالة إذا فعلاً أُلغي الطلب قبل أن ينتهي
//           console.log("✅ Request was really canceled");
//         } else {
//           console.error("❌ Error in request:", err.message);
//         }
//       }
//     }

//     fetchApi();

//     return () => {
//       controller.abort();
//     };
//   }, []);

//   return { temp, date };
// };
