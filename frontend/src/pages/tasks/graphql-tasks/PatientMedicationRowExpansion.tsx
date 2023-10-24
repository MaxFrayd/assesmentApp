import React, { FC } from 'react';
import { Alert } from 'antd';
import { Maybe } from '@/__generated__/graphql-generated';
import { Table } from 'antd';
import { gql, useQuery } from '@apollo/client';

interface PatientMedicationRowExpansion {
  patientId: Maybe<string>;
}
interface Medication {
  labeler: string;
  productCode: string;
  packageCode: string;
  brand: string;
}

/**
 * Task: Patient medication
 *
 * The `PatientMedicationRowExpansion` lists all the medications of a patient as a nested table.
 * The format of a medication has to follow the [NDC Standard](https://en.wikipedia.org/wiki/National_drug_code) and must be dash separated
 * and should also contain the brand name as a separate column.
 *
 * Hint: Medications don't contain ids. In order to keep the apollo cache stable you have to modify the file `apollo-setup.ts`. A medications
 * identifier could be derived combining the `patientId` + `labeler` + `productCode` + `packageCode`.
 *
 * Note: Only the first patient contains medications.
 */

export const GET_PATIENT_MEDICATIONS = gql`
  query GetPatientMedications($patientId: String!) {
    listPatientMedications(patientId: $patientId) {
      labeler
      productCode
      packageCode
      brand
    }
  }
`;
export const PatientMedicationRowExpansion: FC<
  PatientMedicationRowExpansion
> = ({ patientId }) => {
  const { data, loading, error } = useQuery(GET_PATIENT_MEDICATIONS, {
    variables: { patientId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert type="error" message={error.message} />;

  const columns = [
    {
      title: 'Labeler',
      dataIndex: 'labeler',
      key: 'labeler',
    },
    {
      title: 'Product Code',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: 'Package Code',
      dataIndex: 'packageCode',
      key: 'packageCode',
    },
    {
      title: 'NDC',
      key: 'ndc',
      render: (_: any, record: Medication) =>
        `${record.labeler}-${record.productCode}-${record.packageCode}`,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
  ];

  return <Table columns={columns} dataSource={data?.listPatientMedications} />;
};
