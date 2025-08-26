import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Code, Trophy, Clock, Users } from "lucide-react"

export default function ChallengesPage() {
  // Mock challenges data
  const challenges = [
    {
      id: "1",
      title: "Two Sum Problem",
      difficulty: "Easy",
      category: "Arrays",
      completionRate: 85,
      timeLimit: "30 min",
      participants: 1247,
      description: "Find two numbers in an array that add up to a target sum.",
      skills: ["JavaScript", "Algorithms", "Problem Solving"],
    },
    {
      id: "2",
      title: "Smart Contract Security Audit",
      difficulty: "Hard",
      category: "Blockchain",
      completionRate: 23,
      timeLimit: "2 hours",
      participants: 89,
      description: "Identify and fix security vulnerabilities in a DeFi smart contract.",
      skills: ["Solidity", "Security", "DeFi"],
    },
    {
      id: "3",
      title: "React Component Optimization",
      difficulty: "Medium",
      category: "Frontend",
      completionRate: 67,
      timeLimit: "45 min",
      participants: 543,
      description: "Optimize a React component for better performance and user experience.",
      skills: ["React", "Performance", "TypeScript"],
    },
    {
      id: "4",
      title: "API Rate Limiting",
      difficulty: "Medium",
      category: "Backend",
      completionRate: 72,
      timeLimit: "1 hour",
      participants: 321,
      description: "Implement rate limiting for a REST API with Redis caching.",
      skills: ["Node.js", "Redis", "API Design"],
    },
    {
      id: "5",
      title: "Binary Tree Traversal",
      difficulty: "Easy",
      category: "Data Structures",
      completionRate: 78,
      timeLimit: "25 min",
      participants: 892,
      description: "Implement different methods to traverse a binary tree structure.",
      skills: ["Algorithms", "Data Structures", "Recursion"],
    },
    {
      id: "6",
      title: "Database Query Optimization",
      difficulty: "Hard",
      category: "Database",
      completionRate: 34,
      timeLimit: "90 min",
      participants: 156,
      description: "Optimize complex SQL queries for better performance on large datasets.",
      skills: ["SQL", "Database", "Performance"],
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Coding Challenges</h1>
          <p className="text-muted-foreground">
            Solve challenges to earn verified skill badges and improve your ranking
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Code className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-muted-foreground">Challenges</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.2h</p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">#247</p>
              <p className="text-sm text-muted-foreground">Global Rank</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search challenges..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="database">Database</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg line-clamp-2">{challenge.title}</CardTitle>
                  <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {challenge.category}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>

                <div className="flex flex-wrap gap-1">
                  {challenge.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {challenge.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{challenge.skills.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Success Rate:</span>
                    <p className="font-medium">{challenge.completionRate}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time Limit:</span>
                    <p className="font-medium">{challenge.timeLimit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants.toLocaleString()} participants</span>
                </div>

                <Link href={`/challenges/${challenge.id}`}>
                  <Button className="w-full">Start Challenge</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-transparent">
            Load More Challenges
          </Button>
        </div>
      </div>
    </div>
  )
}
