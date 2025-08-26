import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Briefcase } from "lucide-react"

export default function JobsPage() {
  // Mock jobs data
  const jobs = [
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
    {
      id: "3",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      budget: "$4,200",
      duration: "3 weeks",
      location: "Remote",
      skills: ["Node.js", "React", "PostgreSQL", "AWS"],
      applicants: 15,
      postedDate: "3 days ago",
      description:
        "Build a complete web application from backend APIs to frontend interface. Experience with cloud deployment required.",
    },
    {
      id: "4",
      title: "Mobile App Developer",
      company: "AppCo",
      budget: "$3,800",
      duration: "4 weeks",
      location: "Remote",
      skills: ["React Native", "TypeScript", "Mobile UI"],
      applicants: 9,
      postedDate: "1 week ago",
      description:
        "Develop a cross-platform mobile application with React Native. Focus on performance and user experience.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Jobs</h1>
          <p className="text-muted-foreground">Find opportunities that match your verified skills</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                <SelectItem value="5000+">$5,000+</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              React
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              TypeScript
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              Node.js
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              Solidity
            </Badge>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Showing {jobs.length} jobs</p>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="budget-high">Highest Budget</SelectItem>
                <SelectItem value="budget-low">Lowest Budget</SelectItem>
                <SelectItem value="match">Best Match</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-transparent">
            <Briefcase className="h-4 w-4 mr-2" />
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}
