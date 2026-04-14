import axios, { AxiosError, AxiosRequestConfig } from "axios";

// ─── Custom Error ────────────────────────────────────────────────────────────

export class CustomError extends Error {
  errorCode: number;
  data?: { [key: string]: string[] };

  constructor(errorCode: number, message: string, data?: { [key: string]: string[] }) {
    super(message);
    this.errorCode = errorCode;
    this.data = data;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApiResponse<T> {
  data?: T;
  error?: CustomError;
  message?: string;
}

/* interface ApiResponsePagination<T, P> {
  data?: T;
  error?: CustomError;
  message?: string;
  pagination?: P;
} */

// ─── Axios instance ──────────────────────────────────────────────────────────
// baseURL vacío: todas las llamadas van a /api/... de vuestras propias Route Handlers

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 60000,
});

// ─── Methods ─────────────────────────────────────────────────────────────────

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.get<ApiResponse<T>>(url, config);
    if (data.data) return data.data;
    if (data.error) throw handleCustomErrors(data.error);
    return data as T;
  } catch (error) {
    console.error("[Api:get] error", error);
    throw error;
  }
};

export const getPagination = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const { data } = await api.get<T>(url, config);
    return data;
  } catch (error) {
    console.error("[Api:getPagination] error", error);
    throw error;
  }
};

export const post = async <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.post<ApiResponse<T>>(url, body, config);
    if (data.data) return data.data;
    if (data.error) throw handleCustomErrors(data.error);
    return data as T;
  } catch (error) {
    console.error("[Api:post] error", error);
    throw error;
  }
};

export const put = async <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.put<ApiResponse<T>>(url, body, config);
    if (data.data) return data.data;
    if (data.error) throw handleCustomErrors(data.error);
    return data as T;
  } catch (error) {
    console.error("[Api:put] error", error);
    throw error;
  }
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.delete<ApiResponse<T>>(url, config);
    if (data.data) return data.data;
    if (data.error) throw handleCustomErrors(data.error);
    return data as T;
  } catch (error) {
    console.error("[Api:del] error", error);
    throw error;
  }
};

export const patch = async <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.patch<ApiResponse<T>>(url, body, config);
    if (data.data) return data.data;
    if (data.error) throw handleCustomErrors(data.error);
    return data as T;
  } catch (error) {
    console.error("[Api:patch] error", error);
    throw error;
  }
};

// ─── Custom error handler (errores de negocio del backend) ───────────────────

const handleCustomErrors = (error: CustomError): never => {
  console.error("[Api:handleCustomErrors] error", error);
  switch (error.errorCode) {
    case 1:      // Validation error
    case 1308:
    case 1309:   // Daily interaction limit reached
    case 1310:   // No more SuperBook balance
      throw new CustomError(error.errorCode, error.message, error.data);
    default:
      throw new Error(error.message || "Unknown error");
  }
};

// ─── Request interceptor ─────────────────────────────────────────────────────

api.interceptors.request.use(
  (config) => {
    // Sin token aquí: la cookie se envía automáticamente por el browser
    // console.log("[Api:request]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error("[Api:request] error", error.code, error.message);
    return Promise.reject(error);
  }
);

// ─── Response interceptor (errores HTTP) ─────────────────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("[Api:response] error", error.response?.status, error.response?.data);

    switch (error.response?.status) {
      case 401:
        // Sesión expirada → redirigir a login
        window.location.href = "/login";
        break;
      case 402:
        // Requiere pago / suscripción
        // emitEvent(Events.SHOW_SUBSCRIPTION_MODAL)
        break;
      case 403:
        // Forbidden → sin permisos
        window.location.href = "/403";
        break;
      case 426:
        // Upgrade required
        // emitEvent(Events.SHOW_UPGRADE_MODAL)
        break;
      case 429:
        // Rate limit → podrías mostrar un toast
        console.warn("[Api] Rate limit reached");
        break;
      case 503:
        // Mantenimiento
        window.location.href = "/maintenance";
        break;
    }

    return Promise.reject(error);
  }
);

export default api;