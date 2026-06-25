"use client";

import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { Page2Request } from "@/types/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormSelect from "@/components/form/formSelect/FormSelect";
import { useStore } from "@/store";
import { useAreasByCategory } from "@/hooks/use-areas-by-category";
import { useShallow } from "zustand/shallow";

const Page2 = () => {
  useEffect(() => {
    document.title = "Choose an Area | Le Cheffon Fat";
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Page2Request>();
  const router = useRouter();

  const { category, area, setPage2 } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
      setPage2: s.setPage2,
    })),
  );

  const {
    data: areas,
    isLoading: areasLoading,
    error: areasError,
  } = useAreasByCategory(category);

  useEffect(() => {
    reset({ area });
  }, [area, reset]);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
    setPage2({ area: data.area });
    router.push("/recommendation");
  };

  if (areasLoading) return <p role="status">Loading...</p>;

  return (
    <section className="card">
      <h1>Where are you cooking from?</h1>
      <p>
        {areas?.length || "No"} results found for {category}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Link href="/page1" aria-label="Back to category selection">
            Back
          </Link>
          <button type="submit">Complete</button>
        </div>
        {areasError && (
          <div className="alert alert-error">
            <p role="alert">Error: {areasError}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Page2;
