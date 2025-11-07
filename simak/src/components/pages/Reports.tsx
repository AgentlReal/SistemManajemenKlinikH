import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const patientVisitsData = [
  { month: "Jan", visits: 245, newPatients: 45 },
  { month: "Feb", visits: 298, newPatients: 52 },
  { month: "Mar", visits: 312, newPatients: 61 },
  { month: "Apr", visits: 289, newPatients: 48 },
  { month: "May", visits: 335, newPatients: 58 },
  { month: "Jun", visits: 378, newPatients: 72 },
  { month: "Jul", visits: 402, newPatients: 68 },
  { month: "Aug", visits: 425, newPatients: 75 },
  { month: "Sep", visits: 398, newPatients: 63 },
  { month: "Oct", visits: 445, newPatients: 82 },
];

const financialData = [
  { month: "Jan", revenue: 42000000 },
  { month: "Feb", revenue: 48500000 },
  { month: "Mar", revenue: 52000000 },
  { month: "Apr", revenue: 45000000 },
  { month: "May", revenue: 58000000 },
  { month: "Jun", revenue: 62000000 },
  { month: "Jul", revenue: 68000000 },
  { month: "Aug", revenue: 72000000 },
  { month: "Sep", revenue: 65000000 },
  { month: "Oct", revenue: 75000000 },
];

const departmentData = [
  { department: "General", patients: 450 },
  { department: "Cardiology", patients: 280 },
  { department: "Pediatrics", patients: 320 },
  { department: "Orthopedics", patients: 190 },
  { department: "Dermatology", patients: 220 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Laporan Keuangan dan Kunjungan Pasien</h1>
          <p className="text-muted-foreground mt-1">
            Lihat laporan keuangan dan kunjungan pasien
          </p>
        </div>
        {/* <div className="flex gap-3">
          <Select defaultValue="2025">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div> */}
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Visits (YTD)
                </p>
                <h2 className="mt-2">3,527</h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+18.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  New Patients (YTD)
                </p>
                <h2 className="mt-2">624</h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+24.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue (YTD)</p>
                <h2 className="mt-2">Rp 588M</h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+22.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg. Daily Visits
                </p>
                <h2 className="mt-2">42</h2>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Patient Visits Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Kunjungan Pasien</CardTitle>
          <p className="text-sm text-muted-foreground">
            Kunjungan pasien bulanan
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={patientVisitsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#059669"
                strokeWidth={3}
                name="Kunjungan"
                dot={{ fill: "#059669", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="newPatients"
                stroke="#10B981"
                strokeWidth={3}
                name="Pasien Baru"
                dot={{ fill: "#10B981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Report */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Pendapatan</CardTitle>
          <p className="text-sm text-muted-foreground">
            Revenue vs Expenses comparison
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis
                stroke="#6B7280"
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#059669"
                name="Pendapatan"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
