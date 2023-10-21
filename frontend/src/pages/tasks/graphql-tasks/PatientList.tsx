import React, { FC, useState, useEffect } from 'react';
import { Task } from '@/index';
import {
  Select,
  Button,
  Modal,
  Input,
  Space,
  Table,
  Popconfirm,
  notification,
  Form,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import { EditPatientModal } from './EditPatientModal';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { PatientMedicationRowExpansion } from './PatientMedicationRowExpansion';
import {
  Maybe,
  Patient,
  PatientInput,
  Sex,
} from '@/__generated__/graphql-generated';
import { TaskWrapper } from '@/components/TaskWrapper';
import { useMutation, gql, useQuery } from '@apollo/client';

interface PatientFormValues {
  id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dateOfBirth: string;
  address: {
    street: string;
    houseNumber: string;
    city: string;
  };
  sex: Sex;
}

const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(patient: $input) {
      id
      name {
        firstName
        lastName
        __typename
      }
      dateOfBirth
      sex
      __typename
    }
  }
`;

const DELETE_PATIENT = gql`
  mutation DeletePatient($id: String!) {
    deletePatient(id: $id)
  }
`;

const GET_PATIENTS = gql`
  query GetPatients {
    listPatients {
      id
      name {
        firstName
        lastName
      }
      dateOfBirth
      sex
    }
  }
`;

const UPDATE_PATIENT = gql`
  mutation UpdatePatient($input: PatientInput!) {
    updatePatient(patient: $input) {
      id
      name {
        firstName
        lastName
        __typename
      }
      dateOfBirth
      sex
      __typename
    }
  }
`;

export const PatientList: FC<Task> = (task) => {
  const [patient, setPatient] = useState<Patient | null>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [createPatientMutation] = useMutation(CREATE_PATIENT);
  const [deletePatientMutation] = useMutation(DELETE_PATIENT);
  const [updatePatientMutation] = useMutation(UPDATE_PATIENT);

  const { data, refetch, loading, error } = useQuery(GET_PATIENTS);

  useEffect(() => {
    if (data && data.listPatients) {
      setPatients(data.listPatients);
    }
  }, [data]);

  const [patients, setPatients] = useState<Maybe<Patient>[]>([]);

  const handleDelete = (patientId: Maybe<string>) => {
    deletePatientMutation({
      variables: { id: patientId },
    })
      .then(() => {
        refetch();
        notification.success({ message: 'Patient deleted successfully.' });
      })
      .catch((error) => {
        notification.error({
          message: `Failed to delete patient. ${error.message}`,
        });
      });
  };

  const columns: ColumnProps<Patient>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) =>
        record.name?.firstName + ' ' + record.name?.lastName,
    },
    {
      key: 'dateOfBirth',
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
    },
    {
      key: 'sex',
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <EditTwoTone
            className={'cursor-pointer'}
            onClick={() => {
              setPatient(record);
            }}
          />
          <Popconfirm
            title={'Are you sure?'}
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteTwoTone twoToneColor={'red'} className={'cursor-pointer'} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOk = (values: PatientFormValues) => {
    const patientInput: PatientInput = {
      name: {
        firstName: values.name.firstName,
        lastName: values.name.lastName,
      },
      dateOfBirth: values.dateOfBirth,
      address: {
        street: values.address.street,
        houseNumber: values.address.houseNumber,
        city: values.address.city,
      },
      sex: values.sex,
    };

    if (values.id) {
      updatePatient({ ...patientInput, id: values.id });
    } else {
      createPatient(patientInput);
    }
  };

  const createPatient = (input: PatientInput) => {
    createPatientMutation({
      variables: { input },
    })
      .then((response) => {
        refetch();
        notification.success({ message: 'Patient created successfully.' });
        setIsModalVisible(false);
      })
      .catch((error) => {
        notification.error({
          message: `Failed to create patient. ${error.message}`,
        });
      });
  };

  const updatePatient = (input: PatientInput) => {
    updatePatientMutation({
      variables: { input },
    })
      .then((response) => {
        refetch();
        notification.success({ message: 'Patient created successfully.' });
        setIsModalVisible(false);
      })
      .catch((error) => {
        notification.error({
          message: `Failed to create patient. ${error.message}`,
        });
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TaskWrapper task={task}>
      <div className={'w-full'}>
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={patients.map((p) => p!)}
          pagination={false}
          expandable={{
            expandedRowRender: (patient) => (
              <PatientMedicationRowExpansion patientId={patient.id} />
            ),
          }}
        />
        <EditPatientModal
          open={!!patient}
          handleOk={handleOk}
          onClose={() => setPatient(null)}
          patient={patient}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          block
          type={'dashed'}
        >
          Add Patient
        </Button>
        <Modal
          title="Add Patient"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form name="addPatient" onFinish={handleOk}>
            <Form.Item
              label="First Name"
              name={['name', 'firstName']}
              rules={[
                {
                  required: true,
                  message: "Please input the patient's first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name={['name', 'lastName']}
              rules={[
                {
                  required: true,
                  message: "Please input the patient's last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please input the patient's date of birth!",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Sex"
              name="sex"
              rules={[
                { required: true, message: "Please select the patient's sex!" },
              ]}
            >
              <Select>
                <Select.Option value={Sex.Male}>Male</Select.Option>
                <Select.Option value={Sex.Female}>Female</Select.Option>
                <Select.Option value={Sex.Diverse}>Diverse</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Street"
              name={['address', 'street']}
              rules={[
                {
                  required: true,
                  message: "Please input the patient's street!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="House Number"
              name={['address', 'houseNumber']}
              rules={[
                {
                  required: true,
                  message: "Please input the patient's house number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name={['address', 'city']}
              rules={[
                {
                  required: true,
                  message: "Please input the patient's city!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Patient
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </TaskWrapper>
  );
};
