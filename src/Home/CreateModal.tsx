import { useMetaStore } from "@/app/metas";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Modal, { ModalProps } from "@/components/Modal";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = handleSubmit(async ({ name }) => {
    const id = nanoid();
    await setMeta({ name, id });
    navigate;
  });

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <FormField>
          <FormField.Label htmlFor="name">World Name</FormField.Label>
          <FormField.Input
            id="name"
            {...register("name", { required: "can't be empty" })}
          />
          {errors.name && <FormField.Error message={errors.name.message} />}
        </FormField>

        <div className="flex items-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
