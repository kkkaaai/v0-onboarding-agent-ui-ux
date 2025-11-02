import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceSupabase()

    // Fetch all employees from Supabase
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch employees' },
        { status: 500 }
      )
    }

    // Transform the data to match the component's expected format
    const employees = data?.map((emp) => ({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      project: emp.project,
      role: emp.role,
      addedAt: emp.created_at ? new Date(emp.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
    })) || []

    return NextResponse.json({
      success: true,
      employees,
    })

  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

