import { userCtx } from "@/contexts/userContext";
import { useContext } from "react";

export const useUser = () => useContext(userCtx)
