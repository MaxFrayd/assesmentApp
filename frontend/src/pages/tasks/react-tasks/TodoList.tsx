import React, { FC, useCallback, useState } from "react";
import { Task } from "../../../index";
import { TaskWrapper } from "../../../components/TaskWrapper";
import uuid from "react-uuid";
import { Button, Checkbox, Input, Modal, notification } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";

interface TodoItemProps {
  id: string;
  name: string;
  done: boolean;
}

/** Editable Code START **/

/**
 * This component represents a typical task (or `To-Do`) list. We already created the skeleton for you.
 * Your task is to improve this skeleton and to add the functionalities `create item`, `delete item` and mark
 * item as `done` / `to be done`.
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const TodoList: FC<Task> = (task) => {
  // NOTE: Don't change the content of the initial items!
  const initialItems: TodoItemProps[] = [
    {
      id: uuid(),
      name: "Fix code",
      done: false,
    },
    {
      id: uuid(),
      name: "Implement delete",
      done: false,
    },
    {
      id: uuid(),
      name: "Implement add",
      done: false,
    },
  ];

  const [newItem, setNewItem] = useState<TodoItemProps | null>(null);

  const [todoItems] = useState<TodoItemProps[]>(initialItems);

  // TODO: Remove the dummy handler before submitting your solution
  const openModal = () => {
    notification.error({ message: "TODO open modal" });
  };

  const handleAdd = (name: string) => {
    notification.error({
      message: `TODO add item ${name} to list and close modal`,
    });
  };

  const TodoItem: FC<TodoItemProps> = ({ done, name }) => {
    return (
      <div
        className={
          "w-full rounded overflow-hidden bg-white shadow-lg flex justify-between p-4"
        }
      >
        {name}
        <div className={"flex justify-content items-center space-x-4"}>
          <Checkbox checked={done} onChange={openModal} />
          <DeleteTwoTone
            className={"cursor-pointer"}
            twoToneColor={"red"}
            onClick={openModal}
          />
        </div>
      </div>
    );
  };

  return (
    <TaskWrapper task={task}>
      <div className={"w-full"}>
        <div className={"space-y-2"}>
          {todoItems.map((props) => (
            <TodoItem {...props} />
          ))}
        </div>
        <Button
          block
          onClick={openModal}
          icon={<PlusOutlined />}
          type={"dashed"}
          className={"mt-4"}
        >
          Add item
        </Button>
        <ToDoItemInput open={!!newItem} onCreate={handleAdd} />
      </div>
    </TaskWrapper>
  );
};

const ToDoItemInput: FC<{
  open: boolean;
  onCreate: (name: string) => void;
}> = ({ onCreate, open }) => {
  // The todo item name must not be empty
  return (
    <Modal
      title={"New Item"}
      open={open}
      footer={<Button onClick={() => onCreate("")}>Create</Button>}
    >
      <Input />
    </Modal>
  );
};

/** Editable Code END **/
