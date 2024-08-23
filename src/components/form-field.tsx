import {
  FieldComponent,
  FieldValidators,
  Validator,
} from "@tanstack/react-form";
import { ZodType, ZodTypeDef } from "zod";
import { FieldInfo } from "./form-field-info";

interface FieldProps {
  id: string;
  label?: string;
  Field: FieldComponent<
    unknown,
    Validator<unknown, ZodType<any, ZodTypeDef, any>>
  >;
  validators:
    | FieldValidators<
        unknown,
        string,
        undefined,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        unknown
      >
    | undefined;
  type?: string;
}

export const FormField = ({
  id,
  label,
  Field,
  validators,
  type,
}: FieldProps) => (
  <Field
    name={id}
    validators={validators}
    children={(field) => (
      <div className="flex flex-col">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type ? type : "text"}
          id={field.name}
          name={field.name}
          value={(field.state.value as string) || ""}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-lg"
        />
        <FieldInfo field={field} />
      </div>
    )}
  />
);
