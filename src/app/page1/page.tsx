"use client";

import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import FormSelect from "@/components/form/formSelect/FormSelect";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useCategories } from "@/hooks/use-categories";
import { useAreas } from "@/hooks/use-areas";

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
  const {
    data: areas,
    isLoading: areasLoading,
    error: areasError,
  } = useAreas();

  const loading = catLoading || areasLoading;
  const fetchError = catError || areasError;

  const { category, area, setPage1 } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
      setPage1: s.setPage1,
    })),
  );

  useEffect(() => {
    reset({ category, area });
  }, [category, area, reset]);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
    setPage1({ category: data.category, area: data.area });
    router.push("/page2");
  };

  if (loading) return <p>Loading...</p>;

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
        <FormSelect
          label="Area"
          name="area"
          options={(areas ?? []).map((a) => ({
            value: a.strArea,
            label: a.strArea,
          }))}
          error={
            errors.area?.type === "required" ? "Area is required" : undefined
          }
          register={register}
        />
        <div className="cta-container submit-container">
          <button type="submit">Next</button>
        </div>
        {fetchError && (
          <div className="alert alert-error">
            <p>Error: {fetchError}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Page1;
