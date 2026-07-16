import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";

function ApplicationCard({ application }) {
  const statusVariant = {
    APPLIED: "secondary",
    PHONE_SCREEN: "default",
    INTERVIEW: "default",
    OFFER: "default",
    REJECTED: "destructive",
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold">
            {application.company}
          </CardTitle>

          <Badge
            variant={statusVariant[application.status] || "outline"}
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{application.position}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{application.location || "Remote"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>
            {application.applied_date
              ? new Date(application.applied_date).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApplicationCard;