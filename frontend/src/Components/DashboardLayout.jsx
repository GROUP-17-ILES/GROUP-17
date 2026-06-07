import { useState } from "react";
import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ title, children }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800">
       {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 z-40 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition lg:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>   
      <Sidebar />
    </div>    
      <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
        <div className="dashboard-card mb-8 flex flex-col gap-6 border-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 p-8 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">
  
          <div className="flex items-center gap-4">
      
             <button
               onClick={() => setSidebarOpen(true)}
               className="flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition gap-[5px] flex-shrink-0 lg:hidden"
               aria-label="Open sidebar"
             >
               <span className="block w-5 h-0.5 bg-white rounded-full" />
               <span className="block w-5 h-0.5 bg-white rounded-full" />
               <span className="block w-5 h-0.5 bg-white rounded-full" />
             </button>
            
           <div>
             <p className="text-sm uppercase tracking-[0.35rem] text-indigo-100">
               INTERNSHIP LOGGING AND EVALUATION SYSTEM
             </p>
             <h1 className="mt-3 text-4xl font-black tracking-tight">
               {title}
             </h1>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white/15 px-5 py-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-indigo-100">Logged in as</p>
              <p className="mt-1 text-lg font-semibold capitalize text-white">
                {user?.name || user?.username}
              </p>
            </div>
            <NotificationBell />
          </div>
        </div>

        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
