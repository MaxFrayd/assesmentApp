import { Patient, Resolvers } from "../__generated__/resolvers-types";
import { randomUUID } from "crypto";

let patients: Patient[] = [
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
  {
    id: randomUUID(),
    name: {
      title: "Dr.",
      firstName: "Petra",
      lastName: "Zwegat",
    },
    address: {
      id: randomUUID(),
      street: "Teststreet",
      houseNumber: "2",
      addition: "b",
    },
  },
];

export const patientResolvers: Resolvers = {
  Query: {
    listPatients: async () => {
      return patients;
    },
    getPatient: async (_, { id }) => {
      return patients.find(patient => patient.id === id)
    }
  },
  Mutation: {
    createPatient: async () => {
      const newPatient = { id: randomUUID()};
      patients.push(newPatient)
      return newPatient
    },
    deletePatient: async (_, { id }) => {
      const index = patients.findIndex(patient => patient.id === id)
      patients.splice(index, 1)
      return id;
    },
    updatePatient: async (_, { patient: patientUpdate }) => {
      patients = patients.map(patient=> patient.id !== patientUpdate.id ? patient : patientUpdate)
      return patientUpdate
    }
  }
};