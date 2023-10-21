import React, { FC, useEffect, useRef, useState } from 'react';
import { Form, Input, Radio } from 'antd';
import { Task } from '@/index';
import { TaskWrapper } from '@/components/TaskWrapper';
import { InputProps } from 'antd/lib/input';

/** Editable Code START **/

interface OddNumberInputProps {
  odd: boolean;
}

const OddEvenNumberInput: FC<OddNumberInputProps & InputProps> = ({
  odd,
  ...props
}) => {
  const inputRef = useRef<React.ComponentRef<typeof Input>>(null); // Updated type here

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d+$/.test(value)) {
      const number = parseInt(value, 10);
      if (!isNaN(number) && (odd ? number % 2 !== 0 : number % 2 === 0)) {
        props.onChange?.(e);
      }
    }
  };

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, [props.autoFocus]);

  return <Input {...props} ref={inputRef} onChange={handleChange} />;
};

/** Editable Code END **/

export const CustomComponent: FC<Task> = (task) => {
  const [odd, setOdd] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue('');
  }, [odd]);

  return (
    <TaskWrapper task={task}>
      <Form layout={'vertical'} className={'flex space-x-2'}>
        <Form.Item label={'Odd switcher'}>
          <Radio.Group
            options={[
              { label: 'Odd', value: 'true' },
              { label: 'Even', value: 'false' },
            ]}
            onChange={(e) => setOdd(e.target.value === 'true')}
            value={`${odd}`}
            optionType="button"
          />
        </Form.Item>
        <Form.Item label={odd ? 'Odd number input' : 'Even number input'}>
          <OddEvenNumberInput
            odd={odd}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </Form.Item>
      </Form>
    </TaskWrapper>
  );
};
