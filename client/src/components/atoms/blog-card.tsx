import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BlogData } from "../../lib/features/api/apiSlice";
import { BlogInterface } from "../molecules/hero";

export default function BlogCard({
  _id,
  title,
  banner,
  tag,
  createdAt,
}: BlogInterface) {
  return (
    <>
      <Link key={_id} href={`/blog/${_id}`} as={`/blog/${_id}`}>
        <div
          className="rounded-lg  opacity-90 hover:opacity-100 overflow-hidden border"
          title={title}
        >
          <Image
            src={banner.url}
            width={300}
            height={200}
            alt="image"
            className="w-full h-80 object-cover"
          />
          <div className="mt-3 p-3 space-y-2">
            <p className="flex justify-between items-center">
              <span className="tag">{tag}</span>
              <span className="font-semibold">
                {format(createdAt, "dd-MM-yyyy")}
              </span>
            </p>
            <p className="text-lg font-semibold line-clamp-1 font-outfit">
              {title}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
