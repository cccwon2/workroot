import DeleteFormModal from "@/app/components/modal/modals/confirm/DeleteFormModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DeleteFormModal> = {
  title: "Design System/Components/Modal/Modals/DeleteFormModal",
  component: DeleteFormModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DeleteFormModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "지원서 삭제",
    message: "지원서를 삭제하시겠습니까?",
    onConfirm: () => console.log("삭제 확인"),
    onCancel: () => console.log("삭제 취소"),
    onClose: () => console.log("모달 닫기"),
  },
};
