"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { cn } from "@/lib/tailwindUtil";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Label from "../../component/Label";
import { ImageInputType } from "@/types/addform";

// 알바폼 만들기 - 사장님 - 1-모집내용

export default function RecruitContentSection() {
  // 이미지 파일을 로컬 상태에 저장
  const [initialImageList, setInitialImageList] = useState<ImageInputType[]>([]);

  //훅폼 하위 컴포넌트에서는 useFormcontext에서 메서드 호출
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const imageImagesData: string[] = watch("imageUrls");
  const imageFilesData: File[] = watch("imageFiles");
  const length = imageFilesData?.length || 0;
  const lastImageFile = length > 0 ? imageFilesData[length - 1] : null;

  // 이미지 파일 change핸들러
  const handleChangeImages = (files: File[]) => {
    setValue("imageFiles", files);
    if (!lastImageFile) {
      console.error("No files found");
      return;
    }
    const updatedImageList = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setInitialImageList(updatedImageList);
  };

  useEffect(() => {
    if (imageFilesData?.length > 0) {
      const updatedImageList = imageFilesData.map((file: File) => ({
        file,
        url: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      }));
      setInitialImageList(updatedImageList);
    }
  }, [imageFilesData]);

  // edit 페이지에서 쿼리 데이터로 프리뷰 추가
  useEffect(() => {
    if (imageImagesData?.length > 0) {
      const updatedImageList = imageImagesData.map((url: string) => ({
        file: null,
        url,
        id: crypto.randomUUID(),
      }));
      setInitialImageList(updatedImageList);
    }
  }, [imageImagesData]);

  // 날짜 선택
  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString());
  };
  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <div className="relative">
      <form className="my-8 flex flex-col gap-4">
        <Label>알바폼 제목</Label>
        <BaseInput
          {...register("title", { required: "제목을 입력해주세요" })}
          type="text"
          variant="white"
          placeholder="제목을 입력해주세요."
          errormessage={errors.title?.message as string}
        />

        <Label>소개글</Label>
        <BaseTextArea
          {...register("description", {
            required: "자기소개를 입력해주세요",
            maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
          })}
          variant="white"
          placeholder="최대 200자까지 입력 가능합니다."
          errormessage={errors.description?.message as string}
        />

        <div className="relative flex flex-col gap-2">
          <Label>모집 기간</Label>
          <DatePickerInput
            startDateName="recruitmentStartDate"
            endDateName="recruitmentEndDate"
            startDate={recruitmentDateRange[0] || undefined}
            endDate={recruitmentDateRange[1] || undefined}
            onChange={handleRecruitmentDateChange}
            required={true}
            errormessage={!recruitmentDateRange[0] || !recruitmentDateRange[1]}
            displayValue="recruitDateRange"
          />
          {!recruitmentDateRange[0] ||
            (!recruitmentDateRange[1] && <p className={cn(errorTextStyle, "")}> 모집 기간은 필수입니다.</p>)}
        </div>

        <Label>이미지 첨부</Label>
        <div>
          <ImageInput
            {...register("imageUrls", { required: "이미지는 필수입니다." })}
            onChange={(files: File[]) => {
              handleChangeImages(files);
            }}
            initialImageList={initialImageList}
          />
          {errors.imageUrls && <p className={cn(errorTextStyle, "")}>{errors.imageUrls.message as string}</p>}
        </div>
      </form>
    </div>
  );
}
