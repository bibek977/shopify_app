import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

export const useAppMutation = ({
  url,
  method = "POST",
  reactQueryOptions,
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fetch = useMemo(() => {
    return async (body) => {
    //   console.log('TEST HERE BODY TEST', body);
      const response = await authenticatedFetch(url, {
        method: method,
        ...headers,
        body: JSON.stringify(body),
      });
      return response.json();
    };
  }, [url]);

  // onSuccess: () => {
  //   queryClient.invalidateQueries(invalidateTag);
  // },
  return useMutation(fetch, {
    refetchOnWindowFocus: false,
    ...reactQueryOptions,
  });
};