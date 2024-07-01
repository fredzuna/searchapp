import { useCallback, useEffect, useRef } from "react";

const useInfiniteScroll = (
  loading: boolean,
  hasMore: boolean,
  loadMore: () => void
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return containerRef;
};

export default useInfiniteScroll;
