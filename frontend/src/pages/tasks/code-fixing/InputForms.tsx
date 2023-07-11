import React, { FC, useState } from "react";
import { Button, Col, Form, Input, InputProps, Row } from "antd";
import { Task } from "../../../index";
import { TaskWrapper } from "../../../components/TaskWrapper";
import { NameFragment } from "../../../__generated__/graphql-generated";
import { buildFullName } from "../../../utils/formatters";

/**
 * In this task we implemented a skeleton for a patient name input mask.
 * After submitting the form the patient credentials should be displayed in an alert (already implemented).
 * Additional requirement: The submission button must be disabled if the patient name is not complete.
 * The name can be considered as complete if the first and the last name are set.
 *
 * The state updates seem to work, but they can be improved. Think about how.
 *
 * NOTE: There has to be at least one state!
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const InputForms: FC<Task> = (task) => {
  /** Editable Code START **/
  const [title, setTitle] = useState<string>();
  const [middleNames, setMiddleNames] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const updateCredentials: InputProps["onChange"] = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "title":
        setTitle(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "middleNames":
        setMiddleNames(value.split(" "));
        break;
      default:
        return;
    }
  };

  const onSubmit = () => {
    const patientName: NameFragment = {
      firstName,
      lastName,
      title,
      middleNames,
    };
    // Don't change the alert
    alert(buildFullName(patientName));
  };

  const disabled = false;

  /** Editable Code END **/

  return (
    <TaskWrapper task={task}>
      <Form layout={"vertical"}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label={"Title"}>
              <Input
                name={"title"}
                value={title}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"First name"}>
              <Input
                name={"firstName"}
                value={firstName}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Middle names"}>
              <Input
                name={"middleNames"}
                value={middleNames.join(" ")}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Last name"}>
              <Input
                name={"lastName"}
                value={lastName}
                onChange={updateCredentials}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button block onClick={onSubmit} disabled={disabled}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </TaskWrapper>
  );
};
