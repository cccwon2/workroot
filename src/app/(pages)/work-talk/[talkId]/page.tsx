"use client";

import { useParams } from "next/navigation";
import { PostDetailSection } from "./sections/PostDetailSection";
import { CommentsSection } from "./sections/CommentsSection";

export default function PostDetailPage() {
  const { albatalkId } = useParams();

  return (
    <div className="mx-auto flex w-full min-w-[375px] max-w-screen-xl flex-col items-center px-4">
      <PostDetailSection postId={albatalkId.toString()} />
      <CommentsSection postId={albatalkId.toString()} />
    </div>
  );
}