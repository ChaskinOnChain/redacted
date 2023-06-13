import { ErrorMessage, Field } from "formik";

interface Props {
  name: string;
  placeholder: string;
  type: string;
}

const FormField = ({ name, placeholder, type }: Props) => (
  <>
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      className="border border-slate-300 w-full p-2 rounded mt-3"
    />
    <ErrorMessage className="text-red-500" name={name} component="div" />
  </>
);

export default FormField;
