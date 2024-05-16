import { NextRequest, NextResponse } from "next/server";

// Função de middleware para validação de autenticação
export async function keyMiddleware(req: NextRequest) {
  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Remove "Bearer " do token
  const token = authorizationHeader.replace(/^Bearer\s+/i, "");

  if (token !== process.env.SECRET_KEY_ADMIN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Continue com a requisição se a chave for válida
  return NextResponse.next();
}
