"use client";

import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import FormSelect from "@/components/form/formSelect/FormSelect";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useCategories } from "@/hooks/use-categories";

const Page1 = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<page1Request>();
  const router = useRouter();

  const {
    data: categories,
    isLoading: catLoading,
    error: catError,
  } = useCategories();

  const { category, setPage1 } = useStore(
    useShallow((s) => ({
      category: s.category,
      setPage1: s.setPage1,
    })),
  );

  useEffect(() => {
    reset({ category });
  }, [category, reset]);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
    setPage1({ category: data.category });
    router.push("/page2");
  };

  if (catLoading) return <p>Loading...</p>;

  return (
    <section className="card">
      <h1>What&apos;s on your mind&apos;s menu?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          label="Category"
          name="category"
          options={(categories ?? []).map((c) => ({
            value: c.strCategory,
            label: c.strCategory,
          }))}
          error={
            errors.category?.type === "required"
              ? "Category is required"
              : undefined
          }
          register={register}
        />
        <div className="cta-container submit-container">
          <button type="submit">Next</button>
        </div>
        {catError && (
          <div className="alert alert-error">
            <p>Error: {catError}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Page1;
