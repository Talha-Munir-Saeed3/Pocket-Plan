export interface MetricsData {
  activeUsers: number;
  mrr: number;
  totalRevenue: number;
  conversionRate: number;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  method: string;
  description?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  messages?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive" | "suspended";
  subscriptionPlan: "free" | "monthly" | "yearly";
  joinedAt: string;
}
