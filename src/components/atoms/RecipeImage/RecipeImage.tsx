"use client";

import Image from "next/image";
import { type ComponentProps, useCallback, useState } from "react";

import styles from "./RecipeImage.module.css";

type Props = ComponentProps<typeof Image>;

const RecipeImage = (props: Props) => {
  const { src, alt, className, ...rest } = props;
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const hasExplicitSize =
    typeof rest.width === "number" && typeof rest.height === "number";
  const showPlaceholder =
    !src || (typeof src === "string" && !src.trim()) || hasError;

  if (showPlaceholder) {
    return (
      <div
        className={styles.wrapper}
        style={
          hasExplicitSize
            ? { width: rest.width, height: rest.height }
            : undefined
        }
      >
        <div
          className={styles.placeholder}
          role="img"
          aria-label={typeof alt === "string" ? alt : "Recipe image"}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        alt={alt}
        className={`${styles.image} ${className ?? ""}`}
        onError={handleError}
        {...rest}
      />
    </div>
  );
};

export default RecipeImage;
