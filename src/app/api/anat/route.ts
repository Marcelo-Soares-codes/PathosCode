import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { anatSchema } from "@/utils/AnatValidate";
import { handleError } from "@/utils/Errors";
import { keyMiddleware } from "@/lib/middlewares/admin.middleware";

export async function GET(req: NextRequest) {
  try {
    const anatList = await prisma.anat.findMany();
    return NextResponse.json({
      success: true,
      status: 200,
      anatList,
    });
  } catch (error) {
    handleError(error);
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
    await anatSchema.validate(req.json);

    const { name, description, comments, executions } = await req.json();

    // Crie a entrada Anat
    const newAnat = await prisma.anat.create({
      data: {
        name,
        description,
        comments,
        executions,
      },
    });

    // Verifica se newAnat é um objeto válido e não está vazio
    if (
      !newAnat ||
      typeof newAnat !== "object" ||
      Object.keys(newAnat).length === 0
    ) {
      throw new Error("Failed to create Anat data");
    }

    // Retorna a resposta usando NextResponse.json()
    return NextResponse.json({
      success: true,
      message: "anat created successfully!",
      status: 200,
      data: newAnat,
    });
  } catch (error) {
    // Manipula o erro usando a função handleError
    return handleError(error);
  }
}
