import { capitalize as muiCapitalize } from "@mui/material/utils"

export function splitByCase(str: string): string[] {
  if (!str) return [];

  let currentWord = str[0];
  const result: string[] = [];
  for (let i = 1; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z") {
      result.push(currentWord);
      currentWord = str[i];
    } else currentWord += str[i];
  }
  result.push(currentWord);

  return result;
}

export function capitalize(str: string): string {
  return muiCapitalize(str);
}