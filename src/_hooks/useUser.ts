import { getUser } from "@/_utils/auth";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data: user, error } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: () => getUser()
  });

  if (error) throw new Error(error.message);

  return user;
};

export default useUser;
