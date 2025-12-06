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

import apiFetch from "@/lib/api";
import { fetchAllTransactionsAPI } from "@/services/transactionServices";
import type {
  BackendQueueResponse,
  QueueStatus,
  ViewTransactionClient,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function Reports() {
  const [currentYearTransaction, setCurrentYearTransaction] = useState(2025);
  const [currentYearVisit, setCurrentYearVisit] = useState(2025);
  const [years, setYears] = useState<Number[]>([]);

  const { data: transactions = [] } = useQuery<ViewTransactionClient[]>({
    queryKey: ["transactions"],
    queryFn: fetchAllTransactionsAPI,
  });
  const { data: visits = [] } = useQuery<
    {
      tanggal: Date;
      keterangan: QueueStatus;
    }[]
  >({
    queryKey: ["visits"],
    queryFn: async () => {
      const response = await apiFetch("/antrian-lengkap");
      return (response.data as BackendQueueResponse[]).map((d) => ({
        tanggal: new Date(d.tanggal),
        keterangan: d.keterangan,
      }));
    },
  });

  useEffect(() => {
    let tempYears = [
      ...transactions.map((t) => t.tanggal_transaksi.getFullYear()),
    ];
    tempYears.push(new Date().getFullYear());
    tempYears = [...new Set([...tempYears])];
    tempYears.sort((a, b) => b - a);
    setYears(() => tempYears);
    setCurrentYearTransaction(() => tempYears[0]);
    setCurrentYearVisit(() => tempYears[0]);
  }, []);

  const patientVisitsData = [
    {
      month: "Jan",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 0
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Feb",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 1
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Mar",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 2
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Apr",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 3
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Mei",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 4
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Jun",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 5
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Jul",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 6
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Agt",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 7
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Sep",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 8
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Okt",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 9
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Nov",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 10
        )
        .reduce((sum) => sum + 1, 0),
    },
    {
      month: "Des",
      visits: visits
        .filter(
          (v) =>
            v.tanggal.getFullYear() === currentYearVisit &&
            v.tanggal.getMonth() === 11
        )
        .reduce((sum) => sum + 1, 0),
    },
  ];

  const financialData = [
    {
      month: "Jan",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 0
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Feb",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 1
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Mar",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 2
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Apr",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 3
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Mei",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 4
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Jun",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 5
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Jul",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 6
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Agt",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 7
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Sep",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 8
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Okt",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 9
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Nov",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 10
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
    {
      month: "Des",
      revenue: transactions
        .filter(
          (t) =>
            t.status_pembayaran === "Lunas" &&
            t.tanggal_transaksi.getFullYear() === currentYearTransaction &&
            t.tanggal_transaksi.getMonth() === 11
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0),
    },
  ];

  const totalVisit = visits
    ? visits
        .filter((v) => v.tanggal.getFullYear() === currentYearTransaction)
        .reduce((sum) => sum + 1, 0)
    : 0;

  const totalRevenue = transactions
    ? transactions
        .filter(
          (t) => t.tanggal_transaksi.getFullYear() === currentYearTransaction
        )
        .reduce((sum, t) => sum + t.jumlah_total, 0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Laporan Keuangan dan Kunjungan Pasien</h1>
          <p className="text-muted-foreground mt-1">
            Lihat laporan keuangan dan kunjungan pasien
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Kunjungan Tahun {currentYearVisit}
                </p>
                <h2 className="mt-2">{totalVisit}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <UsersRound className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Pendapatan Tahun {currentYearTransaction}
                </p>
                <h2 className="mt-2">{formatCurrency(totalRevenue)}</h2>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Patient Visits Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              Grafik Kunjungan Pasien Tahun{" "}
              <Select
                onValueChange={(v) => {
                  setCurrentYearVisit(() => Number(v));
                }}
                defaultValue={String(currentYearVisit)}
                required
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem value={String(y)}>{String(y)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
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
              {/* <Line
                type="monotone"
                dataKey="newPatients"
                stroke="#10B981"
                strokeWidth={3}
                name="Pasien Baru"
                dot={{ fill: "#10B981", r: 4 }}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Report */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              Grafik Pendapatan Tahun
              <Select
                onValueChange={(v) => {
                  setCurrentYearTransaction(() => Number(v));
                }}
                defaultValue={String(currentYearTransaction)}
                required
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem value={String(y)}>{String(y)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground">Pendapatan bulanan</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis
                stroke="#6B7280"
                tickFormatter={(value) => `${value / 1000000}Jt`}
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
