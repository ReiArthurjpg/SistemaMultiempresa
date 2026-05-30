export type UserRole = 'MASTER' | 'ADMIN' | 'OPERATOR';
export type CreditTransactionType = 'ADD' | 'USE' | 'REFUND' | 'TRANSFER';
export type PermissionAction = 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE' | 'EXPORT' | 'IMPORT' | 'APPROVE' | 'CANCEL' | 'RELEASE_CREDIT' | 'CONSULT' | 'GENERATE_MAILING' | 'SEND_WHATSAPP' | 'BUY_CREDITS' | 'DISTRIBUTE_CREDITS' | 'ACCESS_SETTINGS';
export interface TenantContext { companyId?: string; slug?: string; domain?: string; plan?: string; logoUrl?: string; settings?: Record<string, unknown>; }
export interface DashboardSummary { totalCompanies: number; totalUsers: number; creditsConsumed: number; creditsAvailable: number; latestLogs: Array<{ id: string; action: string; entity: string; createdAt: string }>; }
