import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case "01":
            return "☀️";
        case "02":
            return "🌤";
        case "03":
        case "04":
            return "☁️";
        case "09":
            return "🌧";
        case "10":
            return "🌥";
        case "11":
            return "🌩";
        case "13":
            return "❄️";
        case "50":
            return "🌫";
    }
};

const getWeather = async (city) => {
    const token =
        process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

    if (!token) {
        throw new Error(
            "API key berilmagan, API keyni node weather.js -t [API_KEY] orqali bering"
        );
    }
    const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: token,
                lang: "uz",
                units: "metric",
            },
        }
    );
    // console.log(data);
    return data;
};

export { getWeather, getIcon };
