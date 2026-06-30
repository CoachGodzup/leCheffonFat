"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

import FormStep from "@/components/molecules/FormStep/FormStep";
import { useCategories } from "@/hooks/use-categories";
import { useStore } from "@/store";

const Page1 = () => {
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

  return (
    <FormStep
      title="Choose a Category | Le Cheffon Fat"
      heading="What's on your mind's menu?"
      fieldLabel="Category"
      fieldName="category"
      options={(categories ?? []).map((c) => ({
        value: c.strCategory,
        label: c.strCategory,
      }))}
      submitLabel="Next"
      isLoading={catLoading}
      fetchError={catError}
      storeValue={category}
      onSubmit={(value) => {
        setPage1({ category: value });
        router.push("/page2");
      }}
    />
  );
};

export default Page1;
