import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import * as yup from "yup";

export const handleError = (
  error: any,
  errorMessage?: string,
  errorCode?: string
) => {
  // Verifica se é um erro de validação do yup
  if (error instanceof yup.ValidationError) {
    return NextResponse.json({ errors: error.errors });
  }

  // Determine the message and code to use
  const message =
    errorMessage || error.message || "An unexpected error occurred";
  const code = errorCode || error.code || "INTERNAL_SERVER_ERROR";

  // Log the error (you can adjust the logging mechanism as needed)
  console.error(`Error Code: ${code}, Error Message: ${message}`, error);

  // Determine the status code to send in the response
  const statusCode = determineStatusCode(code);

  // Create the error response
  const response = {
    success: false,
    message,
    status: statusCode || code,
    details: error?.message || "An unexpected error occurred",
  };

  // Send the error response
  return NextResponse.json(response);
};

// Helper function to determine status code based on the error code
const determineStatusCode = (errorCode: string): number => {
  switch (errorCode) {
    case "NOT_FOUND":
      return 404;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "BAD_REQUEST":
      return 400;
    default:
      return 500; // Internal Server Error for unknown error codes
  }
};
