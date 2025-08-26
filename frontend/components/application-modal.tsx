"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Send, AlertTriangle } from "lucide-react"

interface ApplicationModalProps {
  jobTitle: string
  requiredSkills: string[]
  userSkills: Array<{
    name: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    verified: boolean
  }>
  matchPercentage: number
  children: React.ReactNode
}

export function ApplicationModal({
  jobTitle,
  requiredSkills,
  userSkills,
  matchPercentage,
  children,
}: ApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate application submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] Application submitted:", { jobTitle, coverLetter, matchPercentage })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to submit application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifiedSkills = userSkills.filter(
    (skill) => skill.verified && requiredSkills.some((req) => req.toLowerCase() === skill.name.toLowerCase()),
  )

  if (isSubmitted) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Your application has been sent to the employer. You'll be notified of any updates.
            </p>
            <Button className="w-full" onClick={() => setIsSubmitted(false)}>
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
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Skill Verification Status */}
          <div className="space-y-4">
            <h4 className="font-semibold">Your Verified Skills</h4>

            {verifiedSkills.length > 0 ? (
              <div className="space-y-2">
                {verifiedSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">No Verified Skills Match</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      You don't have verified skills that match this job's requirements. Consider completing skill
                      assessments first.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Match Score:</span>
              <Badge variant={matchPercentage >= 80 ? "default" : matchPercentage >= 50 ? "secondary" : "destructive"}>
                {matchPercentage}%
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Cover Letter */}
          <div className="space-y-3">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell the employer why you're the perfect fit for this job..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Highlight your relevant experience and explain how your verified skills apply to this project.
            </p>
          </div>

          {/* Application Terms */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h5 className="font-medium mb-2">Application Terms</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your verified skills will be shared with the employer</li>
              <li>• Payment will be held in smart contract escrow</li>
              <li>• Work must be completed within the specified timeframe</li>
              <li>• Disputes are resolved through the VeriChain arbitration system</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!coverLetter.trim() && matchPercentage < 50)}
              className="flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Application
                </div>
              )}
            </Button>
          </div>

          {matchPercentage < 50 && !coverLetter.trim() && (
            <p className="text-sm text-muted-foreground text-center">
              Low skill match detected. A cover letter is required to explain your qualifications.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
