import { Navigation } from "@/components/navigation"
import { SkillMatchIndicator } from "@/components/skill-match-indicator"
import { ApplicationModal } from "@/components/application-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DollarSign,
  Clock,
  MapPin,
  Users,
  Calendar,
  Building,
  Star,
  Shield,
  Briefcase,
  CheckCircle,
} from "lucide-react"

// Mock data - in a real app, this would come from your backend/blockchain
const jobData = {
  id: "1",
  title: "Frontend React Developer",
  company: "TechCorp",
  companyLogo: "/generic-company-logo.png",
  budget: "$2,500",
  budgetType: "fixed" as const,
  duration: "2 weeks",
  location: "Remote",
  postedDate: "2 days ago",
  applicants: 12,
  category: "Frontend Development",
  experienceLevel: "Intermediate",
  description: `We're looking for a skilled React developer to build a modern dashboard interface for our SaaS platform. The project involves creating responsive components, implementing state management, and integrating with our REST API.

Key responsibilities:
• Develop reusable React components using TypeScript
• Implement responsive design with Tailwind CSS
• Integrate with backend APIs and handle data fetching
• Ensure cross-browser compatibility and performance optimization
• Write clean, maintainable code with proper documentation

This is a great opportunity to work with a modern tech stack and contribute to a growing platform used by thousands of users.`,
  requirements: [
    "3+ years of React development experience",
    "Strong TypeScript skills",
    "Experience with modern CSS frameworks (Tailwind preferred)",
    "Knowledge of state management (Redux, Zustand, or Context API)",
    "Familiarity with REST API integration",
    "Understanding of responsive design principles",
    "Experience with version control (Git)",
  ],
  skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "REST APIs"],
  deliverables: [
    "Complete dashboard interface with all specified components",
    "Responsive design that works on desktop and mobile",
    "Clean, documented code with TypeScript types",
    "Integration with provided API endpoints",
    "Basic unit tests for key components",
  ],
  companyInfo: {
    name: "TechCorp",
    description: "A leading SaaS company focused on productivity tools for modern teams.",
    employees: "50-100",
    founded: "2019",
    rating: 4.8,
    jobsPosted: 23,
  },
}

// Mock user skills - in a real app, this would come from user's profile/blockchain
const userSkills = [
  { name: "React", level: "Advanced" as const, verified: true },
  { name: "TypeScript", level: "Expert" as const, verified: true },
  { name: "JavaScript", level: "Expert" as const, verified: true },
  { name: "Tailwind CSS", level: "Intermediate" as const, verified: false },
  { name: "Node.js", level: "Advanced" as const, verified: true },
]

export default function JobDetailsPage() {
  const verifiedSkillsCount = userSkills.filter(
    (skill) => skill.verified && jobData.skills.some((req) => req.toLowerCase() === skill.name.toLowerCase()),
  ).length

  const matchPercentage = Math.round((verifiedSkillsCount / jobData.skills.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{jobData.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <span className="font-medium">{jobData.company}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{jobData.companyInfo.rating}</span>
                      </div>
                      <Badge variant="outline">{jobData.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>
                          {jobData.budget} {jobData.budgetType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{jobData.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{jobData.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {jobData.postedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {jobData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <ApplicationModal
                  jobTitle={jobData.title}
                  requiredSkills={jobData.skills}
                  userSkills={userSkills}
                  matchPercentage={matchPercentage}
                >
                  <Button size="lg" className="w-full sm:w-auto">
                    <Shield className="h-4 w-4 mr-2" />
                    Apply with Verified Skills
                  </Button>
                </ApplicationModal>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-muted-foreground">{jobData.description}</div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle>Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {jobData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Match */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillMatchIndicator requiredSkills={jobData.skills} userSkills={userSkills} />
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {jobData.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{jobData.companyInfo.description}</p>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Size:</span>
                    <span>{jobData.companyInfo.employees} employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded:</span>
                    <span>{jobData.companyInfo.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jobs Posted:</span>
                    <span>{jobData.companyInfo.jobsPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{jobData.companyInfo.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Smart Contract Escrow</p>
                    <p className="text-muted-foreground">
                      Payment is secured in blockchain escrow until work is approved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Verified Skills Required</p>
                    <p className="text-muted-foreground">Only developers with verified skills can apply.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
