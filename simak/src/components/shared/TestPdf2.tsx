import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryItem: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    border: "1pt solid #e5e7eb",
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
  },
});

const financialData = {
  revenue: 150000,
  expenses: 75000,
  profit: 75000,
  quarters: [
    { quarter: "Q1", revenue: 35000, expenses: 18000 },
    { quarter: "Q2", revenue: 38000, expenses: 19000 },
    { quarter: "Q3", revenue: 40000, expenses: 19500 },
    { quarter: "Q4", revenue: 37000, expenses: 18500 },
  ],
};

type FinancialData = typeof financialData;

// PDF Document Component
const MyDocument = ({ financialData }: { financialData: FinancialData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Financial Report 2024</Text>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryValue}>
              ${financialData.revenue.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>
              ${financialData.expenses.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Net Profit</Text>
            <Text style={[styles.summaryValue, { color: "#059669" }]}>
              ${financialData.profit.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Quarterly Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quarterly Breakdown</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Quarter</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Revenue</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Expenses</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Profit</Text>
            </View>
          </View>

          {/* Table Rows */}
          {financialData.quarters.map((quarter, index) => {
            const profit = quarter.revenue - quarter.expenses;
            return (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{quarter.quarter}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    ${quarter.revenue.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    ${quarter.expenses.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={[
                      styles.tableCell,
                      { color: profit >= 0 ? "#059669" : "#dc2626" },
                    ]}
                  >
                    ${profit.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Page>
  </Document>
);

const FinancialReportReactPDF = () => {
  const downloadPDF = async () => {
    const blob = await pdf(
      <MyDocument financialData={financialData} />
    ).toBlob();
    saveAs(blob, "financial-report-react-pdf.pdf");
  };

  const printPDF = async () => {
    const blob = await pdf(
      <MyDocument financialData={financialData} />
    ).toBlob();
    const url = URL.createObjectURL(blob);

    // Open PDF in new window and trigger print
    const printWindow = window.open(url, "_blank");

    // Wait for PDF to load then trigger print
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          URL.revokeObjectURL(url);
        }, 500);
      };
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={downloadPDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-fit"
      >
        Download with React-PDF
      </button>
      <button
        onClick={printPDF}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-fit"
      >
        Print with React-PDF
      </button>
    </div>
  );
};

export default FinancialReportReactPDF;
