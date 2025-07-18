/**
 * Enhanced Authentication System for Kledje Store
 * Unified auth configuration with role-based access control
 */

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { UserRole, User } from "@/lib/types";

// ===============================
// AUTH CONFIGURATION
// ===============================

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      avatar?: string;
      permissions: string[];
      lastLogin: Date;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    permissions: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    permissions: string[];
    lastLogin: Date;
  }
}

// ===============================
// ROLE PERMISSIONS
// ===============================

const rolePermissions: Record<UserRole, string[]> = {
  customer: [
    "view_products",
    "create_order",
    "view_own_orders",
    "update_own_profile",
    "create_review",
  ],
  admin: [
    "view_products",
    "manage_products",
    "view_orders",
    "manage_orders",
    "view_customers",
    "manage_customers",
    "view_analytics",
    "manage_content",
  ],
  manager: [
    "view_products",
    "manage_products",
    "view_orders",
    "manage_orders",
    "view_customers",
    "manage_customers",
    "view_analytics",
    "manage_content",
    "view_reports",
    "manage_staff",
    "system_settings",
  ],
  super_admin: [
    "view_products",
    "manage_products",
    "view_orders",
    "manage_orders",
    "view_customers",
    "manage_customers",
    "view_analytics",
    "manage_content",
    "view_reports",
    "manage_staff",
    "system_settings",
    "user_management",
    "delete_data",
    "export_data",
  ],
  staff: [
    "view_products",
    "view_orders",
    "update_order_status",
    "view_customers",
    "basic_analytics",
  ],
};

// ===============================
// MOCK USER DATABASE
// ===============================

interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

const mockUsers: MockUser[] = [
  // Super Admin
  {
    id: "1",
    email: "admin@kledje.com",
    password: "admin123",
    name: "أحمد محمد العليا",
    role: "super_admin",
    avatar: "/avatars/admin.jpg",
    isActive: true,
    createdAt: new Date("2023-01-15"),
  },
  // Manager
  {
    id: "2",
    email: "manager@kledje.com",
    password: "manager123",
    name: "فاطمة أحمد الزهراء",
    role: "manager",
    avatar: "/avatars/manager.jpg",
    isActive: true,
    createdAt: new Date("2023-03-20"),
  },
  // Admin
  {
    id: "3",
    email: "support@kledje.com",
    password: "support123",
    name: "محمد سامي النور",
    role: "admin",
    isActive: true,
    createdAt: new Date("2023-05-10"),
  },
  // Staff
  {
    id: "4",
    email: "staff@kledje.com",
    password: "staff123",
    name: "نورا سعد الشامي",
    role: "staff",
    isActive: true,
    createdAt: new Date("2023-07-01"),
  },
  // Customer
  {
    id: "5",
    email: "customer@example.com",
    password: "customer123",
    name: "سارة علي الشامي",
    role: "customer",
    isActive: true,
    createdAt: new Date("2023-08-15"),
  },
];

// ===============================
// AUTH HELPER FUNCTIONS
// ===============================

async function authenticateUser(
  email: string,
  password: string,
): Promise<MockUser | null> {
  // In production, this would query your database
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password && u.isActive,
  );

  if (user) {
    // Update last login
    user.lastLogin = new Date();
    return user;
  }

  return null;
}

function getUserPermissions(role: UserRole): string[] {
  return rolePermissions[role] || [];
}

// ===============================
// AUTH CONFIGURATION
// ===============================

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "البريد الإلكتروني وكلمة المرور",
      credentials: {
        email: {
          label: "البريد الإلكتروني",
          type: "email",
          placeholder: "ادخل بريدك الإلكتروني",
        },
        password: {
          label: "كلمة المرور",
          type: "password",
          placeholder: "ادخل كلمة المرور",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان");
        }

        try {
          const user = await authenticateUser(
            credentials.email,
            credentials.password,
          );

          if (!user) {
            throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيح");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            permissions: getUserPermissions(user.role),
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("فشل في تسجيل الدخول");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
        token.lastLogin = new Date();
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email!,
          name: token.name!,
          role: token.role,
          avatar: token.picture || undefined,
          permissions: token.permissions,
          lastLogin: token.lastLogin,
        };
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in with ${account?.provider}`);
      // You can add logging to database here
    },
    async signOut({ session, token }) {
      console.log(`User ${session?.user?.email} signed out`);
      // You can add logout logging here
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// ===============================
// PERMISSION HELPERS
// ===============================

export function hasPermission(
  userPermissions: string[],
  requiredPermission: string,
): boolean {
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
}

export function hasAllPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}

export function isAdmin(role: UserRole): boolean {
  return ["admin", "manager", "super_admin"].includes(role);
}

export function isSuperAdmin(role: UserRole): boolean {
  return role === "super_admin";
}

export function canAccessAdminPanel(role: UserRole): boolean {
  return ["admin", "manager", "super_admin", "staff"].includes(role);
}

// ===============================
// ROUTE PROTECTION
// ===============================

export interface RoutePermission {
  path: string;
  requiredPermissions: string[];
  exactMatch?: boolean;
}

export const protectedRoutes: RoutePermission[] = [
  // Admin routes
  {
    path: "/admin",
    requiredPermissions: ["view_analytics"],
  },
  {
    path: "/admin/products",
    requiredPermissions: ["manage_products"],
  },
  {
    path: "/admin/orders",
    requiredPermissions: ["view_orders"],
  },
  {
    path: "/admin/customers",
    requiredPermissions: ["view_customers"],
  },
  {
    path: "/admin/analytics",
    requiredPermissions: ["view_analytics"],
  },
  {
    path: "/admin/settings",
    requiredPermissions: ["system_settings"],
  },

  // Manager routes
  {
    path: "/manager",
    requiredPermissions: ["view_reports"],
  },
  {
    path: "/manager/staff",
    requiredPermissions: ["manage_staff"],
  },
  {
    path: "/manager/settings",
    requiredPermissions: ["system_settings"],
  },

  // Customer routes
  {
    path: "/profile",
    requiredPermissions: ["update_own_profile"],
  },
  {
    path: "/orders",
    requiredPermissions: ["view_own_orders"],
  },
];

export function getRequiredPermissions(path: string): string[] {
  const route = protectedRoutes.find((route) => {
    if (route.exactMatch) {
      return route.path === path;
    }
    return path.startsWith(route.path);
  });

  return route?.requiredPermissions || [];
}

export function canAccessRoute(
  userPermissions: string[],
  path: string,
): boolean {
  const requiredPermissions = getRequiredPermissions(path);
  if (requiredPermissions.length === 0) return true;

  return hasAnyPermission(userPermissions, requiredPermissions);
}

// ===============================
// EXPORT CONFIGURATION
// ===============================

export { rolePermissions, getUserPermissions };
export type { MockUser };
