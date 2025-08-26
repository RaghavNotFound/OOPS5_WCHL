"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"

interface SkillSelectorProps {
  selectedSkills: string[]
  onSkillsChange: (skills: string[]) => void
  placeholder?: string
}

const popularSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "JavaScript",
  "Solidity",
  "Smart Contracts",
  "Web3",
  "Next.js",
  "Tailwind CSS",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
]

export function SkillSelector({ selectedSkills, onSkillsChange, placeholder = "Add skills..." }: SkillSelectorProps) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      onSkillsChange([...selectedSkills, trimmedSkill])
    }
    setInputValue("")
  }

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(selectedSkills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(inputValue)
    }
  }

  const availablePopularSkills = popularSkills.filter((skill) => !selectedSkills.includes(skill))

  return (
    <div className="space-y-4">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={() => addSkill(inputValue)}
          disabled={!inputValue.trim()}
          size="sm"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Popular Skills */}
      {availablePopularSkills.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">Popular skills:</p>
          <div className="flex flex-wrap gap-2">
            {availablePopularSkills.slice(0, 8).map((skill) => (
              <Button
                key={skill}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSkill(skill)}
                className="text-xs h-7"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
