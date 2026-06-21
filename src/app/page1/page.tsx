"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import { getCategories, listAreas } from "@/service/meal-db-service";
import type { Category, Area } from "@/types/meal-db";

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
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <select
            {...register("category", { required: true })}
            id="category"
            aria-invalid={errors.category ? "true" : "false"}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.idCategory} value={c.idCategory}>
                {c.strCategory}
              </option>
            ))}
          </select>
          {errors.category?.type === "required" && (
            <p role="alert">Category is required</p>
          )}
        </div>
        <div className="inputGroup">
          <label htmlFor="area">Area</label>
          <select
            {...register("area", { required: true })}
            id="area"
            aria-invalid={errors.area ? "true" : "false"}
          >
            <option value="">Select an area</option>
            {areas.map((a) => (
              <option key={a.strArea} value={a.strArea}>
                {a.strArea}
              </option>
            ))}
          </select>
          {errors.area?.type === "required" && (
            <p role="alert">Area is required</p>
          )}
        </div>
        <div className="submitContainer">
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
