import React, { useState, useEffect } from "react";
import ListPageLayout from "../common_components/ListPageLayout";
import ListFilterBar from "../common_components/ListFilterBar";
import UserGridView from "./UserGridView";
import UserTableView from "./UserTableView";
import UserFormModal from "./form/UserFormModal";
import UserDetailModal from "./UserDetailModal";
import {
  fetchAdminUsersPaged,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../../api/UserApi";
import { showPopupConfirm } from "../common_components/PopupConfirm";

const UserListSection = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editingUser, setEditingUser] = useState(null);

  const [viewMode, setViewMode] = useState("table");

  const [selectedRole, setSelectedRole] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchField, setSearchField] = useState("username");
  const [searchQuery, setSearchQuery] = useState("");

  const [viewingUser, setViewingUser] = useState(null);

  const searchOptions = [
    { label: "Tên", value: "username" },
    { label: "Email", value: "email" },
    { label: "Vai trò", value: "role" },
    { label: "Trạng thái", value: "status" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  
  // Logic phân trang Client-side
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; // Đảm bảo ít nhất là 1 trang
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    loadUsers();
  }, []); // Chỉ chạy 1 lần khi mount

  const loadUsers = async () => {
    try {
      // [FIX] Thay vì lấy theo trang (currentPage), ta lấy số lượng lớn (ví dụ 10000)
      // để có toàn bộ dữ liệu cho việc Lọc/Tìm kiếm ở Client.
      const data = await fetchAdminUsersPaged(0, 10000); 
      
      if (data?.content) {
        const normalized = data.content.map((u) => ({
          id: u.id ?? 0,
          username: u.username ?? "Chưa có tên",
          email: u.email ?? "—",
          role: u.role ?? "USER",
          status: u.status ?? "Inactive",
          createdDate: u.createdAt ?? "—",
          avatar:
            (u.username
              ? u.username.slice(0, 1)
              : u.email?.slice(0, 2) ?? "?"
            ).toUpperCase(),
          color: "bg-orange-500",
        }));
        
        // Lưu toàn bộ user vào state
        setUsers(normalized);
        setFilteredUsers(normalized); // Khởi tạo danh sách lọc bằng toàn bộ user
      }
    } catch (err) {
      console.error("❌ Lỗi tải người dùng:", err);
    }
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
  };

  // useEffect này sẽ chạy mỗi khi filters thay đổi để lọc lại danh sách từ `users` gốc
  useEffect(() => {
    handleFilter();
  }, [users, selectedRole, selectedStatus, searchQuery, searchField]);

  const handleFilter = () => {
    let result = [...users];

    if (selectedRole !== "ALL") {
      result = result.filter((u) => u.role === selectedRole);
    }
    if (selectedStatus !== "ALL") {
      result = result.filter((u) => u.status === selectedStatus);
    }
    if (searchQuery.trim() !== "") {
      result = result.filter((u) => {
        const val = u[searchField] ?? "";
        return val.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredUsers(result);
    setCurrentPage(1); // Reset về trang 1 khi filter thay đổi
  };

  const getPageUsers = () => {
    // Logic cắt trang Client-side này giờ sẽ hoạt động đúng
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  };

  const handleAddUser = () => {
    setFormMode("create");
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setFormMode("edit");
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmitUser = async (formData) => {
    try {
      if (formMode === "edit" && editingUser) {
        await updateAdminUser(editingUser.id, formData);
        alert("✅ Cập nhật người dùng thành công!");
      } else {
        await createAdminUser(formData);
        alert("✅ Tạo người dùng thành công!");
      }
      await loadUsers(); // Tải lại danh sách sau khi lưu
      setShowForm(false);
    } catch (err) {
      console.error("❌ Lỗi lưu người dùng:", err);
      alert("Không thể lưu người dùng!");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showPopupConfirm(
      "Xác nhận xoá người dùng",
      "Bạn có chắc muốn xoá người dùng này?"
    );
    if (!confirmed) return;
    try {
      await deleteAdminUser(id);
      // Cập nhật trực tiếp vào state để không phải gọi lại API (Tối ưu UI)
      const newUsers = users.filter((u) => u.id !== id);
      setUsers(newUsers);
      // Trigger lại filter
      let result = [...newUsers];
      if (selectedRole !== "ALL") result = result.filter((u) => u.role === selectedRole);
      if (selectedStatus !== "ALL") result = result.filter((u) => u.status === selectedStatus);
      // ... (logic filter đơn giản hoặc gọi handleFilter nếu tách useEffect khéo léo)
      // Cách đơn giản nhất là gọi lại loadUsers() hoặc để useEffect tự chạy nếu dependencies đúng
      // Ở đây ta gọi loadUsers() cho an toàn dữ liệu
      loadUsers();
    } catch (err) {
      console.error("❌ Lỗi xoá user:", err);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Tên", "Email", "Vai trò", "Trạng thái", "Ngày tạo"].join(","),
      ...filteredUsers.map((u) =>
        [u.username, u.email, u.role, u.status, u.createdDate].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nguoi_dung.csv";
    a.click();
  };

  const handleRefresh = () => {
    setSearchQuery("");
    loadUsers();
    setCurrentPage(1);
  };

  return (
    <ListPageLayout
      title="Người dùng"
      addLabel="Thêm người dùng"
      viewMode={viewMode}
      setViewMode={setViewMode}
      onAdd={handleAddUser}
      onExport={exportToCSV}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchField={searchField}
      onSearchFieldChange={setSearchField}
      searchOptions={searchOptions}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      startItem={startItem}
      endItem={endItem}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={(num) => {
        setItemsPerPage(num);
        setCurrentPage(1);
      }}
      onRefresh={handleRefresh}
    >
      <ListFilterBar
        filters={[
          {
            label: "Vai trò",
            value: selectedRole,
            onChange: setSelectedRole,
            options: [
              { label: "Tất cả", value: "ALL" },
              { label: "ADMIN", value: "ADMIN" },
              { label: "EMPLOYEE", value: "EMPLOYEE" },
              { label: "USER", value: "USER" },
            ],
          },
          {
            label: "Trạng thái",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: [
              { label: "Tất cả", value: "ALL" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
        ]}
      />

      <div className="relative">
        {viewMode === "table" ? (
          <UserTableView
            users={getPageUsers()} // Lấy danh sách đã cắt trang
            onDelete={handleDelete}
            onEdit={handleEditUser}
            onView={handleViewUser}
          />
        ) : (
          <UserGridView
            users={getPageUsers()}
            onDelete={handleDelete}
            onEdit={handleEditUser}
            onView={handleViewUser}
          />
        )}

        {(showForm || viewingUser) && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] cursor-not-allowed z-40" />
        )}
      </div>

      <UserFormModal
        isOpen={showForm}
        mode={formMode}
        initialData={editingUser}
        onClose={() => setShowForm(false)}
        onSuccess={loadUsers}
        onSubmit={handleSubmitUser}
      />
      <UserDetailModal 
        user={viewingUser} 
        onClose={() => setViewingUser(null)} 
      />
    </ListPageLayout>
  );
};

export default UserListSection;