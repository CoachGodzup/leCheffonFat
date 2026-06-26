import { ThumbsDown, ThumbsUp } from "lucide-react";

import styles from "./likeDislikeCtas.module.css";

type LikeDislikeCtasProps = {
  likeFn: (like: boolean) => void;
  currentLike: boolean | null;
};

const LikeDislikeCtas = ({ likeFn, currentLike }: LikeDislikeCtasProps) => (
  <div className={"cta-container " + styles.container}>
    <p>Did it match your preferences?</p>
    <button
      onClick={() => likeFn(true)}
      aria-label="Like"
      aria-pressed={currentLike === true}
      className={currentLike === true ? "btn-primary" : undefined}
    >
      <ThumbsUp size={24} aria-hidden="true" /> Like
    </button>
    <button
      onClick={() => likeFn(false)}
      aria-label="Dislike"
      aria-pressed={currentLike === false}
      className={currentLike === false ? "btn-primary" : undefined}
    >
      <ThumbsDown size={24} aria-hidden="true" /> Dislike
    </button>
  </div>
);

export default LikeDislikeCtas;
