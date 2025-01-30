import { useCallback } from "react";
import { selectIsMobileMenu } from "../redux/mobileMenu/mobileMenuSelectors";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { setMobileMenu } from "../redux/mobileMenu/mobileMenuSlice";

export const useMobileMenu = () => {
  const isMobileMenu = useAppSelector(selectIsMobileMenu);
  const dispatch = useAppDispatch();

  const openMobileMenu = useCallback(() => {
    dispatch(setMobileMenu(true));
  }, [dispatch]);

  const closeMobileMenu = useCallback(() => {
    dispatch(setMobileMenu(false));
  }, [dispatch]);

  const toggleMobileMenu = useCallback(() => {
    dispatch(setMobileMenu());
  }, [dispatch]);

  return { isMobileMenu, openMobileMenu, closeMobileMenu, toggleMobileMenu };
};
