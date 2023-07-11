import { Patient, Resolvers, Sex } from "../__generated__/resolvers-types";
import { randomUUID } from "crypto";

let patients: Patient[] = [
  {
    id: "df61feac-e491-4b9d-af80-6898492dd31e",
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
    dateOfBirth: new Date("1995-12-17T03:24:00"),
    sex: Sex.Male,
  },
  {
    id: randomUUID(),
    name: {
      title: "Dr.",
      firstName: "Petra",
      lastName: "Zwegat",
    },
    address: {
      id: randomUUID(),
      street: "Sesamstraße",
      houseNumber: "42",
      addition: "b",
    },
    dateOfBirth: new Date("1978-08-01T03:24:00"),
    sex: Sex.Female,
  },
  {
    id: randomUUID(),
    name: {
      title: "Prof. Dr.",
      firstName: "Isabella",
      lastName: "Mayer",
    },
    address: {
      id: randomUUID(),
      street: "Birkerstraße",
      houseNumber: "2",
      addition: "c",
    },
    dateOfBirth: new Date("1942-02-01T03:24:00"),
    sex: Sex.Diverse,
  },
];

export const patientResolvers: Resolvers = {
  Query: {
    listPatients: async () => {
      return patients;
    },
    getPatient: async (_, { id }) => {
      return patients.find((patient) => patient.id === id);
    },
  },
  Mutation: {
    createPatient: async () => {
      const newPatient = { id: randomUUID() };
      patients.push(newPatient);
      return newPatient;
    },
    deletePatient: async (_, { id }) => {
      const index = patients.findIndex((patient) => patient.id === id);
      patients.splice(index, 1);
      return id;
    },
    updatePatient: async (_, { patient: patientUpdate }) => {
      patients = patients.map((patient) =>
        patient.id !== patientUpdate.id ? patient : patientUpdate,
      );
      return patientUpdate;
    },
  },
};
