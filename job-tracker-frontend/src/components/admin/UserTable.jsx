import {useEffect,useState} from "react";

import {
 getUsers,
 toggleUser,
 changeRole,
 deleteUser
} from "../../services/adminApi";


export default function UserTable(){

const [users,setUsers]=useState([]);


const load=async()=>{
 setUsers(await getUsers());
};


useEffect(()=>{
 load();
},[]);



return(
<table className="w-full border mt-5">

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>


<tbody>

{
users.map(user=>(

<tr key={user.id} className="border">

<td>{user.id}</td>

<td>{user.username}</td>

<td>{user.email}</td>


<td>
<select
value={user.role}
onChange={(e)=>{
changeRole(
user.id,
e.target.value
);
load();
}}
>

<option>USER</option>
<option>ADMIN</option>

</select>
</td>


<td>
{user.is_active?"Active":"Inactive"}
</td>


<td>

<button
className="bg-blue-500 text-white px-2"
onClick={()=>{
toggleUser(user.id);
load();
}}
>
Toggle
</button>


<button
className="bg-red-500 text-white px-2 ml-2"
onClick={()=>{
deleteUser(user.id);
load();
}}
>
Delete
</button>


</td>

</tr>

))
}

</tbody>

</table>
)

}