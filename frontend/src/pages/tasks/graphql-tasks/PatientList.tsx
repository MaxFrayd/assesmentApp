import React, { FC, useState } from "react";
import { Task } from "../../..";
import { TaskWrapper } from "../../../components/TaskWrapper";
import { Button, notification, Popconfirm, Space, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import {
  Maybe,
  Patient,
  useListPatientsQuery,
} from "../../../__generated__/graphql-generated";
import { EditPatientModal } from "./EditPatientModal";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { PatientMedicationRowExpansion } from "./PatientMedicationRowExpansion";

/**
 * The component `PatientList` consists of a table, a modal to edit a patient and a row expansion.
 * The table contains all displayable properties of a patient as columns: name, date of birth, sex, address.
 * Implement the calls `delete` and `create` patients in this component. Make sure that you don't refetch the list
 * after those operations. Use local cache updates instead.
 *
 *  Hint: You might want to add an address formatter that works similar to the name formatter.
 */
export const PatientList: FC<Task> = (task) => {
  const [patient, setPatient] = useState<Patient | null>();

  /** Editable Code START **/
  const { data: patientsData } = useListPatientsQuery();
  const patients: Maybe<Maybe<Patient>[]> = patientsData?.listPatients;

  const handleDelete = (patientId: Maybe<string>) => {
    notification.error({ message: "TODO" });
  };

  const columns: ColumnProps<Patient>[] = [
    {
      key: "demo-column-1",
      title: "Demo column 1",
      render: (_, r) => "Demo value",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, r) => (
        <Space>
          <EditTwoTone
            className={"cursor-pointer"}
            onClick={() => setPatient(r)}
          />
          <Popconfirm
            title={"Are you sure?"}
            onConfirm={() => handleDelete(r.id)}
          >
            <DeleteTwoTone twoToneColor={"red"} className={"cursor-pointer"} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    notification.error({ message: "TODO" });
  };
  /** Editable Code END **/

  return (
    <TaskWrapper task={task}>
      <div className={"w-full"}>
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={patients?.map((patient) => patient!)}
          pagination={false}
          expandable={{
            expandedRowRender: (patient) => (
              <PatientMedicationRowExpansion patientId={patient.id} />
            ),
          }}
        />
        <EditPatientModal
          open={!!patient}
          onClose={() => setPatient(null)}
          patient={patient}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={handleAdd}
          block
          type={"dashed"}
        >
          Add Patient
        </Button>
      </div>
    </TaskWrapper>
  );
};
