import { ThumbsDown, ThumbsUp } from "lucide-react";

const iconStyle = { marginInlineEnd: "0.35em" as const };

export const FILTER_OPTIONS = [
  {
    value: true,
    label: (
      <>
        <ThumbsUp size={16} style={iconStyle} aria-hidden="true" /> Liked
      </>
    ),
  },
  {
    value: false,
    label: (
      <>
        <ThumbsDown size={16} style={iconStyle} aria-hidden="true" /> Disliked
      </>
    ),
  },
  { value: null, label: "Unrated" },
] as const;
