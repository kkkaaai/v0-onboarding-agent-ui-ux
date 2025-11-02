"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Briefcase, Calendar } from "lucide-react"

interface EmployeeProfileProps {
  user: {
    id: string
    email: string
    name: string
    project: string
    role: string
    joinedDate: string
  }
}

export function EmployeeProfile({ user }: EmployeeProfileProps) {
  return (
    <Card className="p-6 border border-border">
      {/* Avatar */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
        <Badge className="mt-2 bg-accent/20 text-accent border-accent/30">{user.role}</Badge>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Email</p>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Mail className="w-4 h-4 text-primary" />
            <p className="text-sm text-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Project</p>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Briefcase className="w-4 h-4 text-secondary" />
            <p className="text-sm text-foreground">{user.project}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Joined</p>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-4 h-4 text-accent" />
            <p className="text-sm text-foreground">{user.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg text-center">
        <p className="text-sm font-semibold text-accent">Status: Onboarded</p>
      </div>
    </Card>
  )
}
