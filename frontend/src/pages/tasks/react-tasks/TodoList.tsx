import React, { FC, useState } from 'react';
import uuid from 'react-uuid';
import { Button, Checkbox, Input, Modal, Popconfirm, notification } from 'antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { Task } from '@/index';
import { TaskWrapper } from '@/components/TaskWrapper';

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
 * Deleting a to-do item must be confirmed by the user. You can use the component [Popconfirm](https://ant.design/components/popconfirm).
 *
 * Write down all steps as comments that lead to your final solution including the problems with the original version.
 */
export const TodoList: FC<Task> = (task) => {
  const initialItems: TodoItemProps[] = [
    {
      id: uuid(),
      name: 'Fix code',
      done: false,
    },
    {
      id: uuid(),
      name: 'Implement delete',
      done: false,
    },
    {
      id: uuid(),
      name: 'Implement add',
      done: false,
    },
  ];

  const [newItemName, setNewItemName] = useState<string>('');
  const [todoItems, setTodoItems] = useState<TodoItemProps[]>(initialItems);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAdd = (name: string) => {
    if (name.trim() === '') {
      notification.error({
        message: 'Item name cannot be empty',
      });
      return;
    }
    setTodoItems([
      ...todoItems,
      {
        id: uuid(),
        name,
        done: false,
      },
    ]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    // TODO types
    const newItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newItems);
  };

  const handleDoneChange = (id: string) => {
    const newItems = todoItems.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setTodoItems(newItems);
  };

  const TodoItem: FC<TodoItemProps> = ({ done, name, id }) => (
    <div
      className={`w-full rounded overflow-hidden bg-white shadow-lg flex justify-between p-4 ${
        done ? 'strike-through' : ''
      }`}
    >
      {name}
      <div className={'flex justify-content items-center space-x-4'}>
        <Checkbox checked={done} onChange={() => handleDoneChange(id)} />
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className={'cursor-pointer'} twoToneColor={'red'} />
        </Popconfirm>
      </div>
    </div>
  );

  return (
    <TaskWrapper task={task}>
      <div className={'w-full'}>
        <div className={'space-y-2'}>
          {todoItems.map((props) => (
            <TodoItem {...props} key={props.id} />
          ))}
        </div>
        <Button
          block
          onClick={openModal}
          icon={<PlusOutlined />}
          type={'dashed'}
          className={'mt-4'}
        >
          Add item
        </Button>
        <ToDoItemInput
          open={isModalVisible}
          onCreate={handleAdd}
          onClose={closeModal}
        />
      </div>
    </TaskWrapper>
  );
};

const ToDoItemInput: FC<{
  open: boolean;
  onCreate: (name: string) => void;
  onClose: () => void;
}> = ({ onCreate, open, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleCreate = () => {
    onCreate(inputValue);
    setInputValue('');
  };

  const handleCancel = () => {
    onClose();
    setInputValue('');
  };

  return (
    <Modal
      title={'New Item'}
      visible={open}
      onOk={handleCreate}
      onCancel={handleCancel}
    >
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  );
};
