import {
  Card as ShadcnCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function Card({
  title,
  children,
}) {

  return (

    <ShadcnCard>

      <CardHeader>

        <CardTitle>
          {title}
        </CardTitle>

      </CardHeader>


      <CardContent>

        {children}

      </CardContent>


    </ShadcnCard>

  );

}


export default Card;