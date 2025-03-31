import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuth() {
  const { auth, login, logout, printAuth } = useContext(AuthContext)

  if (typeof auth === 'undefined') {
    throw new Error('useAuth must be used with an authProvider')
  }

  return {
    auth,
    login,
    logout,
    printAuth
  }
}