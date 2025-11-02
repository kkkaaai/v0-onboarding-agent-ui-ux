"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: any) => void
  onAdminAccess: () => void
}

export function LoginForm({ onLogin, onAdminAccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    try {
      // Call authentication API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid email or password')
        return
      }

      // Login successful, pass user data to parent
      onLogin(data.user)
    } catch (error) {
      console.error('Login error:', error)
      setError('Failed to login. Please try again.')
    }
  }

  const handleAdminClick = () => {
    setEmail("")
    setPassword("")
    onAdminAccess()
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] space-y-6">
        <Card className="border border-primary/10 bg-white/80 backdrop-blur rounded-[24px]">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-semibold text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to continue your onboarding journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="h-12 rounded-xl border-primary/10 bg-white/70 focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 rounded-xl border-primary/10 bg-white/70 focus-visible:ring-primary/30"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-none transition hover:bg-primary/90"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-center">
            <p className="text-sm text-muted-foreground">Are you an HR admin?</p>
            <Button
              type="button"
              onClick={handleAdminClick}
              variant="outline"
              className="h-11 w-full rounded-xl border-primary/20 text-primary hover:bg-primary/10"
            >
              Go to admin dashboard
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-[24px] border-none bg-primary/10 text-primary">
          <CardHeader className="space-y-2">
            <CardTitle className="text-base font-semibold text-primary/90">Demo credentials</CardTitle>
            <CardDescription className="text-sm text-primary/70">
              Use these details while testing the portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2">
              <span className="font-medium">Email</span>
              <code className="rounded bg-white px-2 py-1 text-xs text-primary">john@company.com</code>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2">
              <span className="font-medium">Password</span>
              <code className="rounded bg-white px-2 py-1 text-xs text-primary">12345</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
