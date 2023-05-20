import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { HttpMethod } from 'src/enums/http-method';
import { Path } from 'src/enums/path';
import { setIsAuthenticated, setUser } from 'src/store/slices/authSlice';
import { getAccessToken } from 'src/utils/localStorage';
import { request } from 'src/utils/request';

export const AuthGuard = () => {
  const accessToken = getAccessToken();
  /*
    const { isAuthenticated, setIsAuthenticated, setUser } =
      useContext(AuthContext);
    */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      void (async () => {
        try {
          const { data } = await request({
            method: HttpMethod.GET,
            url: '/me',
          });
          /*
            setIsAuthenticated(true);
            setUser(data?.data);
          */
          dispatch(setIsAuthenticated(true));
          dispatch(setUser(data?.data));
        } catch (error) {
          navigate(Path.LOGIN);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  if (isAuthenticated) {
    if (location.pathname === '/') {
      return <Navigate to={Path.HOME} />;
    }
    return <Outlet />;
  }

  if (!accessToken) {
    return <Navigate to={Path.LOGIN} />;
  }
};
