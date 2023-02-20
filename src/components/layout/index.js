import React, { memo, useMemo, lazy, Suspense } from "react";
import { Loading, ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  LAYOUT_TYPE_CLASSIC,
  LAYOUT_TYPE_MODERN,
  LAYOUT_TYPE_SIMPLE,
  LAYOUT_TYPE_STACKED_SIDE,
  LAYOUT_TYPE_DECKED,
  LAYOUT_TYPE_BLANK,
} from "constants/theme.constant";
import useAuth from "utils/hooks/useAuth";
import useDirection from "utils/hooks/useDirection";
import useLocale from "utils/hooks/useLocale";
import { onSignOutSuccess, tokenExpired } from "store/auth/sessionSlice";

const layouts = {
  [LAYOUT_TYPE_CLASSIC]: lazy(() => import("./ClassicLayout")),
  [LAYOUT_TYPE_MODERN]: lazy(() => import("./ModernLayout")),
  [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import("./StackedSideLayout")),
  [LAYOUT_TYPE_SIMPLE]: lazy(() => import("./SimpleLayout")),
  [LAYOUT_TYPE_DECKED]: lazy(() => import("./DeckedLayout")),
  [LAYOUT_TYPE_BLANK]: lazy(() => import("./BlankLayout")),
};

const Layout = () => {
  const layoutType = useSelector((state) => state.theme.layout.type);
  const { modalExpired } = useSelector((state) => state.auth.session);

  const { authenticated } = useAuth();
  const dispatch = useDispatch();

  const handleClose = async () => {
    await dispatch(tokenExpired(false));
    dispatch(onSignOutSuccess());
  };

  const handleConfirm = async () => {
    await dispatch(tokenExpired(false));
    dispatch(onSignOutSuccess());
  };

  useDirection();

  useLocale();

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import("./AuthLayout"));
  }, [layoutType, authenticated]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
      <ConfirmDialog
        isOpen={modalExpired}
        onClose={handleClose}
        onRequestClose={handleClose}
        type="danger"
        title={"Login Expired"}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      >
        <p>Please login</p>
      </ConfirmDialog>
    </Suspense>
  );
};

export default memo(Layout);
