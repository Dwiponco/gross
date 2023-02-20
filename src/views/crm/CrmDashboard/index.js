import React, { useEffect, useState } from "react";
import { Loading } from "components/shared";
// import Statistic from "./components/Statistic";
// import { get404Api } from "services/CrmService";

// const statisticData = [
//   {
//     key: "proposals",
//     label: "Program",
//     value: 49,
//     growShrink: -0.7,
//   },
//   {
//     key: "newLeads",
//     label: "New Leads",
//     value: 63,
//     growShrink: 2.6,
//   },
//   {
//     key: "emailResponse",
//     label: "Email",
//     value: 25,
//     growShrink: 5.5,
//   },
//   {
//     key: "appointment",
//     label: "Appointment",
//     value: 12,
//     growShrink: 2.6,
//   },
// ];
const CrmDashboard = () => {
  const [loading, setLoading] = useState(true);

  // const get404 = async () => {
  //   const res = await get404Api();
  //   console.log("res : ", res);
  // };
  useEffect(() => {
    // get404();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <Loading loading={loading}>
        <h2>Dashboard</h2>
        {/* <Statistic data={statisticData} /> */}
      </Loading>
    </div>
  );
};

export default CrmDashboard;
