"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

export interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
}

interface OnboardingChecklistProps {
  items: ChecklistItem[]
  onToggle: (id: string) => void
}

export function OnboardingChecklist({ items, onToggle }: OnboardingChecklistProps) {
  const handleToggle = (id: string) => {
    onToggle(id)
  }

  return (
    <Card className="p-6 lg:p-7">
      <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
        Onboarding Checklist
      </h3>

      {/* Checklist Items */}
      <div className="space-y-[10px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all cursor-pointer border border-transparent hover:border-primary/20"
            onClick={() => handleToggle(item.id)}
          >
            {/* Checkbox */}
            <div className="mt-0.5 flex-shrink-0">
              {item.completed ? (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={`font-semibold mb-1 ${item.completed ? "text-primary/70 line-through" : "text-foreground"}`}
              >
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
