import { AuthProvider } from "@/providers/AuthProvider";
import { AutomationsProvider } from "@/providers/AutomationsProvider";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/features/auth/Login";
import Dashboard from "@/features/dashboard/Dashboard";

function Shell() {
  const { user, loading } = useAuth();

  if (loading) return null;
  return user ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AutomationsProvider>
        <Shell />
      </AutomationsProvider>
    </AuthProvider>
  );
}
