"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, CheckCircle, AlertCircle } from "lucide-react"

interface WalletConnectProps {
  onConnect?: (walletType: string, address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<{
    type: string
    address: string
  } | null>(null)

  const connectWallet = async (walletType: "metamask" | "plug") => {
    setIsConnecting(true)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockAddress =
        walletType === "metamask" ? "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4" : "rdmx6-jaaaa-aaaah-qcaiq-cai"

      setConnectedWallet({ type: walletType, address: mockAddress })
      onConnect?.(walletType, mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
  }

  if (connectedWallet) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Badge variant="secondary" className="capitalize">
                  {connectedWallet.type}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Wallet className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground">Connect your wallet to access VeriChain features</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => connectWallet("metamask")}
            disabled={isConnecting}
            className="w-full justify-start gap-3"
            variant="outline"
          >
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            MetaMask
            {isConnecting && (
              <div className="ml-auto animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            )}
          </Button>

          <Button
            onClick={() => connectWallet("plug")}
            disabled={isConnecting}
            className="w-full justify-start gap-3"
            variant="outline"
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            Plug Wallet
            {isConnecting && (
              <div className="ml-auto animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            )}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Make sure you have MetaMask or Plug wallet installed in your browser
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
