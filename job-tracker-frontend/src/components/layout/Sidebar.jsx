import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Settings,
} from "lucide-react";


function Sidebar(){

const menu=[
{
name:"Dashboard",
icon:LayoutDashboard
},
{
name:"Applications",
icon:Briefcase
},
{
name:"Analytics",
icon:BarChart3
},
{
name:"Settings",
icon:Settings
}
];


return (

<aside
className="
hidden md:flex
fixed
left-0
top-0
h-screen
w-64
border-r
bg-background
p-5
flex-col
"
>

<h1 className="text-2xl font-bold mb-8">
JobTracker 🚀
</h1>


<nav className="space-y-2">

{
menu.map((item)=>{

const Icon=item.icon;

return (

<button
key={item.name}
className="
flex
items-center
gap-3
w-full
rounded-lg
px-3
py-2
hover:bg-muted
"
>

<Icon size={20}/>

{item.name}

</button>

)

})
}

</nav>


</aside>

)

}

export default Sidebar;