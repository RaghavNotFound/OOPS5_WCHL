"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Clock, CheckCircle, AlertTriangle, DollarSign, User, Calendar } from "lucide-react"

interface EscrowCardProps {
  escrow: {
    id: string
    jobTitle: string
    amount: string
    status: "pending" | "in-progress" | "completed" | "disputed" | "released"
    client: string
    developer: string
    createdDate: string
    deadline: string
    description: string
    milestones?: Array<{
      id: string
      description: string
      amount: string
      status: "pending" | "completed" | "approved"
    }>
  }
  userRole: "client" | "developer"
  onAction?: (action: string, escrowId: string) => void
}

export function EscrowCard({ escrow, userRole, onAction }: EscrowCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "released":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "disputed":
        return "bg-red-100 text-red-800 border-red-200"
      case "released":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const canApprove = userRole === "client" && escrow.status === "completed"
  const canDispute = escrow.status === "in-progress" || escrow.status === "completed"
  const canRelease = userRole === "client" && escrow.status === "completed"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg mb-1">{escrow.jobTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">Escrow ID: {escrow.id}</p>
          </div>
          <Badge variant="outline" className={`${getStatusColor(escrow.status)} flex items-center gap-1`}>
            {getStatusIcon(escrow.status)}
            {escrow.status.replace("-", " ")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{escrow.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Amount:</span>
              <p className="font-medium">{escrow.amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Deadline:</span>
              <p className="font-medium">{escrow.deadline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Client:</span>
              <p className="font-medium">{escrow.client}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Developer:</span>
              <p className="font-medium">{escrow.developer}</p>
            </div>
          </div>
        </div>

        {escrow.milestones && escrow.milestones.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-3">Milestones</h4>
              <div className="space-y-2">
                {escrow.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{milestone.description}</p>
                      <p className="text-xs text-muted-foreground">{milestone.amount}</p>
                    </div>
                    <Badge variant={milestone.status === "approved" ? "default" : "secondary"} className="text-xs">
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="flex gap-2">
          {canApprove && (
            <Button onClick={() => onAction?.("approve", escrow.id)} className="flex-1">
              Approve & Release Funds
            </Button>
          )}

          {canRelease && (
            <Button
              onClick={() => onAction?.("release", escrow.id)}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Release Payment
            </Button>
          )}

          {canDispute && (
            <Button onClick={() => onAction?.("dispute", escrow.id)} variant="destructive" className="flex-1">
              Dispute
            </Button>
          )}

          {escrow.status === "pending" && userRole === "developer" && (
            <Button onClick={() => onAction?.("start", escrow.id)} className="flex-1">
              Start Work
            </Button>
          )}

          <Button onClick={() => onAction?.("details", escrow.id)} variant="outline" className="bg-transparent">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
