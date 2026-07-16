import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  CalendarDays,
  MapPin
} from "lucide-react";


function ApplicationCard({
  application
}) {


const statusVariant = {

  APPLIED:"secondary",

  PHONE_SCREEN:"default",

  INTERVIEW:"default",

  OFFER:"default",

  REJECTED:"destructive"

};


return (

<Card
className="
hover:shadow-lg
transition
duration-300
"
>


<CardHeader>


<div className="
flex
justify-between
items-start
gap-3
">


<CardTitle className="text-lg">

{application.company}

</CardTitle>


<Badge
variant={
statusVariant[application.status]
}
>

{application.status}

</Badge>


</div>


</CardHeader>



<CardContent
className="
space-y-3
"
>


<div className="flex items-center gap-2 text-sm">

<Building2 size={16}/>

<span>
{application.position}
</span>

</div>



<div className="flex items-center gap-2 text-sm">

<MapPin size={16}/>

<span>
{application.location || "Remote"}
</span>

</div>



<div className="flex items-center gap-2 text-sm">

<CalendarDays size={16}/>

<span>

{
new Date(application.applied_date)
.toLocaleDateString()
}

</span>

</div>


</CardContent>


</Card>

)

}


export default ApplicationCard;