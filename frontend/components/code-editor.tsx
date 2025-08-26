"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Upload, CheckCircle, XCircle, Clock, Code, FileText, TestTube } from "lucide-react"

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  passed?: boolean
  actualOutput?: string
  executionTime?: number
}

interface CodeEditorProps {
  challenge: {
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    testCases: TestCase[]
    starterCode: string
    language: string
  }
  onSubmit?: (code: string, results: TestCase[]) => void
}

export function CodeEditor({ challenge, onSubmit }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode)
  const [language, setLanguage] = useState(challenge.language)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCase[]>([])
  const [hasRun, setHasRun] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setHasRun(true)

    try {
      // Simulate test execution
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock test results - in a real app, this would execute the code
      const results = challenge.testCases.map((testCase, index) => ({
        ...testCase,
        passed: Math.random() > 0.3, // 70% pass rate for demo
        actualOutput: index === 0 ? testCase.expectedOutput : `Output ${index + 1}`,
        executionTime: Math.floor(Math.random() * 100) + 10,
      }))

      setTestResults(results)
      console.log("[v0] Test results:", results)
    } catch (error) {
      console.error("Failed to run tests:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const submitSolution = async () => {
    if (!hasRun) {
      await runTests()
    }

    setIsSubmitting(true)

    try {
      // Simulate IPFS upload and blockchain submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("[v0] Solution submitted:", { code, testResults })
      onSubmit?.(code, testResults)
    } catch (error) {
      console.error("Failed to submit solution:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const passedTests = testResults.filter((test) => test.passed).length
  const totalTests = testResults.length
  const allTestsPassed = passedTests === totalTests && totalTests > 0

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
    <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
      {/* Problem Description */}
      <div className="space-y-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{challenge.title}</CardTitle>
              <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-muted-foreground">{challenge.description}</div>
            </div>
          </CardContent>
        </Card>

        {/* Test Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Test Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="examples" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="results" disabled={!hasRun}>
                  Results {hasRun && `(${passedTests}/${totalTests})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="examples" className="space-y-4">
                {challenge.testCases.slice(0, 2).map((testCase, index) => (
                  <div key={testCase.id} className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm mb-2">Example {index + 1}:</p>
                    <div className="space-y-2 text-sm font-mono">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span>{testCase.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output: </span>
                        <span>{testCase.expectedOutput}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="results" className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={result.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Test Case {index + 1}</span>
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={result.passed ? "default" : "destructive"} className="text-xs">
                          {result.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm font-mono">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span>{result.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span>{result.expectedOutput}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual: </span>
                        <span className={result.passed ? "text-green-600" : "text-red-600"}>{result.actualOutput}</span>
                      </div>
                      {result.executionTime && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{result.executionTime}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Code Editor */}
      <div className="space-y-4">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Editor
              </CardTitle>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="solidity">Solidity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 p-4 font-mono text-sm bg-muted/20 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Write your solution here..."
                spellCheck={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={runTests} disabled={isRunning} variant="outline" className="flex-1 bg-transparent">
            {isRunning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Running Tests...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Run Test Cases
              </div>
            )}
          </Button>

          <Button onClick={submitSolution} disabled={isSubmitting || (!allTestsPassed && hasRun)} className="flex-1">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Submit Work
              </div>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {hasRun && (
          <Card>
            <CardContent className="p-4">
              {allTestsPassed ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">All tests passed! Ready to submit.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">
                    {passedTests}/{totalTests} tests passed. Fix failing tests before submitting.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submission Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Submission Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Your solution will be uploaded to IPFS for permanent storage</p>
            <p>• The client will be automatically notified of your submission</p>
            <p>• All test cases must pass before you can submit</p>
            <p>• You can resubmit if needed before the deadline</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
