import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    console.log(router)
    if (!data && !fetching) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [data, fetching, router]);
};
