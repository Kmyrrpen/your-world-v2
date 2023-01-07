import shallow from "zustand/shallow";

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useWorldConnection } from "@/app/world";
import { useMetaStore } from "@/app/metas";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Modal from "@/components/Modal";
import useCurrentMeta from "@/hooks/useCurrentMeta";
import { registerWithRef } from "@/utils";

type Props = {
  onClose: () => void;
};

const SettingsModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const { destroy } = useWorldConnection();
  const currentMeta = useCurrentMeta();
  const { updateMeta, deleteMeta } = useMetaStore(
    (state) => ({
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
  const nameRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, [nameRef]);

  const onUpdate = handleSubmit(async ({ name }) => {
    await updateMeta({ ...currentMeta, name });
    onClose();
  });

  const onDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${currentMeta.name}?`,
    );
    if (!confirmed) return;
    await destroy(() => {
      alert("close all other tabs that accesses this world before deleting.");
    });
    await deleteMeta(currentMeta.id);
    navigate("/");
  };

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

        <div className="mt-auto flex items-center justify-end gap-1">
          <Button type="button" onClick={onDelete}>
            delete
          </Button>
          <Button type="submit">save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
