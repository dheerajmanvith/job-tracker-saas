import axios from "axios";

const API="http://127.0.0.1:5000/api/admin";

const config={
 headers:{
  Authorization:
  `Bearer ${localStorage.getItem("access_token")}`
 }
};

export const getUsers=()=>axios.get(
 `${API}/users`,
 config
).then(res=>res.data);


export const toggleUser=(id)=>axios.put(
 `${API}/users/${id}/toggle`,
 {},
 config
);


export const changeRole=(id,role)=>axios.put(
 `${API}/users/${id}/role`,
 {role},
 config
);


export const deleteUser=(id)=>axios.delete(
 `${API}/users/${id}`,
 config
);