import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface SkillMatchIndicatorProps {
  requiredSkills: string[]
  userSkills: Array<{
    name: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    verified: boolean
  }>
}

export function SkillMatchIndicator({ requiredSkills, userSkills }: SkillMatchIndicatorProps) {
  const getSkillMatch = (requiredSkill: string) => {
    const userSkill = userSkills.find((skill) => skill.name.toLowerCase() === requiredSkill.toLowerCase())

    if (!userSkill) {
      return { status: "missing", skill: null }
    }

    if (!userSkill.verified) {
      return { status: "unverified", skill: userSkill }
    }

    return { status: "verified", skill: userSkill }
  }

  const matchedSkills = requiredSkills.map((skill) => ({
    name: skill,
    match: getSkillMatch(skill),
  }))

  const verifiedCount = matchedSkills.filter((s) => s.match.status === "verified").length
  const matchPercentage = Math.round((verifiedCount / requiredSkills.length) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Skill Match</h3>
        <Badge variant={matchPercentage >= 80 ? "default" : matchPercentage >= 50 ? "secondary" : "destructive"}>
          {matchPercentage}% Match
        </Badge>
      </div>

      <div className="space-y-2">
        {matchedSkills.map((skillMatch) => (
          <div key={skillMatch.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              {skillMatch.match.status === "verified" && <CheckCircle className="h-4 w-4 text-green-500" />}
              {skillMatch.match.status === "unverified" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
              {skillMatch.match.status === "missing" && <XCircle className="h-4 w-4 text-red-500" />}
              <span className="text-sm font-medium">{skillMatch.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {skillMatch.match.skill && (
                <Badge variant="outline" className="text-xs">
                  {skillMatch.match.skill.level}
                </Badge>
              )}
              <Badge
                variant={
                  skillMatch.match.status === "verified"
                    ? "default"
                    : skillMatch.match.status === "unverified"
                      ? "secondary"
                      : "destructive"
                }
                className="text-xs"
              >
                {skillMatch.match.status === "verified" && "Verified"}
                {skillMatch.match.status === "unverified" && "Unverified"}
                {skillMatch.match.status === "missing" && "Missing"}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {matchPercentage < 80 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> Complete skill assessments to improve your match percentage and increase your chances
            of getting hired.
          </p>
        </div>
      )}
    </div>
  )
}
