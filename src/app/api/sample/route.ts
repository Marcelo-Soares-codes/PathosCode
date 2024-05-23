import prisma from "@/lib/db";
import { keyMiddleware } from "@/lib/middlewares/admin.middleware";
import { handleError } from "@/utils/Errors";
import { sampleSchema } from "@/utils/sampleValidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sampleList = await prisma.sample.findMany();
    return NextResponse.json({
      success: true,
      status: 200,
      sampleList,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  // Aplicar middleware de autenticação
  const middlewareResponse = await keyMiddleware(req);
  if (middlewareResponse.status === 401) {
    return middlewareResponse;
  }

  try {
    // Valide o corpo da requisição usando yup
    const requestData = await req.json();
    await sampleSchema.validate(requestData);

    const { name, description, shipping, anatId } = requestData;

    // verifica se a anat existe
    const anat = await prisma.anat.findUnique({
      where: { id: anatId },
    });
    if (!anat) {
      return NextResponse.json({
        success: false,
        status: 404,
        error: "Sample not found",
      });
    }

    // Crie a entrada Sample
    const newSample = await prisma.sample.create({
      data: {
        name,
        description,
        shipping,
        anatId,
      },
    });

    // Verifica se newSample é um objeto válido e não está vazio
    if (
      !newSample ||
      typeof newSample !== "object" ||
      Object.keys(newSample).length === 0
    ) {
      throw new Error("Failed to create Sample data");
    }

    // Retorna a resposta
    return NextResponse.json({
      success: true,
      message: "Sample created successfully!",
      status: 200,
      newSample,
    });
  } catch (error) {
    // Manipula o erro usando a função handleError
    return handleError(error);
  }
}
