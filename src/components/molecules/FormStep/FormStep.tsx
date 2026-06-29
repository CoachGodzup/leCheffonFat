"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

import FormSelect from "@/components/molecules/FormSelect/FormSelect";

type Option = { value: string; label: string };

type FormStepProps = {
  title: string;
  heading: string;
  subtitle?: string;
  fieldLabel: string;
  fieldName: "category" | "area";
  options: Option[];
  submitLabel: string;
  isLoading: boolean;
  fetchError: string | null;
  storeValue: string;
  onSubmit: (value: string) => void;
  backHref?: string;
  backLabel?: string;
};

const FormStep = ({
  title,
  heading,
  subtitle,
  fieldLabel,
  fieldName,
  options,
  submitLabel,
  isLoading,
  fetchError,
  storeValue,
  onSubmit: onSubmitProp,
  backHref,
  backLabel,
}: FormStepProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    reset({ [fieldName]: storeValue });
  }, [storeValue, fieldName, reset]);

  const handleFormSubmit = (data: FieldValues) => {
    onSubmitProp(data[fieldName] as string);
  };

  if (isLoading) return <p role="status">Loading...</p>;

  return (
    <section className="card">
      <h1>{heading}</h1>
      {subtitle && <p>{subtitle}</p>}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormSelect
          label={fieldLabel}
          name={fieldName}
          options={options}
          error={
            errors[fieldName]?.type === "required"
              ? `${fieldLabel} is required`
              : undefined
          }
          register={register}
        />
        <div className="cta-container submit-container">
          <button type="submit">{submitLabel}</button>
        </div>
        {fetchError && (
          <div className="alert alert-error">
            <p role="alert">Error: {fetchError}</p>
          </div>
        )}
      </form>
      {backHref && (
        <Link href={backHref} aria-label={backLabel}>
          Back
        </Link>
      )}
    </section>
  );
};

export default FormStep;
