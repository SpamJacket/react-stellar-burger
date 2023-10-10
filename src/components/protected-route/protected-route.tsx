import { useSelector } from "../../services/hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";

import Preloader from "../../pages/preloader/preloader";
import { FC } from "react";

const Protected: FC<{
  onlyUnAuth?: boolean;
  component: JSX.Element;
}> = ({ onlyUnAuth, component }) => {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<{ component: JSX.Element }> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.defaultProps = {
  onlyUnAuth: false,
};