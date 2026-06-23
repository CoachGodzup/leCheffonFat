type LikeDislikeCtasProps = {
  likeFn: (like: boolean) => void;
};

const LikeDislikeCtas = ({ likeFn }: LikeDislikeCtasProps) => (
  <div className="cta-container">
    <p>Did it match your preferences?</p>
    <button onClick={() => likeFn(true)}>👍</button>
    <button onClick={() => likeFn(false)}>👎</button>
  </div>
);

export default LikeDislikeCtas;
