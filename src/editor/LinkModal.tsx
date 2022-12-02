import { Editor } from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import Modal from '@/components/Modal';
import ModalBackground from '@/components/Modal/ModalBackground';
import ModalContainer from '@/components/Modal/ModalContainer';
import FormField from '@/components/FormField';
import Button from '@/components/Button';

type Props = {
  editor: Editor;
};

type FormValues = {
  text: string;
};

const LinkModal: React.FC<Props> = ({ editor }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: { text: '' },
  });

  // focus input on mount
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onToggle = () => {
    editor.chain().toggleLinkModal().focus().run();
    reset();
  };

  const onSubmit = handleSubmit(({ text }) => {
    reset();
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: text })
      .run();
    onToggle();
  });

  const { ref, ...textProps } = register('text', { required: true });

  return (
    <Modal className={editor.storage.custom.showLinkModal || 'hidden'}>
      <ModalBackground onClick={onToggle} />
      <ModalContainer>
        <form className="flex flex-1 flex-col" onSubmit={onSubmit}>
          <FormField>
            <FormField.Label htmlFor="link-input">attach link</FormField.Label>
            <FormField.Input
              id="link-input"
              ref={(el) => {
                ref(el);
                inputRef.current = el;
              }}
              {...textProps}
            />
            {errors.text && <FormField.Error message={errors.text.message} />}
          </FormField>
          <div className="mt-auto flex items-center justify-end gap-4">
            <Button type="button" onClick={onToggle}>
              cancel
            </Button>
            <Button type="submit">attach</Button>
          </div>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default LinkModal;
