import { FieldApi } from "@tanstack/react-form";

interface FieldInfoProps {
  field: FieldApi<any, any, any, any>;
}

export const FieldInfo = ({ field }: FieldInfoProps) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-600 text-sm font-medium">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : field.state.meta.isValidating ? (
        <em className="text-sm font-medium">Validando...</em>
      ) : (
        <em className="h-5" />
      )}
      {}
    </>
  );
};
