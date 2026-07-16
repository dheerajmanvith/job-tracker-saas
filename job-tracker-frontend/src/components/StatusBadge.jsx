import { Badge } from "@/components/ui/badge";


function StatusBadge({status}){


const variants={

APPLIED:"secondary",

INTERVIEW:"default",

OFFER:"default",

REJECTED:"destructive"

};


return (

<Badge
variant={variants[status] || "secondary"}
>

{status}

</Badge>

);


}


export default StatusBadge;