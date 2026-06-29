import Link from "next/link";

import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";

import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  area: string;
  tags?: string | null;
};

const RecipeCard = ({
  id,
  title,
  imageUrl,
  category,
  area,
  tags,
}: RecipeCardProps) => (
  <li className={styles.card}>
    <Link href={`/recommendation/${id}`}>
      <RecipeImage src={imageUrl} alt={title} width={300} height={110} />
      <div className={styles.body}>
        <h3>{title}</h3>
        <p>
          {category} — {area}
        </p>
        {tags && <p className={styles.tags}>{tags}</p>}
      </div>
    </Link>
  </li>
);

export default RecipeCard;
