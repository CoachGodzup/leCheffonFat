"use client";

import { FieldValues, useForm } from "react-hook-form";
import styles from "./page1.module.css";
import { page1Request } from "@/types/form";
import { useRouter } from "next/navigation";

const Page1 = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  /* const setPage1 = usePreferencesStore((s) => s.setPage1); TODO Store is missing*/

  const onSubmit = (data: FieldValues) => {
    console.log(
      "submitted. Saving into state and progress to the next page",
      data,
    );
    /* setPage1(data) TODO store*/
    router.push("/page2");
  };

  return (
    <section className={styles.card}>
      <h1>What&apos;s on your mind&apos;s menu?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("category")} placeholder="category"></input>
        <input {...register("area")} placeholder="area"></input>
        <button type="submit">Next</button>
      </form>
    </section>
  );
};

export default Page1;
