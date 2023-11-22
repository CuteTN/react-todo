import { AppThemeOptions } from "./AppTheme.model";
import {
  amber,
  cyan,
  deepPurple,
  green,
  pink,
  purple,
  red,
  teal,
  blue,
  blueGrey,
  brown,
  deepOrange,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  yellow,
} from "@mui/material/colors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { splitByCase } from "../../utils/string.utils";
import { capitalize } from "@mui/material/utils";
import { FormatMessageFunction } from "../../i18n/messages/FormatMessage.model";

function createMuiColorTheme(muiColorName: string, muiColor: any): AppThemeOptions {
  const words = splitByCase(muiColorName);
  function nameGetter(fm: FormatMessageFunction): string {
    const intlColorName = (fm(`common.colors.${muiColorName}` as any) ?? "").split(" ").map(capitalize).join(" ");
    return fm("common.msgThemeName", { name: intlColorName });
  }

  return {
    id: words.map((str) => str.toLowerCase()).join("-") + "-theme",
    nameGetter,
    iconRenderer: () => <ColorLensIcon style={{ color: muiColor[500] }} />,
    themeOptions: {
      palette: {
        background: {
          default: muiColor[100],
          paper: muiColor[50],
        },
        primary: {
          main: muiColor[300],
          dark: muiColor[400],
        },
        secondary: {
          main: muiColor[200],
          dark: muiColor[300],
        },
        text: {
          primary: muiColor[900],
          secondary: muiColor[900],
        },
      },
    },
  };
}

const muiColors = {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
};

export const colorThemes = Object.entries(muiColors).map(([key, value]) => {
  return createMuiColorTheme(key, value);
});
