import React, { FC } from "react";
import { Task } from "../../..";
import { TaskWrapper } from "../../../components/TaskWrapper";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { Patient } from "../../../__generated__/graphql-generated";
import { buildFullName } from "../../../utils/formatters";

export const PatientList: FC<Task> = (task) => {
  const columns: ColumnProps<Patient>[] = [
    {
      key: "demo-column",
      title: "Demo column",
      render: (_, r) => "Demo value",
    },
    {
      key: "name",
      title: "Name",
      render: (_, r) => (r.name ? buildFullName(r.name) : "-"),
    },
    {
      key: "demo-column",
      title: "Demo column",
      render: (_, r) => "Demo value",
    },
    {
      key: "demo-column",
      title: "Demo column",
      render: (_, r) => "Demo value",
    },
  ];

  return (
    <TaskWrapper task={task}>
      <div className={"w-full"}>
        <Table columns={columns} />
      </div>
    </TaskWrapper>
  );
};
