import { gql } from '@apollo/client';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Address = {
  __typename?: 'Address';
  addition?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  street?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  addition?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  houseNumber?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  street?: InputMaybe<Scalars['String']>;
};

export type Empty = {
  __typename?: 'Empty';
  _?: Maybe<Scalars['String']>;
};

export type HumanName = {
  __typename?: 'HumanName';
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  middleNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};

export type HumanNameInput = {
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleNames?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Medication = {
  __typename?: 'Medication';
  brand?: Maybe<Scalars['String']>;
  labeler?: Maybe<Scalars['String']>;
  packageCode?: Maybe<Scalars['String']>;
  patientId?: Maybe<Scalars['ID']>;
  productCode?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPatient?: Maybe<Patient>;
  deletePatient?: Maybe<Scalars['String']>;
  updatePatient?: Maybe<Patient>;
};


export type MutationDeletePatientArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePatientArgs = {
  patient?: InputMaybe<PatientInput>;
};

export type Patient = {
  __typename?: 'Patient';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<HumanName>;
  sex?: Maybe<Sex>;
};

export type PatientInput = {
  address?: InputMaybe<AddressInput>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<HumanNameInput>;
  sex?: InputMaybe<Sex>;
};

export type Query = {
  __typename?: 'Query';
  getPatient?: Maybe<Patient>;
  listPatientMedications?: Maybe<Array<Maybe<Medication>>>;
  listPatients?: Maybe<Array<Maybe<Patient>>>;
};


export type QueryGetPatientArgs = {
  id: Scalars['String'];
};


export type QueryListPatientMedicationsArgs = {
  patientId: Scalars['String'];
};

export enum Sex {
  Diverse = 'Diverse',
  Female = 'Female',
  Male = 'Male'
}

export type NameFragment = { __typename?: 'HumanName', id?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, middleNames?: Array<string | null | undefined> | null | undefined, title?: string | null | undefined };

export type PatientOptimizedFragment = { __typename?: 'Patient', sex?: Sex | null | undefined };

export type PatientFragment = { __typename?: 'Patient', sex?: Sex | null | undefined };

export const NameFragmentDoc = gql`
    fragment Name on HumanName {
  id
  firstName
  lastName
  middleNames
  title
}
    `;
export const PatientOptimizedFragmentDoc = gql`
    fragment PatientOptimized on Patient {
  sex
}
    `;
export const PatientFragmentDoc = gql`
    fragment Patient on Patient {
  ...PatientOptimized
}
    ${PatientOptimizedFragmentDoc}`;