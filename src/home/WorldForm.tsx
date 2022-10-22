import React, { useState } from 'react';
import { createNewWorld } from '@/app/worldList';
import { dispatch } from '@/app/dispatch';
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
    dispatch(createNewWorld(nameValue));
  };

  if (!show)
    return (
      <Button
        className="button button-large mx-auto mb-6 w-fit bg-primary-200"
        onClick={onToggle}
      >
        New World
      </Button>
    );

  return (
    <form className="mb-4 flex flex-col items-center gap-4" onSubmit={onSubmit}>
      <Input
        className="max-w-[20rem]"
        id="new-name"
        placeholder="name.."
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <Button
        className="button button-large w-fit bg-primary-200"
        type="submit"
      >
        Create New World
      </Button>
    </form>
  );
};

export default WorldForm;
