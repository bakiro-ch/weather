import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// https://api.openweathermap.org/data/2.5/weather?lat=35.0617268&lon=-1.4318326&appid=65381f7cdf92381348a7fb9f544b20e1
// https://api.openweathermap.org/data/2.5/wheather?lat=35.0617268&lon=-1.4318326&appid=65381f7cdf92381348a7fb9f544b20e1
