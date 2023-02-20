import { APP_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";

const appsNavigationConfig = [
  {
    key: "apps",
    path: "",
    title: "APPS",
    translateKey: "nav.apps",
    icon: "apps",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "apps.dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: "Dashboard",
        translateKey: "nav.apps.dashboard",
        icon: "apps",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "apps.create-prorgram",
        path: `${APP_PREFIX_PATH}/create-prorgram`,
        title: "Create Program",
        translateKey: "nav.apps.create-prorgram",
        icon: "HiOutlineDocumentAdd",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "apps.add-product",
        path: `${APP_PREFIX_PATH}/add-product`,
        title: "Create Program",
        translateKey: "nav.apps.add-product",
        icon: "HiOutlineDocumentAdd",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      // {
      //   key: "apps.report",
      //   path: `${APP_PREFIX_PATH}/report`,
      //   title: "Report",
      //   translateKey: "nav.apps.report",
      //   icon: "documentation",
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [ADMIN, USER],
      //   subMenu: [],
      // },
    ],
  },
];

export default appsNavigationConfig;
