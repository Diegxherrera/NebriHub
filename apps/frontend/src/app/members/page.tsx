"use client";
import axios from "axios";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { AsideMenu } from "@/components/AsideMenu";
import Header from "@/components/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import MemberCard from "@/components/MemberCard";
import { UserProvider, useUser } from "@/context/UserContext";

// Fetch users from API based on user role
const fetchUsers = async (user: any) => {
  try {
    const endpoint = "http://localhost:3005/users";

    // Get the JWT token securely
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    console.log("Retrieved token:", token);

    if (!token) throw new Error("No token found in cookies");

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    throw error;
  }
};

export function MembersComponent() {
  const { user } = useUser(); // Obtain user context
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // Fetch data
    const fetchData = async () => {
      try {
        const users = await fetchUsers(user);
        setData(users);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default function Members() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <UserProvider>
        <TooltipProvider>
          <Header />
          <AsideMenu />
        </TooltipProvider>
        <div className="flex mr-9">
          <MembersComponent />
          <MemberCard />
        </div>
      </UserProvider>
    </div>
  );
}
