"use client";
// 알바폼 수정 페이지 (사장님)

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";
import Button from "@/app/components/button/default/Button";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import RecruitContentSection from "../../../addform/section/RecruitContentSection";
import RecruitConditionSection from "../../../addform/section/RecruitConditionSection";
import WorkConditionSection from "../../../addform/section/WorkConditionSection";
import { SubmitFormDataType } from "@/types/addform";
import useEditing from "@/hooks/useEditing";
import useFormDetail from "@/hooks/queries/form/detail/useFormDetail";

export default function EditFormPage() {
  const router = useRouter();
  const [formIdState, setFormIdState] = useState<number>(0);
  const formId = useParams().formId;

  useEffect(() => {
    // formId가 문자열로 전달되므로 숫자로 변환하여 상태에 저장
    if (formId) {
      setFormIdState(Number(formId)); // formId를 숫자로 변환하여 상태에 저장
    }
  }, [formId]);

  const { albaFormDetailData, isLoading, error } = useFormDetail({ formId: formIdState });

  const methods = useForm<SubmitFormDataType>({
    mode: "onChange",
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  // 훅폼에서 관리하는 전체 데이터를 가져오는 함수
  const currentValues: SubmitFormDataType = methods.watch();
  const imageFiles = currentValues.imageFiles;
  // 탭 선택 옵션 관리
  const [selectedOption, setSelectedOption] = useState("모집 내용");
  // 이미지 업로드 훅
  const { uploadImageMutation } = useUpdateProfile();
  // 각각의 탭 작성중 여부
  const { isEditingRecruitContent, isEditingRecruitCondition, isEditingWorkCondition } = useEditing(currentValues);

  // 비동기 데이터로 폼 상태 업데이트
  useEffect(() => {
    if (albaFormDetailData) {
      reset({
        isPublic: albaFormDetailData.isPublic,
        hourlyWage: albaFormDetailData.hourlyWage, // 쉼표 추가하기
        isNegotiableWorkDays: albaFormDetailData.isNegotiableWorkDays,
        workDays: albaFormDetailData.workDays,
        workEndTime: albaFormDetailData.workEndTime,
        workStartTime: albaFormDetailData.workStartTime,
        workEndDate: albaFormDetailData.workEndDate, // display값에 반영하기
        workStartDate: albaFormDetailData.workStartDate,
        location: albaFormDetailData.location,
        preferred: albaFormDetailData.preferred, //value 반영하기
        age: albaFormDetailData.age, //value 반영하기
        education: albaFormDetailData.education, //value 반영하기
        gender: albaFormDetailData.gender, //value 반영하기
        numberOfPositions: albaFormDetailData.numberOfPositions, //value 반영하기
        recruitmentEndDate: albaFormDetailData.recruitmentEndDate, // display값에 반영하기
        recruitmentStartDate: albaFormDetailData.recruitmentStartDate,
        description: albaFormDetailData.description,
        title: albaFormDetailData.title,
        imageUrls: albaFormDetailData.imageUrls, // 프리뷰 반영하기
      });
    }
  }, [albaFormDetailData, reset]);

  // useEffect(() => {
  //   if (albaFormDetailData) {
  //     console.log("edit page에서 data", albaFormDetailData);
  //     console.log("edit page에서 currentValues", currentValues);
  //   }
  // }, [albaFormDetailData, currentValues]);

  // 이미지 업로드 api
  const uploadImages = async (files: File[]) => {
    if (currentValues.imageUrls.length !== currentValues.imageFiles.length) {
      const uploadedUrls: string[] = [];

      // 전체 파일 배열을 순회하면서 업로드 로직 진행
      for (const file of files) {
        // 파일 크기 체크
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          toast.error(`5MB 이상의 파일은 업로드할 수 없습니다.`);
          continue;
        }
        const formData = new FormData();
        formData.append("image", file);
        try {
          const uploadResponse = await uploadImageMutation.mutateAsync(file);
          if (uploadResponse?.url) {
            uploadedUrls.push(uploadResponse.url);
          }
        } catch (uploadError) {
          console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
        }
      }
      return uploadedUrls;
    } else {
      return currentValues.imageUrls;
    }
  };

  // 폼데이터 임시 저장 함수
  const onTempSave = async () => {
    // 이미지 처리 로직
    if (imageFiles && imageFiles.length > 0) {
      try {
        const uploadedUrls = await uploadImages(Array.from(imageFiles));
        if (uploadedUrls && uploadedUrls.length > 0) {
          setValue("imageUrls", [...uploadedUrls]);
        } else {
          setValue("imageUrls", [...currentValues.imageUrls]);
        }
      } catch (error) {
        console.error("임시저장 - 이미지 업로드 중 오류 발생:", error);
        setValue("imageUrls", []);
      }
    }
    // 임시저장
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tempAddFormData", JSON.stringify(currentValues));
    }
    console.log("임시저장 데이터", currentValues);
  };

  // 수정된 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      const excludedKeys = ["displayDate", "workDateRange", "recruitDateRange", "imageFiles"];

      // 원하는 필드만 포함된 새로운 객체 만들기
      const filteredData = Object.entries(currentValues)
        .filter(([key]) => !excludedKeys.includes(key)) // 제외할 키를 필터링
        .reduce((acc: Partial<SubmitFormDataType>, [key, value]) => {
          if (key === "numberOfPositions") {
            // numberOfPositions는 숫자형으로 변환
            acc[key] = Number(value);
          } else if (key === "hourlyWage") {
            // hourlyWage는 쉼표를 제거하고 숫자형으로 변환
            if (value.includes(",")) acc[key] = Number(value.replaceAll(/,/g, "")); // 쉼표 제거 후 숫자형 변환
          } else {
            acc[key as keyof SubmitFormDataType] = value; // 나머지 값은 그대로 추가
          }
          return acc;
        }, {});
      await axios.patch(`/api/forms/${formId}`, filteredData);
    },
    onSuccess: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tempAddFormData");
      }
      toast.success("알바폼을 수정했습니다.");
      router.push(`/alba/${formId}`);
    },
    onError: (error) => {
      console.error("에러가 발생했습니다.", error);
      toast.error("에러가 발생했습니다.");
    },
  });

  // tab 선택 시 Url params 수정 & 하위 폼 데이터 임시저장
  const searchParams = useSearchParams();
  const currentParam = searchParams.get("tab");
  const [prevOption, setPrevOption] = useState<string | null>(null);
  const initialLoad = currentParam === null; // 초기 로딩 여부 확인

  const handleOptionChange = async (option: string) => {
    onTempSave();
    setSelectedOption(option);
    if (!initialLoad && option !== currentParam && option !== prevOption && isDirty) {
      setPrevOption(option);
    }
    const params = {
      "모집 내용": "recruit-content",
      "모집 조건": "recruit-condition",
      "근무 조건": "work-condition",
    }[option];
    router.push(`/alba/${formId}/edit?tab=${params}`);
  };

  const renderChildren = () => {
    switch (selectedOption) {
      case "모집 내용":
        return <RecruitContentSection key="recruitContent" />;
      case "모집 조건":
        return <RecruitConditionSection key="recruitCondition" />;
      case "근무 조건":
        return <WorkConditionSection key="workCondition" />;
      default:
        return <></>;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 데이터를 불러오는데 문제가 발생했습니다.</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="relative">
        <aside className="flex flex-col items-center justify-between rounded-[24px] bg-background-200 lg:fixed lg:left-[108px] lg:top-[64px] lg:m-10 lg:h-[80vh] lg:p-10">
          <TabMenuDropdown
            options={[
              {
                label: "모집 내용",
                isEditing: isEditingRecruitContent || initialLoad || currentParam === "recruit-content",
              },
              { label: "모집 조건", isEditing: isEditingRecruitCondition || currentParam === "recruit-condition" },
              { label: "근무 조건", isEditing: isEditingWorkCondition || currentParam === "work-condition" },
            ]}
            onChange={handleOptionChange}
            currentParam={currentParam || ""}
          />
          <div className="absolute -bottom-[120px] mb-5 flex w-full lg:relative lg:bottom-0">
            <Button
              type="submit"
              variant="solid"
              width="md"
              color="orange"
              className="h-[58px] w-full lg:h-[72px] lg:text-xl lg:leading-8"
              disabled={!isValid}
              onClick={handleSubmit(() => mutation.mutate())}
            >
              수정하기
            </Button>
          </div>
        </aside>
        {renderChildren()}
      </div>
    </FormProvider>
  );
}
