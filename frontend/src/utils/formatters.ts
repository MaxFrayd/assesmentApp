import { HumanName } from "../__generated__/graphql-generated";

export const buildFullName = ({
  title,
  firstName,
  lastName,
  middleNames,
}: HumanName): string => {
  const ret: string[] = [];

  if (title) {
    ret.push(title);
  }
  if (firstName) {
    ret.push(firstName);
  }
  if (middleNames && middleNames.length > 0) {
    middleNames.forEach((middleName) => {
      if (middleName) {
        ret.push(middleName);
      }
    });
  }
  if (lastName) {
    ret.push(lastName);
  }

  return ret.join(" ");
};
