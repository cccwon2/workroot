"use client";
import BaseInput from "@/app/components/input/text/BaseInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import UploadInput from "@/app/components/input/file/UploadInput";
import Button from "@/app/components/button/default/Button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/tailwindUtil";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Label from "../../component/Label";
import uploadResume from "@/utils/uploadResume";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import tempSave from "@/utils/tempSave";
import { useUser } from "@/hooks/queries/user/me/useUser";
interface ApplyFormData {
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resume: FileList;
  introduction: string;
  password: string;
  resumeId: number;
  resumeName: string;
}
// 워크폼 만들기 - 지원자 (지원하기)
export default function Apply() {
  const formId = useParams().formId;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<ApplyFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      resumeId: 0,
      resumeName: "",
      introduction: "",
      password: user ? "00000000" : "",
    },
  });
  const currentValues = watch();

  const onTempSave = () => {
    tempSave("applyTempData", currentValues);
  };

  const handleUploadResume = async (file: File) => {
    try {
      const response = await uploadResume(file);
      setValue("resumeId", response.resumeId);
      setValue("resumeName", response.resumeName);
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("이력서 업로드에 실패했습니다.");
    }
  };

  // 폼 제출 리액트쿼리
  const mutation = useMutation({
    mutationFn: async () => {
      // 최신 값을 가져오기
      const { resume, ...submitData } = currentValues;
      if (submitData.resumeId !== 0) {
        await axios.post(`/api/forms/${formId}/applications`, submitData);
      } else {
        toast.error("이력서 파일을 다시 업로드해주세요.");
      }
    },
    onSuccess: async () => {
      // 로컬 스토리지 데이터 삭제
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tempAddFormData");
      }

      // 내 지원서 목록 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      await queryClient.invalidateQueries({ queryKey: ["formDetail", formId] });

      toast.success("지원이 완료되었습니다.");
      router.push(`/work/${formId}`);
    },

    onError: (error) => {
      console.error("지원하기에 실패했습니다.", error);
      toast.error("지원하기에 실패했습니다.");
      // 에러 발생 시 자동으로 임시저장
      onTempSave();
    },
  });

  const errorTextStyle =
    "absolute -bottom-[26px] right-1 text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(() => mutation.mutate())}>
      <Label>이름</Label>
      <BaseInput
        {...register("name", { required: "이름은 필수입니다" })}
        type="text"
        variant="white"
        placeholder="이름을 입력해주세요."
        errormessage={errors.name?.message}
      />

      <Label>연락처</Label>
      <BaseInput
        {...register("phoneNumber", {
          required: "연락처는 필수입니다",
          pattern: {
            value: /^[0-9]+$/,
            message: "숫자만 입력해주세요",
          },
        })}
        type="text"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.phoneNumber?.message}
      />

      <Label>경력(개월 수)</Label>
      <BaseInput
        {...register("experienceMonths", {
          required: "경력은 필수입니다",
        })}
        type="number"
        variant="white"
        placeholder="숫자만 입력해주세요"
        errormessage={errors.experienceMonths?.message}
      />

      <div className="relative flex w-full flex-col gap-4">
        <Label>이력서</Label>
        <UploadInput
          {...register("resume", {
            required: "이력서를 업로드해주세요.",
            validate: (file: FileList) => {
              if (!file) {
                return "이력서는 필수입니다";
              }
              const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ];
              if (!allowedTypes.includes(file[0].type)) {
                return "PDF 또는 Word 문서만 업로드 가능합니다.";
              }
              return true;
            },
            onChange: (e) => handleUploadResume(e.target.files[0]),
          })}
          accept=".pdf,.doc,.docx"
          variant="upload"
          placeholder="파일 업로드하기"
        />
        {errors.resume && <p className={cn(errorTextStyle, "")}>{errors.resume.message}</p>}
      </div>

      <Label>자기소개</Label>
      <BaseTextArea
        {...register("introduction", {
          required: "자기소개를 입력해주세요",
          maxLength: { value: 200, message: "최대 200자까지 입력 가능합니다." },
        })}
        variant="white"
        placeholder="최대 200자까지 입력 가능합니다."
        errormessage={errors.introduction?.message}
      />
      {/* 비회원일때만 비밀번호 입력 */}
      {!user && (
        <>
          <div className="relative">
            <Label>비밀번호</Label>
            <div className="absolute right-0 top-0 mt-[6px] text-xs font-normal leading-[18px] text-grayscale-400">
              지원내역 확인에 사용됩니다.
            </div>
          </div>
          <div>
            <BaseInput
              {...register("password", {
                required: "비밀번호는 필수입니다.",
                minLength: { value: 8, message: "8자리 이상 입력해주세요." },
                pattern: {
                  value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
                  message: "영문, 숫자, 특수문자 조합으로 입력해주세요.",
                },
              })}
              type="password"
              variant="white"
              placeholder="비밀번호를 입력해주세요."
              errormessage={errors.password?.message}
            />
          </div>
        </>
      )}

      <div className="lg:flex-2 mt-4 flex w-full flex-col gap-[10px] lg:mt-8 lg:flex-row">
        <Button
          type="button"
          variant="outlined"
          width="md"
          color="orange"
          className="h-[58px] w-full border lg:h-[72px] lg:text-xl lg:leading-8"
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
          className="h-[58px] w-full lg:h-[72px] lg:text-xl lg:leading-8"
          disabled={!isValid || !isDirty}
        >
          {mutation.isPending ? <DotLoadingSpinner /> : "작성 완료"}
        </Button>
      </div>
    </form>
  );
}
