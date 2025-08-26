"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SkillSelector } from "@/components/skill-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, DollarSign, Clock, MapPin, Users, Briefcase, CheckCircle } from "lucide-react"

interface JobFormData {
  title: string
  description: string
  budget: string
  budgetType: "fixed" | "hourly"
  duration: string
  location: string
  experienceLevel: string
  skills: string[]
  category: string
  applicantLimit: string
}

export default function PostJobPage() {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    budget: "",
    budgetType: "fixed",
    duration: "",
    location: "Remote",
    experienceLevel: "",
    skills: [],
    category: "frontend", // Updated default value
    applicantLimit: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Job posting data:", formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to post job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title && formData.description && formData.budget && formData.skills.length > 0

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Job Posted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your job has been posted to the blockchain and is now visible to developers.
              </p>
              <div className="space-y-3">
                <Button className="w-full">View Job Listing</Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsSubmitted(false)}>
                  Post Another Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a Job</h1>
          <p className="text-muted-foreground">Find the perfect developer for your project</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g. Frontend React Developer"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="fullstack">Full Stack Development</SelectItem>
                        <SelectItem value="blockchain">Blockchain Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="devops">DevOps & Infrastructure</SelectItem>
                        <SelectItem value="design">UI/UX Design</SelectItem>
                        <SelectItem value="data">Data Science & Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the project, requirements, and what you're looking for..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Required Skills *</Label>
                    <div className="mt-1">
                      <SkillSelector
                        selectedSkills={formData.skills}
                        onSkillsChange={handleSkillsChange}
                        placeholder="Add required skills..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => handleInputChange("experienceLevel", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget *</Label>
                      <div className="flex mt-1">
                        <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange("budget", e.target.value)}
                          placeholder="5000"
                          className="rounded-l-none"
                        />
                        <Select
                          value={formData.budgetType}
                          onValueChange={(value: "fixed" | "hourly") => handleInputChange("budgetType", value)}
                        >
                          <SelectTrigger className="w-24 rounded-l-none border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="hourly">/hr</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="2-months">2 Months</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6+ Months</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="EU">Europe</SelectItem>
                          <SelectItem value="APAC">Asia Pacific</SelectItem>
                          <SelectItem value="Global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="applicantLimit">Max Applicants</Label>
                      <Select
                        value={formData.applicantLimit}
                        onValueChange={(value) => handleInputChange("applicantLimit", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="No limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 applicants</SelectItem>
                          <SelectItem value="10">10 applicants</SelectItem>
                          <SelectItem value="20">20 applicants</SelectItem>
                          <SelectItem value="50">50 applicants</SelectItem>
                          <SelectItem value="">No limit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{formData.title || "Job Title"}</h3>
                    <p className="text-sm text-muted-foreground">Your Company</p>
                  </div>

                  {formData.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{formData.description}</p>
                  )}

                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {formData.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {formData.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    {formData.budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>
                          ${formData.budget} {formData.budgetType === "hourly" ? "/hour" : "fixed"}
                        </span>
                      </div>
                    )}
                    {formData.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formData.duration}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posting Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posting Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Blockchain Storage</p>
                      <p>Your job will be stored on-chain for transparency and immutability.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Smart Contract Escrow</p>
                      <p>Payments are secured through smart contracts until work is completed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Posting to Blockchain...
                  </div>
                ) : (
                  "Post Job"
                )}
              </Button>

              {!isFormValid && (
                <p className="text-sm text-muted-foreground text-center">
                  Please fill in all required fields to post your job
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
