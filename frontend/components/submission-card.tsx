import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Code, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface SubmissionCardProps {
  submission: {
    id: string
    jobTitle: string
    company: string
    submittedDate: string
    status: "pending" | "in-review" | "approved" | "rejected"
    payment: string
    deadline: string
  }
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "in-review":
        return <Code className="h-4 w-4 text-blue-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base mb-1">{submission.jobTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{submission.company}</p>
          </div>
          <Badge variant="outline" className={`text-xs ${getStatusColor(submission.status)}`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(submission.status)}
              {submission.status.replace("-", " ")}
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Submitted:</span>
            <p className="font-medium">{submission.submittedDate}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Payment:</span>
            <p className="font-medium">{submission.payment}</p>
          </div>
        </div>

        <div className="text-sm">
          <span className="text-muted-foreground">Deadline:</span>
          <p className="font-medium">{submission.deadline}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            View Details
          </Button>
          {submission.status === "pending" && (
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Edit Submission
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
