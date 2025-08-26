import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, MapPin, Users } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    budget: string
    duration: string
    location: string
    skills: string[]
    applicants: number
    postedDate: string
    description: string
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {job.postedDate}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{job.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        <Button className="w-full">Apply Now</Button>
      </CardContent>
    </Card>
  )
}
