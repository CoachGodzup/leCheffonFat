"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import { getCategories, listAreas } from "@/service/meal-db-service";
import type { Category, Area } from "@/types/meal-db";
import FormSelect from "@/components/form/formSelect/FormSelect";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

const Page1 = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<page1Request>();
  const router = useRouter();
  const [categoriesList, setListCategories] = useState<Category[]>([]);
  const [areasList, setListAreas] = useState<Area[]>([]);

  const { category, area, setPage1 } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
      setPage1: s.setPage1,
    })),
  );

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCategories(), listAreas()])
      .then(([catRes, areaRes]) => {
        setListCategories(catRes.categories);
        setListAreas(areaRes.meals ?? []);
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
          options={categoriesList.map((c) => ({
            value: c.idCategory,
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
          options={areasList.map((a) => ({
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
