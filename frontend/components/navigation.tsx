"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { Home, Briefcase, Plus, User, Menu, X, DollarSign, Code } from "lucide-react"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<{
    type: string
    address: string
  } | null>(null)

  const handleWalletConnect = (walletType: string, address: string) => {
    setConnectedWallet({ type: walletType, address })
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/challenges", label: "Challenges", icon: Code },
    { href: "/post-job", label: "Post Job", icon: Plus },
    { href: "/payments", label: "Payments", icon: DollarSign },
  ]

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">VC</span>
              </div>
              <span className="font-bold text-xl text-foreground">VeriChain</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:block">
            {connectedWallet ? (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Connected: </span>
                  <span className="font-mono text-xs">
                    {connectedWallet.address.slice(0, 6)}...{connectedWallet.address.slice(-4)}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  {connectedWallet.type === "metamask" ? "MetaMask" : "Plug"}
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsMobileMenuOpen(true)}>Connect Wallet</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-4">
                <WalletConnect onConnect={handleWalletConnect} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Wallet Modal */}
      {isMobileMenuOpen && !connectedWallet && (
        <div className="hidden md:block fixed inset-0 bg-black/50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div onClick={(e) => e.stopPropagation()}>
              <WalletConnect
                onConnect={(type, address) => {
                  handleWalletConnect(type, address)
                  setIsMobileMenuOpen(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    <a href="https://identity.internetcomputer.org/" target="_blank" rel="noopener noreferrer">Login</a></nav>
  )
}
