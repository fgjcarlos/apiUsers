import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useIsMounted() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) setLoaded(true);
  }, [router.isReady]);

  return [loaded];
}