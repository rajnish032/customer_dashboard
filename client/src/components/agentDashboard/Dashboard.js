// "use client";
// import React, { useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import WeatherCard from './WeatherCard';
// import { verifyAgentAuth } from '@/utils/verifyauth';
// import {useRouter} from 'next/navigation';

// import Cookies from "universal-cookie";
// import { useRecoilState } from 'recoil';
// import { FiMapPin } from "react-icons/fi";
// import { logData, agentData, agentProject } from '@/atom/states';
// //import { getAllLog } from '@/routes/agentLog';
// import { getAllProj } from '@/routes/agentProj';
// const cookies = new Cookies(null, { path: '/' });

// const MapView = dynamic(
//   () => import('@/components/agentDashboard/MapView'),
//   {
//     loading: () => <div className="w-full min-h-80 h-80 p-6 pt-4 bg-white rounded-lg shadow-md animate-pulse">
//       <div className="h-full bg-gray-300 rounded  mb-4"></div>
//     </div>,
//     ssr: false
//   }
// );

// const Dashboard = () => {
//   const [currentUser,setCurrentUser] =useRecoilState(agentData)
//   const [allLogs,setAllLog] =useRecoilState(logData)
//   const [allProj,setAllProj] =useRecoilState(agentProject)
//   const router = useRouter();

//   useEffect(() => {
//     const token = cookies.get('auth');
    
//     if (!token) {
//       router.push('/agent/login');
//       return;
//     }
  
//     verifyAgentAuth({ setCurrentUser, token }).then((data) => {
      
//       if (!data) {
//         router.push('/agent/login');
//       }
//     });
//   }, [router, setCurrentUser]);

//   // useEffect(()=>{
//   //   getAllLog(setAllLog)
//   // },[currentUser])
  
//   useEffect(()=>{
//     getAllProj(setAllProj)
//   },[currentUser])
  
//   return (
//     <div>
      

//        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-2">
        
//         {/* WeatherCard should take full width on small screens and one-third width on larger screens */}
//         <div className="lg:col-span-1 w-full">
//           <WeatherCard />
//         </div>

        
//       </div>

//       <div className="grid lg:grid-cols-3 gap-5 p-2">

//         <div className="lg:col-span-1 p-2">
//         <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-900 bg-gradient-to-r from-green-300 to-blue-600">
//                <FiMapPin /> Location
//             </h2>
//           <MapView className="h-full" />
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import WeatherCard from './WeatherCard';
import { verifyAgentAuth } from '@/utils/verifyauth';
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie";
import { useRecoilState } from 'recoil';
import { FiMapPin } from "react-icons/fi";
import { logData, agentData, agentProject } from '@/atom/states';
import { getAllProj } from '@/routes/agentProj';

const cookies = new Cookies(null, { path: '/' });

const MapView = dynamic(
  () => import('@/components/agentDashboard/MapView'),
  {
    loading: () => (
      <div className="w-full min-h-80 h-80 p-6 pt-4 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-full bg-gray-300 rounded mb-4"></div>
      </div>
    ),
    ssr: false
  }
);

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useRecoilState(agentData);
  const [allLogs, setAllLog] = useRecoilState(logData);
  const [allProj, setAllProj] = useRecoilState(agentProject);
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get('auth');
    if (!token) {
      router.push('/agent/login');
      return;
    }
    verifyAgentAuth({ setCurrentUser, token }).then((data) => {
      if (!data) {
        router.push('/agent/login');
      }
    });
  }, [router, setCurrentUser]);

  useEffect(() => {
    getAllProj(setAllProj);
  }, [currentUser]);

  return (
    <div className="p-2">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        {/* Total Projects */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">
            TOTAL PROJECTS
          </h3>
          <p className="text-2xl font-bold mt-1">{allProj?.length || 0}</p>
          <span className="text-green-500 text-sm font-medium">↑ 0%</span>
          <span className="text-gray-400 text-xs ml-1">vs last month</span>
        </div>

        {/* Approved Projects */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">
            ONGOING PROJECTS
          </h3>
          <p className="text-2xl font-bold mt-1">
            {allProj?.filter((p) => p.status === "approved")?.length || 0}
          </p>
          <span className="text-green-500 text-sm font-medium">↑ 0%</span>
          <span className="text-gray-400 text-xs ml-1">vs last month</span>
        </div>

        {/* Pending Projects */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">
            PENDING PROJECTS
          </h3>
          <p className="text-2xl font-bold mt-1">
            {allProj?.filter((p) => p.status === "pending")?.length || 0}
          </p>
          <span className="text-red-500 text-sm font-medium">↓ 0%</span>
          <span className="text-gray-400 text-xs ml-1">vs last month</span>
        </div>
      </div>

      {/* Weather and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* WeatherCard */}
        <div className="lg:col-span-1 w-full">
          <WeatherCard />
        </div>

        {/* Map */}
        <div className="lg:col-span-1 p-2">
          <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-900 bg-gradient-to-r from-green-300 to-blue-600">
            <FiMapPin /> Location
          </h2>
          <MapView className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
