import React from "react";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { ADMIN, USER } from "constants/roles.constant";

const userRoute = [
  {
    key: "appsCrm.settings",
    path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [ADMIN, USER],
    meta: {
      header: "Settings",
      headerContainer: true,
    },
  },
  {
    key: "appsCrm.activity",
    path: `${APP_PREFIX_PATH}/account/activity-log`,
    component: React.lazy(() => import("views/account/ActivityLog")),
    authority: [ADMIN],
  },
];

export default userRoute;
