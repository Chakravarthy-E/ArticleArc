import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogInterface } from "../molecules/hero";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogCard({
  _id,
  title,
  banner,
  tag,
  createdAt,
  owner,
}: BlogInterface) {
  const [ownerData, setOwnerData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchOwner = async () => {
      if (!owner) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${owner}`
        );

        if (response.status === 200) {
          setOwnerData(response.data.user.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOwner();
  }, [owner]);
  return (
    <>
      <Link key={_id} href={`/blog/${_id}`} as={`/blog/${_id}`}>
        <div
          className="rounded-lg   dark:border-gray-700   opacity-90 hover:opacity-100 overflow-hidden shadow"
          title={title}
        >
          <Image
            src={banner?.url}
            width={300}
            height={200}
            alt="image"
            className="w-full h-80 object-cover relative"
          />
          <div className="mt-3 p-3 space-y-1">
            <p className="flex justify-between items-center">
              <span className="tag">{tag}</span>
              {createdAt && (
                <span className="font-semibold text-gray-600 text-xs">
                  {format(createdAt, "dd-MM-yyyy")}
                </span>
              )}
            </p>
            <p className="text-lg font-semibold line-clamp-1 font-outfit">
              {title}
            </p>
            <p className="font-outfit font-semibold text-gray-600">
              {ownerData}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
