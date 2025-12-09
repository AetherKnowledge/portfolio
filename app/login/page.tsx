import { getUser } from "@/lib/supabase/auth-actions";
import { redirect } from "next/navigation";
import Login from "../components/Login";

const page = async () => {
  const user = await getUser();
  if (user) {
    redirect("/admin");
  }

  return <Login />;
};

export default page;
