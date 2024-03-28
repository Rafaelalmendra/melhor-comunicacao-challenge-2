import type { InputHTMLAttributes } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { Input, Label } from 'components';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  messageError?: string;
  register?: UseFormRegisterReturn;
};

const FormInput = ({
  label,
  register,
  messageError,
  ...inputProps
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label !== null && <Label>{label}</Label>}

      <Input {...register} {...inputProps} />

      {messageError !== undefined && (
        <p className="text-sm text-red-500">{messageError}</p>
      )}
    </div>
  );
};

export { FormInput };
