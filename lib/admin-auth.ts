import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "super_admin";
  avatar?: string;
  lastLogin?: Date;
}

interface AdminAuthStore {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

// محاكاة بيانات الأدمن (في التطبيق الحقيقي ستأتي من API)
const mockAdminUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // في التطبيق الحقيقي سيكون مشفر
    email: "admin@kledje.com",
    role: "super_admin" as const,
    avatar: "/admin-avatar.jpg",
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    email: "manager@kledje.com",
    role: "admin" as const,
  },
];

export const useAdminAuth = create<AdminAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });

        try {
          // محاكاة تأخير الشبكة
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const user = mockAdminUsers.find(
            (u) => u.username === username && u.password === password,
          );

          if (user) {
            const adminUser: AdminUser = {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              lastLogin: new Date(),
            };

            set({
              user: adminUser,
              isAuthenticated: true,
              isLoading: false,
            });

            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: () => {
        const { user } = get();
        return !!user;
      },
    }),
    {
      name: "kledje-admin-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
