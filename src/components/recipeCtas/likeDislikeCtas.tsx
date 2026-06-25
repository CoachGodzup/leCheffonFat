import { ThumbsUp, ThumbsDown } from "lucide-react";

type LikeDislikeCtasProps = {
  likeFn: (like: boolean) => void;
  currentLike: boolean | null;
};

const LikeDislikeCtas = ({ likeFn, currentLike }: LikeDislikeCtasProps) => (
  <div className="cta-container">
    <p>Did it match your preferences?</p>
    <button
      onClick={() => likeFn(true)}
      aria-label="Like"
      className={currentLike === true ? "btn-primary" : undefined}
    >
      <ThumbsUp size={24} />
    </button>
    <button
      onClick={() => likeFn(false)}
      aria-label="Dislike"
      className={currentLike === false ? "btn-primary" : undefined}
    >
      <ThumbsDown size={24} />
    </button>
  </div>
);

export default LikeDislikeCtas;
