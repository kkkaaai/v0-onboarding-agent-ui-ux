"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slack, Github, CheckCircle2, AlertCircle } from "lucide-react"

interface IntegrationStatus {
  name: string
  icon: React.ReactNode
  status: "connected" | "pending" | "failed"
  details: string[]
}

export function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: "Slack",
      icon: <Slack className="w-5 h-5" />,
      status: "connected",
      details: [
        "✓ Added to #frontend channel",
        "✓ Added to #general channel",
        "✓ Added to #random channel",
        "✓ Display name configured",
      ],
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      status: "connected",
      details: [
        "✓ Access granted to frontend-app repository",
        "✓ Added to Frontend team",
        "✓ SSH key configured",
        "✓ Invite accepted",
      ],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-accent/20 text-accent border-accent/30"
      case "pending":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30"
      case "failed":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Connected Services</h3>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">{integration.icon}</div>
                <div>
                  <h4 className="text-base font-semibold text-foreground">{integration.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Onboarding Integration</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(integration.status)} flex items-center gap-1`}>
                {getStatusIcon(integration.status)}
                {integration.status === "connected" && "Connected"}
                {integration.status === "pending" && "Pending"}
                {integration.status === "failed" && "Failed"}
              </Badge>
            </div>

            {/* Integration Details */}
            <div className="space-y-2">
              {integration.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            {integration.status === "connected" && (
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button size="sm" variant="outline" className="border-border flex-1 bg-transparent">
                  View in {integration.name}
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                  Disconnect
                </Button>
              </div>
            )}

            {integration.status === "pending" && (
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button size="sm" variant="outline" className="border-border flex-1 bg-transparent">
                  Complete Setup
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Integration Status Summary */}
      <Card className="p-6 border border-border bg-accent/5">
        <h4 className="font-semibold text-foreground mb-3">Onboarding Status</h4>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-accent">2 of 2</span> integrations completed
          </p>
          <p className="text-muted-foreground">Your access to all team tools has been configured and activated.</p>
          <p className="text-muted-foreground mt-3 text-xs">
            If you experience any issues accessing these services, please contact IT support at it-support@company.com.
          </p>
        </div>
      </Card>
    </div>
  )
}
