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

    const anat = await prisma.anat.findUnique({
      where: { id },
    });

    if (!anat) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Anat not found",
      });
    }

    return NextResponse.json({ success: true, status: 200, anat });
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

    // Iniciar uma transação
    const deletedAnat = await prisma.$transaction([
      // Excluir a Anat
      prisma.anat.delete({
        where: { id },
      }),
      // Excluir todas as amostras vinculadas à Anat
      prisma.sample.deleteMany({
        where: { anatId: id },
      }),
    ]);

    if (!deletedAnat) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Anat not found",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Anat successfully deleted!",
      anat: deletedAnat,
    });
  } catch (error) {
    handleError(error);
  }
}
