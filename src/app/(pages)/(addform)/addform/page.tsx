"use client";
import Label from "../component/Label";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import DatePickerInput from "@/app/components/input/dateTimeDaypicker/DatePickerInput";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/app/components/button/default/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import router from "next/router";
import axios from "axios";
import { cn } from "@/lib/tailwindUtil";
import useWidth from "@/hooks/useWidth";
import TabMenuDropdown from "@/app/components/button/dropdown/TabMenuDropdown";

interface AddFormData {
  isPublic: boolean;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  workDays: string[];
  workEndTime: string;
  workStartTime: string;
  workEndDate: string;
  workStartDate: string;
  location: string;
  preferred: string;
  age: string;
  education: string;
  gender: string;
  numberOfPositions: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  description: string;
  title: string;
}

// 알바폼 만들기 - 사장님
export default function AddForm() {
  const methods = useForm<AddFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      recruitmentStartDate: undefined,
      recruitmentEndDate: undefined,
      imageUrls: [],
    },
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    setValue,
  } = methods;

  const [recruitmentDateRange, setRecruitmentDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const handleRecruitmentDateChange = (dates: [Date | null, Date | null]) => {
    setRecruitmentDateRange(dates);
    const [start, end] = dates;
    if (start) setValue("recruitmentStartDate", start.toISOString());
    if (end) setValue("recruitmentEndDate", end.toISOString());
  };

  // 이미지 업로드 api
  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    // 전체 파일 배열을 순회하면서 업로드 로직 진행
    for (const file of files) {
      // 파일 크기 체크 (예: 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error(`5MB 이상의 파일은 업로드할 수 없습니다.`);
        continue;
      }
      const formData = new FormData();
      formData.append("image", file, file.name); // 파일 이름 추가
      try {
        const response = await axios.post(`/api/images/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [(data) => data],
        });
        console.log("response", response);
        if (response.data.url) {
          uploadedUrls.push(response.data.url);
        }
      } catch (uploadError) {
        console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
        toast.error(`${file.name} 업로드에 실패했습니다.`);
      }
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: AddFormData) => {
    // submit 할때 이미지 업로드 함수 호출
    if (imageFiles.length > 0) {
      const uploadedUrls = await uploadImages(imageFiles);
      data.imageUrls = uploadedUrls;
    }
    try {
      // 전체 폼 데이터 POST요청
      // await axios.post(`/api/forms`, data); // 전체 폼 작성해야됨 //displayDate 제외하기
      window.localStorage.removeItem("tempAddFormData");
      toast.success("알바폼을 등록했습니다.");
      router.back();
    } catch (error) {
      toast.error("에러가 발생했습니다. 작성 중인 내용은 임시 저장됩니다.");
      console.error("Error submitting application:", error);
      onTempSave();
    }
  };

  const onTempSave = async () => {
    const currentData = getValues();
    currentData.imageUrls = currentData.imageUrls || [];

    if (imageFiles && imageFiles.length > 0) {
      try {
        const uploadedUrls = await uploadImages(imageFiles);
        if (uploadedUrls.length > 0) {
          console.log("uploadedUrls", uploadedUrls);
          currentData.imageUrls = [...currentData.imageUrls, ...uploadedUrls];
        } else {
          currentData.imageUrls = [];
          toast.error("이미지 업로드에 실패했습니다.");
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
        currentData.imageUrls = [];
      }
    } else {
      currentData.imageUrls = [];
    }

    window.localStorage.setItem("tempAddFormData", JSON.stringify(currentData));
    toast.success("임시 저장되었습니다.");
    console.log(currentData);
  };

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  // TopMenuDropdown 관련 로직 추가
  const { isDesktop } = useWidth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  const handleMenuClick = (menu: string) => {
    // 모바일, 태블릿에서만 메뉴 클릭시 드롭다운 열림
    if (!isDesktop) {
      setMenuOpen((prev) => !prev);
    }
    setSelectedMenu(menu);
  };

  return (
    <div className="relative">
      <aside className="top-0 hidden rounded-[24px] bg-background-200 lg:fixed lg:top-10 lg:p-10">
        {/* 라벨 선택하면 페이지 contenct 이동 & isEditing: 각 폼 isDirty 연동 */}
        <TabMenuDropdown
          onClick={handleMenuClick}
          options={[
            { label: "모집 내용", isEditing: true },
            { label: "모집 조건", isEditing: false },
            { label: "근무 조건", isEditing: false },
          ]}
        />
      </aside>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 flex flex-col gap-4">
          <Label>알바폼 제목</Label>
          <BaseInput
            {...register("title", { required: "제목을 입력해주세요" })}
            type="text"
            variant="white"
            placeholder="제목을 입력해주세요."
            errormessage={errors.title?.message}
          />

          <Label>소개글</Label>
          <BaseTextArea
            {...register("description", {
              required: "자기소개를 입력해주세요",
              maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
            })}
            variant="white"
            placeholder="최대 200자까지 입력 가능합니다."
            errormessage={errors.description?.message}
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
              errormessage={isDirty && (!recruitmentDateRange[0] || !recruitmentDateRange[1])}
            />
            {!recruitmentDateRange[0] ||
              (!recruitmentDateRange[1] && <p className={cn(errorTextStyle, "")}> 모집 기간은 필수입니다.</p>)}
          </div>

          <Label>이미지 첨부</Label>
          <ImageInput
            {...register("imageUrls", { required: "이미지는 필수입니다." })}
            onChange={(files) => {
              setImageFiles(files);
            }}
          />
          {errors.imageUrls && <p className={cn(errorTextStyle, "")}>{errors.imageUrls.message}</p>}

          <div className="flex flex-col gap-2 lg:absolute">
            <Button
              type="button"
              variant="outlined"
              width="md"
              color="orange"
              className="h-[58px] border bg-background-100 lg:h-[72px] lg:text-xl lg:leading-8"
              onClick={onTempSave}
              disabled={!isDirty}
            >
              임시 저장
            </Button>
            <Button
              type="submit"
              variant="solid"
              width="md"
              color="orange"
              className="h-[58px] lg:h-[72px] lg:text-xl lg:leading-8"
              disabled={!isValid}
            >
              작성 완료
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
