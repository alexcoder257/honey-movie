import { auth, signOut } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const logout = async ()=>{
    signOut();
}
