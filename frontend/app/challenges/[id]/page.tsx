"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { CodeEditor } from "@/components/code-editor"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock challenge data
const challengeData = {
  title: "Two Sum Problem",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Constraints:**
• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists.

**Follow-up:** Can you come up with an algorithm that is less than O(n²) time complexity?`,
  difficulty: "Easy" as const,
  testCases: [
    {
      id: "1",
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
    },
    {
      id: "2",
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
    },
    {
      id: "3",
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
    },
  ],
  starterCode: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
  language: "javascript",
}

export default function ChallengePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (code: string, results: any[]) => {
    console.log("[v0] Challenge completed:", { code, results })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Solution Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your solution has been uploaded to IPFS and the client has been notified. You'll receive feedback soon.
              </p>
              <div className="space-y-3">
                <Button className="w-full">View Submission Status</Button>
                <Link href="/challenges">
                  <Button variant="outline" className="w-full bg-transparent">
                    Browse More Challenges
                  </Button>
                </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/challenges">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Button>
          </Link>
        </div>

        {/* Code Editor */}
        <CodeEditor challenge={challengeData} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
