import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

export async function POST(req: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    console.log("No access token found");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    if (!image) {
      console.log("No file found in request");
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    // FormData 생성 및 파일 추가
    const uploadFormData = new FormData();
    uploadFormData.append("image", image);

    const response = await apiClient.post("/images/upload", uploadFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && typeof response.data === "object") {
      const { url } = response.data;

      if (url) {
        return NextResponse.json({ url }, { status: 201 });
      }
    }

    throw new Error("Invalid response format from file API");
  } catch (error: any) {
    console.error("Upload error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        message: "Upload failed",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
