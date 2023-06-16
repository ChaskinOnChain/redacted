import axios from "axios";

export function getUserByEmail(email: string) {
  return axios
    .get(`http://localhost:3000/api/users/email/${email}`)
    .then((res) => res.data);
}

export function getUserById(id: string) {
  return axios
    .get(`http://localhost:3000/api/users/id/${id}`)
    .then((res) => res.data);
}

export function getPosts({ pageParam = 1 }, search: string) {
  return axios
    .get(
      `http://localhost:3000/api/posts?page=${pageParam}&limit=3&search=${search}`
    )
    .then((res) => res.data);
}

export function getUserPosts(id: string, { pageParam = 1 }) {
  return axios
    .get(
      `http://localhost:3000/api/users/${id}/posts?page=${pageParam}&limit=3`
    )
    .then((res) => res.data);
}
