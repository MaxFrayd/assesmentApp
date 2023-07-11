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

export type Patient = {
  __typename?: 'Patient';
  address?: Maybe<Address>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<HumanName>;
};

export type Query = {
  __typename?: 'Query';
  listPatients?: Maybe<Array<Maybe<Patient>>>;
};

export type NameFragment = { __typename?: 'HumanName', id?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, middleNames?: Array<string | null | undefined> | null | undefined, title?: string | null | undefined };

export type PatientFragment = { __typename?: 'Patient', id?: string | null | undefined, name?: { __typename?: 'HumanName', id?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, middleNames?: Array<string | null | undefined> | null | undefined, title?: string | null | undefined } | null | undefined };

export const NameFragmentDoc = gql`
    fragment Name on HumanName {
  id
  firstName
  lastName
  middleNames
  title
}
    `;
export const PatientFragmentDoc = gql`
    fragment Patient on Patient {
  id
  name {
    ...Name
  }
}
    ${NameFragmentDoc}`;