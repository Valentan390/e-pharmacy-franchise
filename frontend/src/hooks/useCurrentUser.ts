import {
  selectAuthError,
  selectAuthLoading,
  selectIsLogin,
  selectToken,
  selectUser,
} from "../redux/authUser/authUserSelectors";
import { useAppSelector } from "./useReduxHooks";

const useCurrentUser = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const error = useAppSelector(selectAuthError);
  const isLogin = useAppSelector(selectIsLogin);
  const isLoading = useAppSelector(selectAuthLoading);

  return { user, token, error, isLoading, isLogin };
};

export default useCurrentUser;
