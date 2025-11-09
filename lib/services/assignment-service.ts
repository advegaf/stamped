/**
 * Assignment Service
 * Maps clients/vendors to their assigned compliance officers and other employees
 */

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: 'compliance_officer' | 'relationship_manager' | 'risk_analyst' | 'executive'
}

interface Assignment {
  clientId?: string
  vendorId?: string
  complianceOfficerId: string
  relationshipManagerId?: string
  assignedAt: string
}

class AssignmentService {
  private employees: Employee[] = [
    {
      id: 'emp-001',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@stamped.com',
      phone: '+1 (555) 0123',
      role: 'compliance_officer',
    },
    {
      id: 'emp-002',
      name: 'Michael Chen',
      email: 'michael.chen@stamped.com',
      phone: '+1 (555) 0124',
      role: 'compliance_officer',
    },
    {
      id: 'emp-003',
      name: 'Rachel Chen',
      email: 'rachel.chen@stamped.com',
      phone: '+1 (555) 0145',
      role: 'compliance_officer',
    },
    {
      id: 'emp-004',
      name: 'David Rodriguez',
      email: 'david.rodriguez@stamped.com',
      phone: '+1 (555) 0125',
      role: 'relationship_manager',
    },
    {
      id: 'emp-005',
      name: 'Emily Thompson',
      email: 'emily.thompson@stamped.com',
      phone: '+1 (555) 0126',
      role: 'risk_analyst',
    },
    {
      id: 'emp-006',
      name: 'James Anderson',
      email: 'james.anderson@stamped.com',
      phone: '+1 (555) 0127',
      role: 'executive',
    },
  ]

  private assignments: Assignment[] = [
    // Client assignments
    {
      clientId: 'client-1',
      complianceOfficerId: 'emp-001',
      relationshipManagerId: 'emp-004',
      assignedAt: '2024-01-10',
    },
    {
      clientId: 'client-2',
      complianceOfficerId: 'emp-002',
      relationshipManagerId: 'emp-004',
      assignedAt: '2024-01-12',
    },
    // Vendor assignments
    {
      vendorId: 'vendor-1',
      complianceOfficerId: 'emp-003',
      assignedAt: '2024-01-15',
    },
    {
      vendorId: 'vendor-2',
      complianceOfficerId: 'emp-001',
      assignedAt: '2024-01-16',
    },
  ]

  /**
   * Get assigned compliance officer for a client
   */
  async getAssignedComplianceOfficer(clientId: string): Promise<Employee | null> {
    await this.simulateDelay()

    const assignment = this.assignments.find(a => a.clientId === clientId)
    if (!assignment) return null

    const officer = this.employees.find(e => e.id === assignment.complianceOfficerId)
    return officer || null
  }

  /**
   * Get assigned compliance officer for a vendor
   */
  async getAssignedComplianceOfficerForVendor(vendorId: string): Promise<Employee | null> {
    await this.simulateDelay()

    const assignment = this.assignments.find(a => a.vendorId === vendorId)
    if (!assignment) return null

    const officer = this.employees.find(e => e.id === assignment.complianceOfficerId)
    return officer || null
  }

  /**
   * Get assigned officer (any type) for client/vendor
   */
  async getAssignedOfficer(entityId: string, entityType: 'client' | 'vendor' = 'client'): Promise<Employee | null> {
    await this.simulateDelay()

    const assignment = entityType === 'client' 
      ? this.assignments.find(a => a.clientId === entityId)
      : this.assignments.find(a => a.vendorId === entityId)

    if (!assignment) return null

    // Return compliance officer as primary contact
    const officer = this.employees.find(e => e.id === assignment.complianceOfficerId)
    return officer || null
  }

  /**
   * Get all employees by role
   */
  async getOfficersByRole(role: Employee['role']): Promise<Employee[]> {
    await this.simulateDelay()
    return this.employees.filter(e => e.role === role)
  }

  /**
   * Get all compliance officers
   */
  async getAllComplianceOfficers(): Promise<Employee[]> {
    return this.getOfficersByRole('compliance_officer')
  }

  /**
   * Get employee by ID
   */
  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    await this.simulateDelay()
    return this.employees.find(e => e.id === employeeId) || null
  }

  /**
   * Assign a compliance officer to a client
   */
  async assignOfficerToClient(clientId: string, officerId: string): Promise<void> {
    await this.simulateDelay()

    const existingIndex = this.assignments.findIndex(a => a.clientId === clientId)
    const assignment: Assignment = {
      clientId,
      complianceOfficerId: officerId,
      assignedAt: new Date().toISOString().split('T')[0],
    }

    if (existingIndex >= 0) {
      this.assignments[existingIndex] = assignment
    } else {
      this.assignments.push(assignment)
    }
  }

  /**
   * Assign a compliance officer to a vendor
   */
  async assignOfficerToVendor(vendorId: string, officerId: string): Promise<void> {
    await this.simulateDelay()

    const existingIndex = this.assignments.findIndex(a => a.vendorId === vendorId)
    const assignment: Assignment = {
      vendorId,
      complianceOfficerId: officerId,
      assignedAt: new Date().toISOString().split('T')[0],
    }

    if (existingIndex >= 0) {
      this.assignments[existingIndex] = assignment
    } else {
      this.assignments.push(assignment)
    }
  }

  /**
   * Get all assignments for an employee
   */
  async getAssignmentsForEmployee(employeeId: string): Promise<Assignment[]> {
    await this.simulateDelay()
    return this.assignments.filter(
      a => a.complianceOfficerId === employeeId || a.relationshipManagerId === employeeId
    )
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100))
  }
}

// Singleton instance
export const assignmentService = new AssignmentService()

