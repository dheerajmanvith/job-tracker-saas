import Card from "../components/Card";


function Dashboard(){

return (

<div className="space-y-6">


<h1 className="text-3xl font-bold">
Dashboard
</h1>


<div className="
grid
gap-4
md:grid-cols-3
">


<Card title="Applications">

<p className="text-4xl font-bold">
24
</p>

</Card>


<Card title="Interviews">

<p className="text-4xl font-bold">
8
</p>

</Card>


<Card title="Offers">

<p className="text-4xl font-bold">
3
</p>

</Card>


</div>


</div>

)

}


export default Dashboard;