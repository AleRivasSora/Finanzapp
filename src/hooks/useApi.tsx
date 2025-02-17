"use client";
import { useState, useCallback } from "react";
import { useModal } from "@contexts/modal-context";
import { useRouter } from "next/navigation";

interface UseApiProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
}

interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (body?: any) => void;
}

export function useApi<T>({
  url,
  method,
  body = null,
  headers = {},
}: UseApiProps): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showModal } = useModal();
  const router = useRouter();

  const fetchData = useCallback(
    async (requestBody?: any) => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token") ?? null;
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: requestBody
            ? JSON.stringify(requestBody)
            : body
            ? JSON.stringify(body)
            : null,
        });

        const result = await response.json();
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setLoading(false);
            localStorage.removeItem("token");
            router.push("/login");
            showModal(
              "Error",
              "Session expired. Please log in again.",
              "error"
            );
          } else {
            setLoading(false);
            showModal("Error", result.detail ?? "An error occurred", "error");
          }
          return;
        }

        const newToken =
          response.headers.get("Authorization") || result.access_token;
        if (newToken) {
          localStorage.setItem("token", newToken.replace("Bearer ", ""));
        }

        setData(result);
        const message = result.message ? result.message : "Request successful";
        showModal("Success", message, "success");
      } catch (err: any) {
        console.log(err);
        const message = err.detail
          ? err.detail
          : err.message
          ? err.message
          : "An error occurred";
        setError(message);
        showModal("Error", message, "error");
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, headers, loading, showModal, router]
  );

  return { data, error, loading, fetchData };
}
