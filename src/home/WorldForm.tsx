import React, { useState } from 'react';
import { dispatch } from '@/app/dispatch';
import { createWorld } from '@/app/world';
import Button from '@/components/Button';
import Input from '@/components/Input';

type Props = {
  show: boolean;
  onToggle: () => void;
};

const WorldForm: React.FC<Props> = ({ show, onToggle }) => {
  const [nameValue, setNameValue] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createWorld(nameValue));
  };

  if (!show)
    return (
      <Button size="large" className="mx-auto mb-6 w-fit" onClick={onToggle}>
        New World
      </Button>
    );

  return (
    <form className="mb-4 flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Input
        size="large"
        className="max-w-[20rem]"
        id="new-name"
        placeholder="name.."
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <Button className="w-fit" size="large" type="submit">
        Create New World
      </Button>
    </form>
  );
};

export default WorldForm;
