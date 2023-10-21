import React, { FC } from 'react';
import { Form, Button, Input, Select, Modal } from 'antd';
import { Maybe, Patient, Sex } from '@/__generated__/graphql-generated';
import { buildFullName } from '@/utils/formatters';

interface PatientPreviewProps {
  patient: Maybe<Patient>;
  open: boolean;
  onClose: () => void;
  handleOk: (input: Patient) => void;
}

/**
 * Task: Patient list
 *
 * The `EditPatientModal` allows the user to update all possible attributes of a patient.
 * Implement this component using [antd forms](https://ant.design/components/form). Choose suitable antd input components
 * for the corresponding patient properties.
 *
 * Hint: You might want to add an address formatter that works similar to the name formatter.
 *
 * Note: A patient object is valid as long as an id is set. All other fields are optional.
 */
export const EditPatientModal: FC<PatientPreviewProps> = ({
  onClose,
  open,
  patient,
  handleOk,
}) => {
  /** Editable Code START **/
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      title={patient?.name && buildFullName(patient?.name)}
    >
      <Form
        name="addPatient"
        onFinish={handleOk}
        initialValues={{ name: 'test' }}
      >
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
  );
  /** Editable Code END **/
};
