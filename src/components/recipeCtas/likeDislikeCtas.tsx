import { ThumbsUp, ThumbsDown } from "lucide-react";

type LikeDislikeCtasProps = {
  likeFn: (like: boolean) => void;
};

const LikeDislikeCtas = ({ likeFn }: LikeDislikeCtasProps) => (
  <div className="cta-container">
    <p>Did it match your preferences?</p>
    <button onClick={() => likeFn(true)} aria-label="Like">
      <ThumbsUp size={24} />
    </button>
    <button onClick={() => likeFn(false)} aria-label="Dislike">
      <ThumbsDown size={24} />
    </button>
  </div>
);

export default LikeDislikeCtas;
