import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Sparkles,
  CreditCard,
  UserPlus,
  PackageCheck,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'

export const stats = [
  { title: 'Total revenue', value: '$48,574.00', change: '+18.2%', up: true, icon: DollarSign },
  { title: 'Active customers', value: '2,420', change: '+12.5%', up: true, icon: Users },
  { title: 'New orders', value: '1,264', change: '+8.4%', up: true, icon: ShoppingCart },
  { title: 'Conversion rate', value: '6.84%', change: '-2.1%', up: false, icon: TrendingUp },
]

export const initialOrders = [
  {
    id: 'ORD-1048',
    customer: 'Olivia Martin',
    email: 'olivia@acme.co',
    amount: 1240,
    status: 'Paid',
    date: 'Today, 10:42 AM',
  },
  {
    id: 'ORD-1047',
    customer: 'Jackson Lee',
    email: 'jackson@north.co',
    amount: 860,
    status: 'Paid',
    date: 'Today, 09:18 AM',
  },
  {
    id: 'ORD-1046',
    customer: 'Isabella Nguyen',
    email: 'isabella@studio.io',
    amount: 2450,
    status: 'Pending',
    date: 'Yesterday, 04:32 PM',
  },
  {
    id: 'ORD-1045',
    customer: 'William Kim',
    email: 'william@pixel.co',
    amount: 540,
    status: 'Paid',
    date: 'Yesterday, 01:09 PM',
  },
  {
    id: 'ORD-1044',
    customer: 'Riya Sharma',
    email: 'riya@bluepeak.in',
    amount: 1790,
    status: 'Pending',
    date: '01 Oct, 11:20 AM',
  },
  {
    id: 'ORD-1043',
    customer: 'Arjun Mehta',
    email: 'arjun@kiteworks.in',
    amount: 320,
    status: 'Cancelled',
    date: '30 Sep, 05:45 PM',
  },
  {
    id: 'ORD-1042',
    customer: 'Sana Khan',
    email: 'sana@lumen.app',
    amount: 980,
    status: 'Paid',
    date: '30 Sep, 02:10 PM',
  },
  {
    id: 'ORD-1041',
    customer: 'Karan Singh',
    email: 'karan@fieldly.io',
    amount: 1520,
    status: 'Paid',
    date: '29 Sep, 10:05 AM',
  },
]

export const activities = [
  {
    icon: Sparkles,
    tone: 'bg-violet-100 text-violet-600',
    title: 'New subscription',
    sub: 'Pro plan · 12 seats',
    time: '12 min ago',
  },
  {
    icon: CreditCard,
    tone: 'bg-emerald-100 text-emerald-600',
    title: 'Invoice paid',
    sub: 'Invoice #INV-2048',
    time: '48 min ago',
  },
  {
    icon: UserPlus,
    tone: 'bg-blue-100 text-blue-600',
    title: 'New team member',
    sub: 'Maya joined Design',
    time: '2 hrs ago',
  },
  {
    icon: PackageCheck,
    tone: 'bg-amber-100 text-amber-600',
    title: 'Order shipped',
    sub: 'Order #ORD-1044',
    time: '5 hrs ago',
  },
  {
    icon: MessageSquare,
    tone: 'bg-pink-100 text-pink-600',
    title: 'New review',
    sub: 'Riya Sharma left 5 stars',
    time: 'Yesterday',
  },
  {
    icon: ShieldCheck,
    tone: 'bg-slate-200 text-slate-600',
    title: 'Security check passed',
    sub: 'No issues found',
    time: 'Yesterday',
  },
]

export const initialNotifications = [
  { id: 1, text: 'New order #ORD-1048 received', time: '5 min ago', read: false },
  { id: 2, text: 'Riya Sharma left a 5-star review', time: '1 hr ago', read: false },
  { id: 3, text: 'Monthly report is ready to download', time: '3 hrs ago', read: false },
  { id: 4, text: 'Server backup completed', time: 'Yesterday', read: true },
]

export const revenueRanges = {
  'This year': {
    change: '+18.2%',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [2400, 3100, 2800, 3900, 4400, 4900],
  },
  'Last year': {
    change: '+9.6%',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [1800, 2200, 2600, 2400, 3100, 3500],
  },
  'Last 30 days': {
    change: '+6.1%',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [1200, 1650, 1500, 2100],
  },
}

export const initialInvoices = [
  {
    id: 'INV-2048',
    customer: 'Olivia Martin',
    issued: '02 Oct 2026',
    due: '16 Oct 2026',
    amount: 1240,
    status: 'Paid',
  },
  {
    id: 'INV-2047',
    customer: 'Jackson Lee',
    issued: '28 Sep 2026',
    due: '12 Oct 2026',
    amount: 860,
    status: 'Pending',
  },
  {
    id: 'INV-2046',
    customer: 'Isabella Nguyen',
    issued: '20 Sep 2026',
    due: '04 Oct 2026',
    amount: 2450,
    status: 'Pending',
  },
  {
    id: 'INV-2045',
    customer: 'William Kim',
    issued: '10 Sep 2026',
    due: '24 Sep 2026',
    amount: 540,
    status: 'Overdue',
  },
  {
    id: 'INV-2044',
    customer: 'Riya Sharma',
    issued: '02 Sep 2026',
    due: '16 Sep 2026',
    amount: 1790,
    status: 'Paid',
  },
  {
    id: 'INV-2043',
    customer: 'Sana Khan',
    issued: '25 Aug 2026',
    due: '08 Sep 2026',
    amount: 980,
    status: 'Paid',
  },
]

export const initialTransactions = [
  { id: 1, title: 'Payment from Olivia Martin', date: 'Today, 10:42 AM', amount: 1240 },
  { id: 2, title: 'Withdrawal to bank', date: 'Yesterday', amount: -2000 },
  { id: 3, title: 'Payment from Jackson Lee', date: 'Yesterday', amount: 860 },
  { id: 4, title: 'Subscription fee', date: '29 Sep', amount: -29 },
]
