"use client";

import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { page2Request } from "@/types/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormSelect from "@/components/form/formSelect/FormSelect";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useAreas } from "@/hooks/use-areas";

const Page2 = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<page2Request>();
  const router = useRouter();

  const {
    data: areas,
    isLoading: areasLoading,
    error: areasError,
  } = useAreas();

  const { area, setPage2 } = useStore(
    useShallow((s) => ({
      area: s.area,
      setPage2: s.setPage2,
    })),
  );

  useEffect(() => {
    reset({ area });
  }, [area, reset]);

  const onSubmit = (data: FieldValues) => {
    console.log("submitted", data);
    setPage2({ area: data.area });
    router.push("/recommendation");
  };

  if (areasLoading) return <p>Loading...</p>;

  return (
    <section className="card">
      <h1>Where are you craving from?</h1>
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
          <Link href="/page1">back</Link>
          <button type="submit">Complete</button>
        </div>
        {areasError && (
          <div className="alert alert-error">
            <p>Error: {areasError}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Page2;
