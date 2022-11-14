import FormFieldC from './FormField';
import FormFieldError from './FormFieldError';
import FormFieldInput from './FormFieldInput';
import FormFieldLabel from './FormFieldLabel';

const FormField = Object.assign(FormFieldC, {
  Error: FormFieldError,
  Input: FormFieldInput,
  Label: FormFieldLabel,
});

export default FormField;
