import axios from "axios";
import { NextResponse } from "next/server";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServerApiResponse<T> {
  data?: T;
  status: number;
  ok: boolean;
  error?: string;
}

// ─── Axios instance ───────────────────────────────────────────────────────────

const serverApi = axios.create({
  baseURL: process.env.API_URL,
  timeout: 60000,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const buildHeaders = (access: string, includeApiKey = false) => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${access}`,
  ...(includeApiKey && { "API-Key": process.env.BACKEND_API_KEY! }),
});

const buildPublicHeaders = (includeApiKey = true) => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
  ...(includeApiKey && { "API-Key": process.env.BACKEND_API_KEY! }),
});

const handleResponse = <T>(data: T, status: number): ServerApiResponse<T> => ({
  data,
  status,
  ok: status >= 200 && status < 300,
});

const handleError = (error: unknown, label: string): ServerApiResponse<never> => {
  console.error(`[Api:${label}] error`, error);
  if (axios.isAxiosError(error) && error.response) {
    return {
      status: error.response.status,
      ok: false,
      error: error.response.data?.error ?? error.response.data?.detail ?? "Something went wrong",
    };
  }
  return { status: 500, ok: false, error: "Something went wrong" };
};

// Extrae el error del body según los formatos que usa vuestro backend
export const extractError = (data: unknown, fallback: string): string => {
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    return (d.error ?? d.detail ?? d.message ?? fallback) as string;
  }
  return fallback;
};

// ─── Unauthorized helper ──────────────────────────────────────────────────────

export const unauthorizedResponse = () =>
  NextResponse.json({ error: "User unauthorized to make this request" }, { status: 401 });

// ─── Methods ─────────────────────────────────────────────────────────────────

export const serverGet = async <T>(
  path: string,
  access: string,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.get<T>(path, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverGet");
  }
};

export const serverGetPublic = async <T>(
  path: string,
  includeApiKey = true
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.get<T>(path, {
      headers: buildPublicHeaders(includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverGetPublic");
  }
};

export const serverPost = async <T>(
  path: string,
  access: string,
  body: unknown,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.post<T>(path, body, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverPost");
  }
};

export const serverPut = async <T>(
  path: string,
  access: string,
  body: unknown,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.put<T>(path, body, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverPut");
  }
};

export const serverPatch = async <T>(
  path: string,
  access: string,
  body: unknown,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.patch<T>(path, body, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverPatch");
  }
};

export const serverDel = async <T>(
  path: string,
  access: string,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.delete<T>(path, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverDel");
  }
};

export const serverGetPagination = async <T>(
  path: string,
  access: string,
  includeApiKey = false
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.get<T>(path, {
      headers: buildHeaders(access, includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverGetPagination");
  }
};

export const serverGetPaginationPublic = async <T>(
  path: string,
  includeApiKey = true
): Promise<ServerApiResponse<T>> => {
  try {
    const { data, status } = await serverApi.get<T>(path, {
      headers: buildPublicHeaders(includeApiKey),
    });
    return handleResponse(data, status);
  } catch (error) {
    return handleError(error, "serverGetPaginationPublic");
  }
};