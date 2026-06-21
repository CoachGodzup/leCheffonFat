"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./page1.module.css";
import type { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";
import { getCategories, listAreas } from "@/service/meal-db-service";
import type { Category, Area } from "@/types/meal-db";

const Page1 = () => {
  const { register, handleSubmit } = useForm<page1Request>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCategories(), listAreas()])
      .then(([catRes, areaRes]) => {
        setCategories(catRes.categories);
        setAreas(areaRes.meals ?? []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
    router.push("/page2");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.card}>
      <h1>What&apos;s on your mind&apos;s menu?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <select {...register("category")} id="category">
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.idCategory} value={c.idCategory}>
                {c.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="area">Area</label>
          <select {...register("area")} id="area">
            <option value="">Select an area</option>
            {areas.map((a) => (
              <option key={a.strArea} value={a.strArea}>
                {a.strArea}
              </option>
            ))}
          </select>
        </div>
        <div className="submitContainer">
          <button type="submit">Next</button>
        </div>
      </form>
    </section>
  );
};

export default Page1;
