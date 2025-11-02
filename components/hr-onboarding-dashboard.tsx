"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Users, User, Trash2 } from "lucide-react"
import { TopNav } from "./top-nav"

interface Employee {
  id: string
  name: string
  email: string
  project: string
  role: string
  addedAt: string
}

const PROJECTS = ["Project Nova", "The Aurora Design System", "Customer 360"]
const ROLES = ["Design System Intern", "Frontend Engineer Intern", "UX Designer Intern"]

export function HROnboardingDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showForm, setShowForm] = useState(true)
  const [submitted, setSubmitted] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    project: "",
    role: "",
  })

  // Fetch all employees from Supabase on component mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/employees')
      const data = await response.json()

      if (response.ok && data.success) {
        setEmployees(data.employees || [])
      } else {
        console.error('Failed to fetch employees:', data.error)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to delete employee')
        return
      }

      // Refresh the employees list
      await fetchEmployees()
      alert(`${name} has been deleted successfully.`)
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('Failed to delete employee. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.project || !formData.role) {
      alert("Please fill in all fields")
      return
    }

    try {
      // Call API to create employee in Supabase
      const response = await fetch('/api/employees/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Failed to create employee')
        return
      }

      // Build submitted employee info for success message
      const submittedEmployee: Employee = {
        id: data.employee.id,
        name: formData.name,
        email: formData.email,
        project: formData.project,
        role: formData.role,
        addedAt: data.employee.created_at ? new Date(data.employee.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
      }

      // Refresh the employees list from Supabase
      await fetchEmployees()
      
      setSubmitted(submittedEmployee)
      setFormData({ name: "", email: "", password: "", project: "", role: "" })

      setTimeout(() => {
        setShowForm(true)
        setSubmitted(null)
      }, 3000)
    } catch (error) {
      console.error('Error creating employee:', error)
      alert('Failed to create employee. Please try again.')
    }
  }

  const adminUser = {
    name: "HR Admin",
    email: "hr@raspberry-coffee.com",
    role: "HR Administrator",
  }

  const handleLogout = () => {
    // Handle logout if needed
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Top Navigation */}
      <TopNav user={adminUser} onLogout={handleLogout} />

      {/* Main Content: fixed 1280 width, 20px margins, 10px gaps */}
      <main className="max-w-[1280px] mx-auto px-[20px] py-6">
        <div className="space-y-[10px]">
          {/* Header Card */}
          <Card className="p-6 lg:p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Employee Onboarding</h3>
                <p className="text-sm text-muted-foreground mt-1">Streamline your team's integration process</p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-12 gap-[10px] items-start">
            {/* Form Section */}
            <div className="lg:col-span-5 xl:col-span-4">
              <Card className="p-6 lg:p-7 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-5">Add New Employee</h3>

                {submitted ? (
                  <div className="space-y-[10px] text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">Employee Created!</h4>
                    <p className="text-sm text-muted-foreground">{submitted.name} has been added to the system</p>
                    <div className="pt-4 space-y-[10px] text-sm">
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <span className="font-semibold text-foreground">Email:</span>
                        <p className="text-muted-foreground mt-1">{submitted.email}</p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <span className="font-semibold text-foreground">Project:</span>
                        <p className="text-muted-foreground mt-1">{submitted.project}</p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <span className="font-semibold text-foreground">Role:</span>
                        <p className="text-muted-foreground mt-1">{submitted.role}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-[10px]">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-semibold">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-input border-border"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-semibold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="bg-input border-border"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground font-semibold">
                        Temporary Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="bg-input border-border"
                      />
                    </div>

                    {/* Project */}
                    <div className="space-y-2">
                      <Label htmlFor="project" className="text-foreground font-semibold">
                        Project
                      </Label>
                      <Select value={formData.project} onValueChange={(value) => handleSelectChange("project", value)}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECTS.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-foreground font-semibold">
                        Role
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-base mt-5"
                    >
                      Create Employee Profile
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Employees List Section */}
            <div className="lg:col-span-7 xl:col-span-8">
              <Card className="p-6 lg:p-7">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Recent Employees</h3>
                  <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                    <span className="text-sm font-semibold text-primary">{employees.length} Total</span>
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Users className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <p className="text-muted-foreground">Loading employees...</p>
                  </div>
                ) : employees.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      No employees added yet. Create your first employee profile using the form.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-[10px]">
                    {employees.map((employee) => (
                      <Card key={employee.id} className="p-6 lg:p-7 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-foreground">{employee.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{employee.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full flex-shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-primary">Active</span>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              aria-label={`Delete ${employee.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] pt-5 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1.5">Project</p>
                            <p className="text-foreground font-semibold">{employee.project}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1.5">Role</p>
                            <p className="text-foreground font-semibold">{employee.role}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1.5">Added On</p>
                            <p className="text-foreground font-semibold">{employee.addedAt}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1.5">Status</p>
                            <p className="text-primary font-semibold">✓ Onboarded</p>
                          </div>
                        </div>

                        <div className="mt-5 grid sm:grid-cols-2 gap-[10px] pt-5 border-t border-border">
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">
                              <span className="font-semibold text-foreground">Slack Channels:</span>
                            </p>
                            <p className="text-sm text-foreground">#{employee.project.toLowerCase()}, #general, #random</p>
                          </div>
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">
                              <span className="font-semibold text-foreground">GitHub Access:</span>
                            </p>
                            <p className="text-sm text-foreground">{employee.project} repositories</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
