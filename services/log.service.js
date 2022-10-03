import chalk from "chalk";
import dedent from "dedent-js";
export const printError = (error) => {
    console.log(chalk.bgRed("ERROR!") + " " + chalk.red(error));
};

export const printSucces = (msg) => {
    console.log(chalk.bgGreen("Success!") + " " + chalk.green(msg));
};
export const printHelp = () => {
    console.log(
        dedent(`
        ${chalk.bgCyan(" HELP ")}
        Ob-havoni ko'rsatish uchun hech qanday parametr bermang
        Shaharni saqlash uchun ${chalk.yellow("-s [SHAHAR_NOMI]")} ni bering
        Yordam uchun ${chalk.yellow("-h")} parametrini bering
        Tokenni saqlash uchun ${chalk.yellow("-t [API_KEY]")} ni bering
        `)
    );
};

export const printWeather = (res, emoji) => {
    console.log(
        dedent(`
        ${chalk.bgYellow("  Ob-Havo  ")} 
        ${res.name} Shahri Ob-havosi
        ${emoji}  ${res.weather[0].description}
        Havo temperaturasi: ${res.main.temp} (${res.main.feels_like})
        Namlik: ${res.main.humidity}%
        Shamol tezligi: ${res.wind.speed} m/s
        `)
    );
};
