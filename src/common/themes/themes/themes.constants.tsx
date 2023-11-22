import { darkTheme } from "./dark-theme.constant";
import { lightTheme } from "./light-theme.constant";
import { colorThemes } from "./color-themes.constant";

export const themeOptions = [lightTheme, darkTheme, ...Object.values(colorThemes)];
