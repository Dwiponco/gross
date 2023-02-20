import React from "react";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { ADMIN, USER } from "constants/roles.constant";

const appsRoute = [
  {
    key: "apps.dashboard",
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: React.lazy(() => import("views/crm/CrmDashboard")),
    authority: [ADMIN, USER],
  },
  {
    key: "apps.create-prorgram",
    path: `${APP_PREFIX_PATH}/create-prorgram`,
    component: React.lazy(() => import("views/createProgram")),
    authority: [ADMIN, USER],
    meta: {
      header: "Create Program Diskon",
    },
  },
  {
    key: "apps.add-product",
    path: `${APP_PREFIX_PATH}/add-product`,
    component: React.lazy(() => import("views/addProduct")),
    authority: [ADMIN, USER],
    meta: {
      header: "Add Product",
    },
  },
  {
    key: "apps.report",
    path: `${APP_PREFIX_PATH}/report`,
    component: React.lazy(() => import("views/report")),
    authority: [ADMIN, USER],
    meta: {
      header: "Report Program",
    },
  },
];

export default appsRoute;
