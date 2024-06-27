import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface BlogData {
  _id: string;
  title: string;
  description: string;
  banner: {
    public_id: string;
    url: string;
  };
  tag?: string;
  createdAt: string;
}

export default function BlogCard({
  _id,
  title,
  banner,
  description,
  tag,
  createdAt,
}: BlogData) {
  return (
    <>
      <Link key={_id} href={`/blog/${_id}`} as={`/blog/${_id}`}>
        <div className="rounded-lg  opacity-90 hover:opacity-100 overflow-hidden border">
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
