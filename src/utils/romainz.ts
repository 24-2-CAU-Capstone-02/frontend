import { Romanize } from "hangul-romanize";

export const getRomanizedName = (name: string): string => {
    return Romanize.romanize(name).replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};