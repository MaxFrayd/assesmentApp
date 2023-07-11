import React, { FC, useRef, useState } from "react";
import { TaskWrapper } from "../../../components/TaskWrapper";
import { Task } from "../../../index";
import { Form, Input } from "antd";

/** Editable Code START **/
interface OddNumberInputProps {
  odd: boolean;
}

/**
 * The `OddNumberInput` is a wrapper for the antd component `[Input](https://ant.design/components/input)` that only allows to enter
 * either odd or even number.
 * The property `odd` indicates the allowed characters.
 * Negative values are not allowed.
 */
const OddNumberInput: FC<OddNumberInputProps> = () => <Input />;
/** Editable Code END **/

export const CustomComponent: FC<Task> = (task) => {
  const oddRef = useRef();
  const evenRef = useRef();

  const [oddNumberInput, setOddNumberInput] = useState<string>();
  const [evenNumberInput, setEvenNumberInput] = useState<string>();

  return (
    <TaskWrapper task={task}>
      <Form layout={"vertical"} className={"flex space-x-2"}>
        <Form.Item label={"Odd number input"}>
          <OddNumberInput
            odd
            /** Editable Code START **/
            // TODO: uncomment these lines after your implementation
            // value={oddNumberInput}
            // onChange={e => setOddNumberInput(e.target.value)}
            // ref={oddRef}
            /** Editable Code END **/
          />
        </Form.Item>
        <Form.Item label={"Even number input"}>
          <OddNumberInput
            odd={false}
            /** Editable Code START **/
            // TODO: uncomment these lines after your implementation
            // value={oddNumberInput}
            // onChange={e => setOddNumberInput(e.target.value)}
            // ref={evenRef}
            /** Editable Code END **/
          />
        </Form.Item>
      </Form>
    </TaskWrapper>
  );
};
