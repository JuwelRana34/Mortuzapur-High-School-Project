import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

// Success রেসপন্স পাঠানোর ফাংশন
export const sendSuccess = (
  c: Context,
  message: string,
  data: any = null,
  status: ContentfulStatusCode = 200,
) => {
  return c.json(
    {
      success: true,
      message,
      data,
    },
    status,
  );
};

// Error রেসপন্স পাঠানোর ফাংশন
export const sendError = (
  c: Context,
  message: string,
  errorDetails: any = null,
  status: ContentfulStatusCode = 400,
) => {
  return c.json(
    {
      success: false,
      message,
      error: errorDetails,
    },
    status,
  );
};
