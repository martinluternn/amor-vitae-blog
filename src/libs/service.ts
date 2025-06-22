import fetchAPI from "./base";

export async function getAllPosts() {
  const data = await fetchAPI('/posts').catch((e) => e);
  return data;
}

export async function getCommentByPost(id: string) {
  const data = await fetchAPI(`/posts/${id}/comments`).catch((e) => e);
  return data;
}
