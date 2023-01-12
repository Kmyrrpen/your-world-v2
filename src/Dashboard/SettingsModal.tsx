import shallow from "zustand/shallow";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";

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

  const [freezeModal, setFreezeModal] = useState(false);

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
    toast.success("World updated.");
  });

  const onDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete ${currentMeta.name}?`,
    );
    if (!confirmed) return;

    // wait for db to finish being destroyed. Warn the user if db
    // is open else where.
    let toastId: Id | undefined = undefined;
    await destroy(() => {
      toastId = toast.warn("Please close all tabs with this world open!", {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      setFreezeModal(true);
    });

    if (toastId) toast.dismiss(toastId);
    await deleteMeta(currentMeta.id);
    toast.success("World Deleted.");
    navigate("/");
  };

  const handleClose = () => {
    if (!freezeModal) onClose();
  };

  return (
    <Modal onClose={handleClose}>
      <form className="flex flex-1 flex-col" onSubmit={onUpdate}>
        <h2 className="text-lg font-bold">World Settings</h2>

        <FormField>
          <FormField.Label htmlFor="name">world name</FormField.Label>
          <FormField.Input
            id="name"
            {...refRegister("name", {
              ref: nameRef,
              required: "this field is required",
              disabled: freezeModal,
            })}
          />
          {errors.name && <FormField.Error message={errors.name.message} />}
        </FormField>

        <div className="mt-auto flex items-center justify-end gap-1">
          <Button
            disabled={freezeModal}
            style={freezeModal ? "disabled" : "default"}
            type="button"
            onClick={onDelete}
          >
            delete
          </Button>
          <Button
            disabled={freezeModal}
            style={freezeModal ? "disabled" : "default"}
            type="submit"
          >
            save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
