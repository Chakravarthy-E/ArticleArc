import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  createdAt: string;
}

export default function User() {
  const [data, setData] = useState<UserData | null>(null);
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user") || "{}");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${user._id}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (response.data.success) {
          setData(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold mb-5 text-center">
          User Details
        </h1>
        {data && (
          <>
            <div className="flex items-center space-x-5">
              <p className="font-semibold">Name</p>
              <p className="text-gray-600">{data.name}</p>
            </div>
            <div className="flex items-center space-x-5">
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">{data.email}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
