import { NextResponse } from "next/server";
import { config } from "dotenv";
import cookie from "cookie";

config(); // Carrega as variáveis de ambiente do arquivo .env

export async function POST(req: Request) {
  const { token } = await req.json();
  const secretKey = process.env.SECRET_KEY_ADMIN;

  if (!token || !secretKey) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  if (token === secretKey) {
    const serializedCookie = cookie.serialize("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60, // 30 minutos
      path: "/",
    });

    const response = NextResponse.json(
      { message: "Autenticação bem-sucedida" },
      { status: 200 }
    );
    response.headers.append("Set-Cookie", serializedCookie);
    return response;
  } else {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
