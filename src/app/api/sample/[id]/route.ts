import prisma from "@/lib/db";
import { keyMiddleware } from "@/lib/middlewares/admin.middleware";
import { handleError } from "@/utils/Errors";
import { GetParamUrl } from "@/utils/GetParamUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.pathname;
    const id = GetParamUrl(url, "id");

    if (typeof id !== "string") {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Invalid ID format",
      });
    }

    const sample = await prisma.sample.findUnique({
      where: { id },
    });

    if (!sample) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Sample not found",
      });
    }

    return NextResponse.json({ success: true, status: 200, sample });
  } catch (error) {
    handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  // Aplicar middleware de autenticação
  const middlewareResponse = await keyMiddleware(req);
  if (middlewareResponse.status === 401) {
    return middlewareResponse;
  }
  try {
    const url = req.nextUrl.pathname;
    const id = GetParamUrl(url, "id");

    if (typeof id !== "string") {
      return NextResponse.json({
        success: false,
        status: 400,
        error: "Invalid ID format",
      });
    }

    const deletedSample = await prisma.sample.delete({
      where: { id },
    });

    if (!deletedSample) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Sample not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Sample successfully deleted!",
      sample: deletedSample,
    });
  } catch (error) {
    handleError(error);
  }
}
