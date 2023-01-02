import shallow from "zustand/shallow";

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { deleteDB } from "idb";
import { useWorldStore } from "@/app/world";
import { useMetaStore } from "@/app/metas";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Modal from "@/components/Modal";
import { registerWithRef } from "@/utils";

type Props = {
  onClose: () => void;
};

const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const { close, id } = useWorldStore(
    (state) => ({ close: state.close, id: state.id }),
    shallow,
  );

  const { currentMeta, updateMeta, deleteMeta } = useMetaStore(
    (state) => ({
      currentMeta: state.metas[id],
      updateMeta: state.setMeta,
      deleteMeta: state.deleteMeta,
    }),
    shallow,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    name: string;
  }>({
    defaultValues: currentMeta,
  });
  const refRegister = registerWithRef(register);

  const onUpdate = handleSubmit(async ({ name }) => {
    await updateMeta({ ...currentMeta, name });
    onClose();
  });

  const onDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${currentMeta.name}?`,
    );

    if (confirmed) {
      close();
      await deleteDB(currentMeta.id, {
        blocked: () => {
          alert(
            "close all other tabs that accesses this world before deleting.",
          );
        },
      });
      await deleteMeta(currentMeta.id);
      navigate("/");
    }
  };

  const nameRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef]);

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-1 flex-col" onSubmit={onUpdate}>
        <h2 className="text-lg font-bold">World Settings</h2>

        <FormField>
          <FormField.Label htmlFor="name">world name</FormField.Label>
          <FormField.Input
            id="name"
            {...refRegister("name", {
              ref: nameRef,
              required: "this field is required",
            })}
          />
          {errors.name && <FormField.Error message={errors.name.message} />}
        </FormField>

        <div className="mt-auto flex items-center justify-end gap-5">
          <Button onClick={onDelete}>delete</Button>
          <Button type="submit">save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
