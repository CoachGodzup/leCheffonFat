import Link from "next/link";

const Page1 = () => {
  const { register, handleSubmit } = useForm;
  const onSubmit = (data: page) => {
    console.log(
      "submitted. Saving into state and progress to the next page",
      data,
    );
  };

  return (
    <section className={styles.card}>
      <h1>What&apos;s on your mind&apos;s menu?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("category")}></input>
        <input {...register("area")}></input>
      </form>
      <Link href="/page2">next</Link>
    </section>
  );
};

export default Page1;
