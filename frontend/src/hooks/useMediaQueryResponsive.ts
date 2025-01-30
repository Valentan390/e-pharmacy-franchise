import { useMediaQuery } from "react-responsive";

export const useMediaQueryResponsive = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  return { isDesktop, isMobile, isTablet };
};
