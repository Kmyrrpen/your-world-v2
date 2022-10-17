import { dispatch } from "@/app/dispatch";
import { createNewWorld } from "@/app/worldMeta";
import useWorldMetas from "@/app/worldMeta/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [showWorldForm, setShowWorldForm] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const metas = useWorldMetas();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createNewWorld(nameValue));
  };

  return (
    <div>
      <h1>Welcome to Atone</h1>

      {/* Could separate this into a new component */}
      {!showWorldForm ? (
        <button onClick={() => setShowWorldForm((prev) => !prev)}>
          New World
        </button>
      ) : (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="new-name">New Name</label>
            <input
              id="new-name"
              placeholder="New Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
          <button type="submit">Create World</button>
        </form>
      )}

      {/* Could separate this into a new component */}
      <p>existing worlds:</p>
      <ul>
        {metas.map((meta) => (
          <Link to={meta.id} key={meta.id}>
            {meta.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
