"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

import FormStep from "@/components/molecules/FormStep/FormStep";
import { useAreasByCategory } from "@/hooks/use-areas-by-category";
import { useStore } from "@/store";

const Page2 = () => {
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

  const count = areas?.length ?? 0;

  return (
    <FormStep
      title="Choose an Area | Le Cheffon Fat"
      heading="Where are you cooking from?"
      subtitle={`${count || "No"} results found for ${category || "all categories"}`}
      fieldLabel="Area"
      fieldName="area"
      options={(areas ?? []).map((a) => ({
        value: a.strArea,
        label: a.strArea,
      }))}
      submitLabel="Complete"
      isLoading={areasLoading}
      fetchError={areasError}
      storeValue={area}
      onSubmit={(value) => {
        setPage2({ area: value });
        router.push("/recommendation");
      }}
      backHref="/page1"
      backLabel="Back to category selection"
    />
  );
};

export default Page2;
