import { Patient, Resolvers } from "../__generated__/resolvers-types";
import { randomUUID } from "crypto";

const expectedToken = "avelios-medical";

const patients: Patient[] = [
  {
    id: randomUUID(),
    name: {
      firstName: "Frank",
      lastName: "Müller",
    },
    address: {
      id: randomUUID(),
      street: "Teststreet",
      houseNumber: "1",
      addition: "a",
    },
  },
];

export const resolvers: Resolvers = {
  Query: {
    listPatients: async (parent, args, context) => {
      return patients;
    },
  },
};
