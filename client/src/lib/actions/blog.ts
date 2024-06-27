import axios from "axios";

export async function getAllBlogs() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-blogs`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBlog({ id }: { id: any }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-blog/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
