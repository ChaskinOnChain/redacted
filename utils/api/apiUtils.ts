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

export function getPosts() {
  return axios.get(`http://localhost:3000/api/posts/`).then((res) => res.data);
}

export function getUserPosts(id: string) {
  return axios
    .get(`http://localhost:3000/api/users/${id}/posts`)
    .then((res) => res.data);
}
