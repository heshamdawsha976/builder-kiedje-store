"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ManagerRole =
  | "super_manager"
  | "store_manager"
  | "operations_manager"
  | "marketing_manager"
  | "finance_manager"
  | "content_manager";

export type Permission =
  | "read_dashboard"
  | "manage_products"
  | "manage_orders"
  | "manage_customers"
  | "manage_staff"
  | "view_analytics"
  | "manage_finances"
  | "manage_marketing"
  | "manage_content"
  | "system_settings"
  | "user_management"
  | "export_data"
  | "manage_inventory";

export interface ManagerUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: ManagerRole;
  department: string;
  avatar?: string;
  permissions: Permission[];
  lastLogin?: Date;
  isActive: boolean;
  phone: string;
  joinDate: Date;
}

const rolePermissions: Record<ManagerRole, Permission[]> = {
  super_manager: [
    "read_dashboard",
    "manage_products",
    "manage_orders",
    "manage_customers",
    "manage_staff",
    "view_analytics",
    "manage_finances",
    "manage_marketing",
    "manage_content",
    "system_settings",
    "user_management",
    "export_data",
    "manage_inventory",
  ],
  store_manager: [
    "read_dashboard",
    "manage_products",
    "manage_orders",
    "manage_customers",
    "view_analytics",
    "manage_inventory",
    "export_data",
  ],
  operations_manager: [
    "read_dashboard",
    "manage_orders",
    "manage_customers",
    "view_analytics",
    "manage_inventory",
    "export_data",
  ],
  marketing_manager: [
    "read_dashboard",
    "view_analytics",
    "manage_marketing",
    "manage_content",
    "manage_customers",
    "export_data",
  ],
  finance_manager: [
    "read_dashboard",
    "view_analytics",
    "manage_finances",
    "export_data",
  ],
  content_manager: [
    "read_dashboard",
    "manage_content",
    "manage_products",
    "view_analytics",
  ],
};

const mockManagers: (Omit<ManagerUser, "permissions"> & {
  password: string;
})[] = [
  {
    id: "1",
    username: "super_manager",
    password: "super123",
    email: "manager@kledje.com",
    fullName: "أحمد محمد العليا",
    role: "super_manager",
    department: "الإدارة العليا",
    avatar: "",
    lastLogin: new Date(),
    isActive: true,
    phone: "+20 100 111 2222",
    joinDate: new Date("2023-01-15"),
  },
  {
    id: "2",
    username: "store_manager",
    password: "store123",
    email: "store@kledje.com",
    fullName: "فاطمة أحمد الزهراء",
    role: "store_manager",
    department: "إدارة المتجر",
    lastLogin: new Date(),
    isActive: true,
    phone: "+20 101 222 3333",
    joinDate: new Date("2023-03-20"),
  },
  {
    id: "3",
    username: "marketing_manager",
    password: "marketing123",
    email: "marketing@kledje.com",
    fullName: "محمد سامي النور",
    role: "marketing_manager",
    department: "التسويق والمحتوى",
    lastLogin: new Date(),
    isActive: true,
    phone: "+20 102 333 4444",
    joinDate: new Date("2023-05-10"),
  },
  {
    id: "4",
    username: "operations_manager",
    password: "ops123",
    email: "operations@kledje.com",
    fullName: "نورا سعد الشامي",
    role: "operations_manager",
    department: "العمليات والشحن",
    lastLogin: new Date(),
    isActive: true,
    phone: "+20 103 444 5555",
    joinDate: new Date("2023-07-01"),
  },
  {
    id: "5",
    username: "finance_manager",
    password: "finance123",
    email: "finance@kledje.com",
    fullName: "عمر خالد الحديدي",
    role: "finance_manager",
    department: "المالية والمحاسبة",
    lastLogin: new Date(),
    isActive: true,
    phone: "+20 104 555 6666",
    joinDate: new Date("2023-08-15"),
  },
];

interface ManagerAuthStore {
  user: ManagerUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  updateProfile: (updates: Partial<ManagerUser>) => void;
  getManagersByRole: (role: ManagerRole) => ManagerUser[];
}

export const useManagerAuth = create<ManagerAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string): Promise<boolean> => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const manager = mockManagers.find(
            (m) => m.username === username && m.password === password,
          );

          if (manager) {
            const userWithPermissions: ManagerUser = {
              ...manager,
              permissions: rolePermissions[manager.role],
              lastLogin: new Date(),
            };

            set({
              user: userWithPermissions,
              isAuthenticated: true,
            });
            return true;
          }

          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      hasPermission: (permission: Permission): boolean => {
        const { user } = get();
        return user?.permissions.includes(permission) || false;
      },

      updateProfile: (updates: Partial<ManagerUser>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      getManagersByRole: (role: ManagerRole): ManagerUser[] => {
        return mockManagers
          .filter((manager) => manager.role === role)
          .map((manager) => ({
            ...manager,
            permissions: rolePermissions[manager.role],
          }));
      },
    }),
    {
      name: "manager-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const getRoleDisplayName = (role: ManagerRole): string => {
  const roleNames: Record<ManagerRole, string> = {
    super_manager: "مدير عام",
    store_manager: "مدير المتجر",
    operations_manager: "مدير العمليات",
    marketing_manager: "مدير التسويق",
    finance_manager: "مدير المالية",
    content_manager: "مدير المحتوى",
  };
  return roleNames[role];
};

export const getPermissionDisplayName = (permission: Permission): string => {
  const permissionNames: Record<Permission, string> = {
    read_dashboard: "عرض لوحة التحكم",
    manage_products: "إدارة المنتجات",
    manage_orders: "إدارة الطلبات",
    manage_customers: "إدارة العملاء",
    manage_staff: "إدارة الموظفين",
    view_analytics: "عرض التحليلات",
    manage_finances: "إدارة المالية",
    manage_marketing: "إدارة التسويق",
    manage_content: "إدارة المحتوى",
    system_settings: "إعدادات النظام",
    user_management: "إدارة ��لمستخدمين",
    export_data: "تصدير البيانات",
    manage_inventory: "إدارة المخزون",
  };
  return permissionNames[permission];
};
