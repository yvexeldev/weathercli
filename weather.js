import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
    printHelp,
    printSucces,
    printError,
    printWeather,
} from "./services/log.service.js";
import {
    saveKeyValue,
    TOKEN_DICTIONARY,
    getKeyValue,
} from "./services/storage.service.js";
// import { API_KEY } from "./key.json";

// #!usr/bin/env/ node

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token Berilmadi!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSucces("Token saqlandi!");
    } catch (err) {
        printError(err.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("Shahar Berilmadi!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSucces("Shahar saqlandi!");
    } catch (err) {
        printError(err.message);
    }
};

const getForcast = async () => {
    try {
        const city =
            process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError(
                "Shahar noto'g'ri kiritilgan! Shaharni -s [SHAHAR_NOMI] bilan kiriting"
            );
        } else if (e?.response?.status === 401) {
            printError(
                "Token notogri kiritilgan, tokenni -t [API_TOKEN] orqali kiriting!"
            );
        } else {
            printError(e.message);
        }
    }
};

const initCli = () => {
    const args = getArgs(process.argv);
    // console.log(process.env);
    // console.log(args);
    if (args.s) {
        return saveCity(args.s);
        // Shaharni saqlash
    }
    if (args.h) {
        // Yordam yani help ni chiqarish
        return printHelp();
    }

    if (args.t) {
        // Tokenni yangilash
        return saveToken(args.t);
    }
    return  getForcast();
    // getWeather("mosco ");
    // Obhavoni ekranga chiqarish
};

initCli();
