"use client";
import { useState, useCallback } from "react";
import { useModal } from "@contexts/modal-context";
import { useRouter } from "next/navigation";

interface UseApiProps<T> {
}

interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (
      url: string, 
      method: "GET" | "POST" | "PUT" | "DELETE" ,
      body?: any,
      onSuccess?: (data: T) => void,
      onError?: (error: string) => void,
      onFinally?: () => void,
  ) => Promise<void>;
}

export function useApi<T>({
}: UseApiProps<T>): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showModal } = useModal();
  const router = useRouter();

  const fetchData = useCallback(
      async (
          url: string, 
          method = "GET",
          requestBody?: any,
          onSuccess?: (data: T) => void,
          onError?: (error: string) => void,
          onFinally?: () => void
      ) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token") ?? null;
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
          },
          body: requestBody ? JSON.stringify(requestBody) : null, 
        });

        if (!response.ok) {  
          const errorText = await response.json(); 
          const errorMessage = errorText.detail || "An error occurred";
          setError(errorMessage);
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            router.push("/");
            showModal("Error", "Session expired. Please log in again.", "error");
        } 
      }
        
        response.json()
        .then((data) => {

          const result =  data
          const newToken = response.headers.get("Authorization") || result.access_token;
          if (newToken) {
            localStorage.setItem("token", newToken.replace("Bearer ", ""));
          }
  
          setData(result);
          if (onSuccess) onSuccess(result);

        })
      } catch (err: any) {
        console.error("Error en useApi:", err);
        let errorMessage = err?.response?.data?.detail ?? err?.message ?? err.detail ?? "An error occurred";
        console.log(err.detail)
        setError(errorMessage);
        if (onError) onError(errorMessage);
      } finally {
        setLoading(false);
        if (onFinally) onFinally();
      }
    },
    [   showModal, router] 
  );

  return { data, error, loading, fetchData };
}