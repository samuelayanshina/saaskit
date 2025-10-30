export async function getSession(){
  // Temporary mock session for development
  return {
    user: {
      id: "dev-user-id",
      name: "Developer",
      role: "admin"
    }
  };
}
