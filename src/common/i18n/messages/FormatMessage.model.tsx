import { TranslationKeys } from "./TranslationKey.model";

export type FormatMessageFunction = (id: TranslationKeys, value?: any) => string;
