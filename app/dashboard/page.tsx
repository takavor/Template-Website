import React from "react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log("=========================================");
  console.log("DASHBOARD SESSION:", session);

  return <div>Dashboard</div>;
};

export default page;
