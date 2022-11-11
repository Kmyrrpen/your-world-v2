import React, { useState } from 'react';
import { dispatch } from '@/app/dispatch';
import { createWorld } from '@/app/world';
import Button from '@/components/Button';

const CreateWorld: React.FC = () => {
  const [nameValue, setNameValue] = useState('');
  const [showWorldForm, setShowWorldForm] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createWorld(nameValue));
  };

  if (!showWorldForm)
    return (
      <Button
        className="ml-auto md:ml-0"
        icon="click"
        onClick={() => setShowWorldForm(true)}
      >
        create new world
      </Button>
    );

  return (
    <form className="" onSubmit={onSubmit}>
      <input
        className=""
        placeholder="world name..."
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <Button>Create New World</Button>
    </form>
  );
};

export default CreateWorld;
