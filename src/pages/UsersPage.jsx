import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserIcon, UserPlus, UserX } from "lucide-react";

import Header from "../components/common_components/Header";
import StatCards from "../components/common_components/StatCards";

import UserListSection from "../components/users/UserListSection";
import { fetchAdminUsersPaged } from "../api/UserApi";

const Users_Stat = {
  totalUsers: 874504,
  newUsersToday: 243,
  activeUsers: 23091,
  churnRate: "2.3%",
};

const UsersPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [newUsersToday, setNewUsersToday] = useState(0);

  useEffect(() => {
    fetchAdminUsersPaged(0, 1000).then(res => {
      const users = res.content;

      setTotalUsers(res.totalElements ?? users.length);

      setActiveUsers(users.filter(u => u.status === "ACTIVE").length);

      setInactiveUsers(users.filter(u => u.status === "INACTIVE").length);

      const today = new Date().toISOString().split("T")[0];
      const todayNew = users.filter(u => u.createdAt?.startsWith(today)).length;
      setNewUsersToday(todayNew);
    });
  }, []);


  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-50 text-gray-900">
      <Header
        path={[
          { label: "Mobilehub", to: "/" },
          { label: "Người dùng", to: "/users" },
        ]}
      />

      <main className="mx-auto py-6 px-4 lg:px-4">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .75 }}
        >
          <StatCards
            name="Tổng số người dùng"
            icon={UserIcon}
            value={totalUsers.toLocaleString()}
            color="#6366f1"
          />

          <StatCards
            name="Người dùng mới hôm nay"
            icon={UserPlus}
            value={newUsersToday}
            color="#10b981"
          />

          <StatCards
            name="Người dùng mới hôm nay"
            icon={UserPlus}
            value={newUsersToday}
            color="#10b981"
          />
          <StatCards
            name="Người dùng bị vô hiệu hóa"
            icon={UserX}
            value={inactiveUsers.toLocaleString()}
            color="#ef4444"
          />

        </motion.div>

        {/* BẢNG DỮ LIỆU NGƯỜI DÙNG */}
        <UserListSection />


      </main>
    </div>
  );
};

export default UsersPage;
