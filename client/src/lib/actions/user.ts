import axios from "axios";

export async function getUser({ id }: { id: string }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
