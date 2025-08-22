"use client";
import { logData, agentData, agentProject } from "@/atom/states";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: "/" });
import { verifyAgentAuth } from "@/utils/verifyauth";
import { getAllProj } from "@/routes/agentProj";
//import { getAllLog } from "@/routes/agentLog";
const AgentLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useRecoilState(agentData);
  const [proj, setProj] = useRecoilState(agentProject);
  const [logs, setLogs] = useRecoilState(logData);
  const router = useRouter();

  // session verify
  // useEffect(() => {
  //   const token = cookies.get("auth");
  //   if (!token) router.push("/surveying/login");
  //   const data = verifySurveyingAuth({ setCurrentUser, token });
  //   if (!data || data === "error") router.push("/surveying/login");
  // }, []);

  useEffect(() => {
  const token = cookies.get("auth");
  if (!token) return router.push("/agent/login");

  const verify = async () => {
    const data = await verifyAgentAuth({ setCurrentUser, token });
    if (!data || data === "error") router.push("/agent/login");
  };

  verify();
}, []);


  useEffect(() => {
    if (!currentUser) return;
    if (currentUser?.isSuspended===true) {
      router.push("/user/dashboard");
    }
  }, [currentUser]);

  return <>{children}</>;
};

export default AgentLayout;
