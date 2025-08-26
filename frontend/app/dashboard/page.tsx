import { Navigation } from "@/components/navigation"
import { SkillBadge } from "@/components/skill-badge"
import { JobCard } from "@/components/job-card"
import { SubmissionCard } from "@/components/submission-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award, Briefcase, Clock, Plus, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your backend/blockchain
  const userSkills = [
    {
      id: "1",
      name: "React Development",
      level: "Advanced" as const,
      verifiedDate: "Dec 2024",
      category: "Frontend",
      score: 95,
    },
    {
      id: "2",
      name: "TypeScript",
      level: "Expert" as const,
      verifiedDate: "Nov 2024",
      category: "Programming",
      score: 98,
    },
    {
      id: "3",
      name: "Smart Contracts",
      level: "Intermediate" as const,
      verifiedDate: "Jan 2025",
      category: "Blockchain",
      score: 87,
    },
    {
      id: "4",
      name: "Node.js",
      level: "Advanced" as const,
      verifiedDate: "Oct 2024",
      category: "Backend",
      score: 92,
    },
  ]

  const recommendedJobs = [
    {
      id: "1",
      title: "Frontend React Developer",
      company: "TechCorp",
      budget: "$2,500",
      duration: "2 weeks",
      location: "Remote",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      applicants: 12,
      postedDate: "2 days ago",
      description:
        "Build a modern dashboard interface with React and TypeScript. Must have experience with component libraries and responsive design.",
    },
    {
      id: "2",
      title: "Smart Contract Audit",
      company: "DeFi Protocol",
      budget: "$5,000",
      duration: "1 week",
      location: "Remote",
      skills: ["Solidity", "Security", "Testing"],
      applicants: 8,
      postedDate: "1 day ago",
      description:
        "Review and audit smart contracts for security vulnerabilities. Experience with DeFi protocols preferred.",
    },
  ]

  const ongoingSubmissions = [
    {
      id: "1",
      jobTitle: "E-commerce API Development",
      company: "ShopFlow",
      submittedDate: "Jan 15, 2025",
      status: "in-review" as const,
      payment: "$3,200",
      deadline: "Jan 25, 2025",
    },
    {
      id: "2",
      jobTitle: "Mobile App UI Design",
      company: "StartupXYZ",
      submittedDate: "Jan 10, 2025",
      status: "approved" as const,
      payment: "$1,800",
      deadline: "Jan 20, 2025",
    },
  ]

  const stats = {
    totalEarnings: "$12,450",
    completedJobs: 23,
    skillBadges: userSkills.length,
    successRate: 96,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and discover new opportunities</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-xl font-bold">{stats.totalEarnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <p className="text-xl font-bold">{stats.completedJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skill Badges</p>
                  <p className="text-xl font-bold">{stats.skillBadges}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xl font-bold">{stats.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Verified Skills */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Verified Skills</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Earn New Badge
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {userSkills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} />
                ))}
              </div>
            </section>

            {/* Recommended Jobs */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Ongoing Submissions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Ongoing Submissions</h2>
                <Badge variant="secondary">{ongoingSubmissions.length}</Badge>
              </div>

              <div className="space-y-4">
                {ongoingSubmissions.map((submission) => (
                  <SubmissionCard key={submission.id} submission={submission} />
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Take Skill Assessment
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Browse All Jobs
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Earned TypeScript Expert badge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Applied to Frontend Developer role</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Completed Smart Contract challenge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Received payment for API project</span>
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
