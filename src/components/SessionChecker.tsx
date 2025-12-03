import { useEffect } from "react";
import { useSessionManager } from "../hooks/useSessionManager";

const SessionChecker: React.FC = () => {
  const { checkSession } = useSessionManager();

  useEffect(() => {
    checkSession();
  }, []);

  return null;
};

export default SessionChecker;
