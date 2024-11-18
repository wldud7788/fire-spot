import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = ({
  threshold = 0.5,
  root = null,
  rootMargin = "0px"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkInitialVisibility = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const isIntersecting =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);
        setIsVisible(isIntersecting);
      }
    };

    // 페이지가 처음 로드될 때 바로 가시성 체크
    checkInitialVisibility();

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [threshold, root, rootMargin]);

  return { isVisible, targetRef };
};

export default useIntersectionObserver;
