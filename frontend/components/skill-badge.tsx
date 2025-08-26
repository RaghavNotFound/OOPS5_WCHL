import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Calendar } from "lucide-react"

interface SkillBadgeProps {
  skill: {
    id: string
    name: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    verifiedDate: string
    category: string
    score?: number
  }
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Expert":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-sm">{skill.name}</h3>
          </div>
          {skill.score && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{skill.score}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Badge variant="outline" className={`text-xs ${getLevelColor(skill.level)}`}>
            {skill.level}
          </Badge>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Verified {skill.verifiedDate}</span>
          </div>

          <Badge variant="secondary" className="text-xs">
            {skill.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
