"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface PaymentModalProps {
  action: "approve" | "dispute" | "release" | "details"
  escrow: {
    id: string
    jobTitle: string
    amount: string
    status: string
    client: string
    developer: string
    description: string
  }
  children: React.ReactNode
}

export function PaymentModal({ action, escrow, children }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [disputeReason, setDisputeReason] = useState("")
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")

  const handleAction = async () => {
    setIsProcessing(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(`[v0] ${action} action completed for escrow:`, escrow.id)
      setIsCompleted(true)
    } catch (error) {
      console.error(`Failed to ${action}:`, error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getActionTitle = () => {
    switch (action) {
      case "approve":
        return "Approve Work & Release Payment"
      case "dispute":
        return "Dispute Escrow"
      case "release":
        return "Release Payment"
      case "details":
        return "Escrow Details"
      default:
        return "Payment Action"
    }
  }

  if (isCompleted && action !== "details") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {action === "approve" && "Payment Released!"}
              {action === "dispute" && "Dispute Filed!"}
              {action === "release" && "Payment Released!"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {action === "approve" && "The payment has been released to the developer's wallet."}
              {action === "dispute" && "Your dispute has been submitted for arbitration."}
              {action === "release" && "The payment has been successfully released."}
            </p>
            <Button className="w-full" onClick={() => setIsCompleted(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getActionTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Escrow Summary */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-3">Escrow Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job:</span>
                <span className="font-medium">{escrow.jobTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{escrow.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Developer:</span>
                <span className="font-medium">{escrow.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline">{escrow.status}</Badge>
              </div>
            </div>
          </div>

          {/* Action-specific content */}
          {action === "approve" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="rating">Rate the Developer (1-5 stars)</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="feedback">Feedback (Optional)</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience working with this developer..."
                  className="mt-1"
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Smart Contract Release</p>
                    <p className="text-sm text-green-700 mt-1">
                      Approving will automatically release the full payment amount to the developer's wallet via smart
                      contract.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {action === "dispute" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="disputeReason">Reason for Dispute *</Label>
                <Textarea
                  id="disputeReason"
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Explain why you're disputing this escrow..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Dispute Process</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Filing a dispute will freeze the escrow and initiate arbitration. Both parties will be able to
                      present evidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {action === "release" && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Payment Release</p>
                    <p className="text-sm text-blue-700 mt-1">
                      This will immediately release the payment to the developer. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Amount:</span>
                  <span className="font-medium">{escrow.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (2.5%):</span>
                  <span className="font-medium">$62.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Fee (estimated):</span>
                  <span className="font-medium">$12.30</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Developer Receives:</span>
                  <span>$2,425.20</span>
                </div>
              </div>
            </div>
          )}

          {action === "details" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Transaction History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Escrow Created</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Work Started</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Work Submitted</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Smart Contract Details</h4>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Address:</span>
                    <span>0x742d35...3b8D4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span>Ethereum Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span>18,945,123</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {action !== "details" && (
            <div className="flex gap-3">
              <Button
                onClick={handleAction}
                disabled={isProcessing || (action === "dispute" && !disputeReason.trim())}
                className="flex-1"
                variant={action === "dispute" ? "destructive" : "default"}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Processing...
                  </div>
                ) : (
                  <>
                    {action === "approve" && "Approve & Release"}
                    {action === "dispute" && "File Dispute"}
                    {action === "release" && "Release Payment"}
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
