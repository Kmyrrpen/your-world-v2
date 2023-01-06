import { useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMetaStore } from "@/app/metas";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Modal, { ModalProps } from "@/components/Modal";
import { registerWithRef } from "@/utils";

const CreateModal: React.FC<ModalProps> = ({ onClose }) => {
  const setMeta = useMetaStore((state) => state.setMeta);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{
    name: string;
  }>();
  const refRegister = registerWithRef(register);

  const onSubmit = handleSubmit(async ({ name }) => {
    const id = nanoid();
    await setMeta({
      name,
      id,
      dateCreated: new Date(),
      recentDateOpened: new Date(),
    });
    navigate(id);
  });

  const namedRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    namedRef.current?.focus();
  }, [namedRef]);

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        <FormField>
          <FormField.Label htmlFor="name">World Name</FormField.Label>
          <FormField.Input
            id="name"
            {...refRegister("name", {
              ref: namedRef,
              required: "this field is required",
            })}
          />
          {errors.name && <FormField.Error message={errors.name.message} />}
        </FormField>

        <div className="flex justify-end mt-auto w-full">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
