"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EscrowCard } from "@/components/escrow-card"
import { PaymentModal } from "@/components/payment-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Shield, Clock, TrendingUp, Filter } from "lucide-react"

export default function PaymentsPage() {
  const [userRole] = useState<"client" | "developer">("client") // In real app, this would come from user context
  const [selectedEscrow, setSelectedEscrow] = useState<any>(null)
  const [modalAction, setModalAction] = useState<"approve" | "dispute" | "release" | "details">("details")

  // Mock escrow data
  const escrows = [
    {
      id: "ESC-001",
      jobTitle: "Frontend React Developer",
      amount: "$2,500",
      status: "completed" as const,
      client: "TechCorp",
      developer: "john.eth",
      createdDate: "Jan 15, 2025",
      deadline: "Jan 25, 2025",
      description: "Build a modern dashboard interface with React and TypeScript.",
      milestones: [
        { id: "1", description: "Component Setup", amount: "$800", status: "approved" as const },
        { id: "2", description: "API Integration", amount: "$900", status: "approved" as const },
        { id: "3", description: "Final Testing", amount: "$800", status: "completed" as const },
      ],
    },
    {
      id: "ESC-002",
      jobTitle: "Smart Contract Audit",
      amount: "$5,000",
      status: "in-progress" as const,
      client: "DeFi Protocol",
      developer: "alice.eth",
      createdDate: "Jan 10, 2025",
      deadline: "Jan 20, 2025",
      description: "Security audit of DeFi smart contracts.",
    },
    {
      id: "ESC-003",
      jobTitle: "Mobile App Development",
      amount: "$3,800",
      status: "pending" as const,
      client: "AppCo",
      developer: "bob.eth",
      createdDate: "Jan 18, 2025",
      deadline: "Feb 15, 2025",
      description: "Cross-platform mobile app with React Native.",
    },
    {
      id: "ESC-004",
      jobTitle: "Database Optimization",
      amount: "$1,200",
      status: "disputed" as const,
      client: "DataCorp",
      developer: "charlie.eth",
      createdDate: "Jan 5, 2025",
      deadline: "Jan 12, 2025",
      description: "Optimize database queries for better performance.",
    },
  ]

  const stats = {
    totalEscrow: "$12,500",
    activeEscrows: 3,
    completedPayments: 15,
    averageRating: 4.8,
  }

  const handleEscrowAction = (action: string, escrowId: string) => {
    const escrow = escrows.find((e) => e.id === escrowId)
    if (escrow) {
      setSelectedEscrow(escrow)
      setModalAction(action as any)
    }
  }

  const activeEscrows = escrows.filter((e) => e.status !== "released")
  const completedEscrows = escrows.filter((e) => e.status === "released")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Management</h1>
          <p className="text-muted-foreground">Manage escrow payments and track transaction history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total in Escrow</p>
                  <p className="text-xl font-bold">{stats.totalEscrow}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Escrows</p>
                  <p className="text-xl font-bold">{stats.activeEscrows}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold">{stats.completedPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-xl font-bold">{stats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount-high">Highest Amount</SelectItem>
              <SelectItem value="amount-low">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Escrow Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Escrows ({activeEscrows.length})</TabsTrigger>
            <TabsTrigger value="completed">Payment History ({completedEscrows.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeEscrows.length > 0 ? (
              <div className="grid gap-6">
                {activeEscrows.map((escrow) => (
                  <EscrowCard key={escrow.id} escrow={escrow} userRole={userRole} onAction={handleEscrowAction} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Escrows</h3>
                  <p className="text-muted-foreground">You don't have any active escrow payments at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payment History</h3>
                <p className="text-muted-foreground">Your completed payment history will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Modal */}
      {selectedEscrow && (
        <PaymentModal action={modalAction} escrow={selectedEscrow}>
          <div />
        </PaymentModal>
      )}
    </div>
  )
}
