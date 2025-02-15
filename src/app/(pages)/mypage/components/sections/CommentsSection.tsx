"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useMyComments } from "@/hooks/queries/user/me/useMyComments";
import Pagination from "@/app/components/pagination/Pagination";
import BoardComment from "@/app/components/card/board/BoardComment";
import ContentSection from "@/app/components/layout/ContentSection";
import useWidth from "@/hooks/useWidth";
import ScrollTopButton from "@/app/components/button/default/ScrollTopButton";
import SamllLoadingSpinner from "@/app/components/loading-spinner/SmallLoadingSpinner";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function CommentsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile, isTablet } = useWidth();

  // 화면 크기에 따른 페이지당 댓글 수 계산
  const getCommentsPerPage = () => {
    if (isMobile) return 2; // 1열 x 2줄 = 2개
    if (isTablet) return 2; // 1열 x 2줄 = 4개
    return 6; // 3열 x 2줄 = 6개
  };

  const commentsPerPage = getCommentsPerPage();

  const { data, isLoading, error } = useMyComments({
    page: currentPage,
    pageSize: commentsPerPage,
  });

  const totalPages = data ? Math.ceil(data.totalItemCount / commentsPerPage) : 0;

  // 화면 크기가 변경될 때 현재 페이지 재조정
  useEffect(() => {
    const newTotalPages = data ? Math.ceil(data.totalItemCount / commentsPerPage) : 0;
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [commentsPerPage, data, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-300px)] items-center justify-center">
        <p className="text-primary-orange-300">댓글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center">
        <p className="text-grayscale-500">작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
        {isLoading && SamllLoadingSpinner}
        {/* ScrollTopButton 추가 */}
        <ScrollTopButton showHeight={300} />

        <ContentSection>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {data.data.map((comment) => (
              <BoardComment
                key={comment.id}
                id={comment.id.toString()}
                postId={comment.post.id.toString()}
                postTitle={comment.post.title}
                postContent={comment.post.content}
                comment={comment.content}
                updatedAt={comment.updatedAt}
                isAuthor={true}
              />
            ))}
          </div>
        </ContentSection>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
