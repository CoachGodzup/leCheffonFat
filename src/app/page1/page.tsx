"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import { getCategories, listAreas } from "@/service/meal-db-service";
import type { Category, Area } from "@/types/meal-db";
import FormSelect from "@/components/form/formSelect/FormSelect";

const Page1 = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<page1Request>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCategories(), listAreas()])
      .then(([catRes, areaRes]) => {
        setCategories(catRes.categories);
        setAreas(areaRes.meals ?? []);
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
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
          options={categories.map((c) => ({
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
          options={areas.map((a) => ({
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
