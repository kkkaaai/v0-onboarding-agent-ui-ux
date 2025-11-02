"use client"

import { useState } from "react"
import { HROnboardingDashboard } from "@/components/hr-onboarding-dashboard"
import { EmployeePortal } from "@/components/employee-portal"

export default function Home() {
  const [userRole, setUserRole] = useState<"admin" | "employee" | null>(null)

  if (userRole === "admin") {
    return (
      <main className="min-h-screen bg-transparent">
        <HROnboardingDashboard />
      </main>
    )
  }

  return <EmployeePortal onRoleChange={setUserRole} />
}
