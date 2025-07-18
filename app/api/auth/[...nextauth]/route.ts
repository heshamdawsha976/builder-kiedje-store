import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth-config";

/**
 * NextAuth.js API Route Handler
 * Handles all authentication routes: /api/auth/*
 */

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
