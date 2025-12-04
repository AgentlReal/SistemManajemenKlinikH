import { fetchAllClinicsAPI } from "@/services/clinicServices";
import { fetchAllServicesAPI } from "@/services/serviceServices";
import type { ClinicInfo, ViewService, ViewTransactionClient } from "@/types";
import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import startcase from "@stdlib/string-startcase";
import { formatCurrency } from "../pages/MasterData";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1pt solid #e0e0e0",
    paddingBottom: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  storeAddress: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 3,
    color: "#666",
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  receiptInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoColumn: {
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: 8,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 9,
    fontWeight: "bold",
  },
  itemsTable: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "1pt solid #ddd",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderBottom: "1pt solid #f0f0f0",
  },
  colItem: {
    width: "40%",
    fontSize: 9,
  },
  colQty: {
    width: "15%",
    fontSize: 9,
    textAlign: "center",
  },
  colPrice: {
    width: "20%",
    fontSize: 9,
    textAlign: "right",
  },
  colTotal: {
    width: "25%",
    fontSize: 9,
    textAlign: "right",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
  },
  totalsSection: {
    marginTop: 10,
    borderTop: "1pt solid #ddd",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  totalLabel: {
    fontSize: 9,
    color: "#666",
  },
  totalValue: {
    fontSize: 9,
    fontWeight: "bold",
  },
  grandTotal: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  paymentSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTop: "1pt solid #ddd",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1pt solid #e0e0e0",
  },
  footerText: {
    fontSize: 8,
    textAlign: "center",
    color: "#666",
    marginBottom: 3,
  },
  thankYou: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  barcodeArea: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  barcodeText: {
    fontSize: 8,
    letterSpacing: 2,
    marginBottom: 5,
  },
});

const receiptData = {
  receiptNumber: "RCP-2024-001283",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  cashier: "John Smith",
  items: [
    { name: "Organic Bananas", quantity: 2, price: 1.99 },
    { name: "Whole Wheat Bread", quantity: 1, price: 3.49 },
    { name: "Milk 2% 1 Gallon", quantity: 1, price: 4.29 },
    { name: "Eggs Large Dozen", quantity: 1, price: 3.99 },
    { name: "Chicken Breast 1lb", quantity: 2, price: 5.99 },
    { name: "Coca-Cola 2L", quantity: 1, price: 2.49 },
    { name: "Potato Chips", quantity: 1, price: 3.79 },
    { name: "Toilet Paper 12pk", quantity: 1, price: 12.99 },
  ],
  subtotal: 44.01,
  taxRate: 8.25,
  taxAmount: 3.63,
  discount: 2.0,
  total: 45.64,
  paymentMethod: "CASH",
  amountPaid: 50.0,
  change: 4.36,
};

// Calculate derived values
const calculatedData = {
  ...receiptData,
  taxAmount: receiptData.subtotal * (receiptData.taxRate / 100),
  total:
    receiptData.subtotal +
    receiptData.subtotal * (receiptData.taxRate / 100) -
    receiptData.discount,
};

interface TransactionData {
  transaction: ViewTransactionClient & {
    services: ViewService[];
    clinicInfo: ClinicInfo;
  };
}
// Receipt Document Component
const ReceiptDocument = ({ order }: { order: TransactionData }) => {
  return (
    <Document>
      <Page size={[280, 600]} style={styles.page}>
        {/* Receipt-like dimensions */}
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.storeName}>
            {order.transaction.clinicInfo.nama_klinik.toUpperCase()}
          </Text>
          <Text style={styles.storeAddress}>
            {order.transaction.clinicInfo.alamat}
          </Text>
          <Text style={styles.storeAddress}>
            No Telp: {order.transaction.clinicInfo.nomor_telepon}
          </Text>
          <Text style={styles.storeAddress}>
            Email: {order.transaction.clinicInfo.email}
          </Text>
        </View>
        {/* Receipt Info */}
        <View style={styles.receiptInfo}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Pasien</Text>
            <Text style={styles.infoValue}>
              {order.transaction.nama_pasien}
            </Text>

            <Text style={styles.infoLabel}>Tanggal</Text>
            <Text style={styles.infoValue}>
              {order.transaction.tanggal_transaksi.toLocaleDateString("id-ID")}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Kasir</Text>
            <Text style={styles.infoValue}>{order.transaction.id_kasir}</Text>

            <Text style={styles.infoLabel}>Waktu</Text>
            <Text style={styles.infoValue}>
              {order.transaction.tanggal_transaksi.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        {/* Items Table */}
        <View style={styles.itemsTable}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colItem, styles.headerText]}>LAYANAN</Text>
            <Text style={[styles.colQty, styles.headerText]}>QTY</Text>
            <Text style={[styles.colPrice, styles.headerText]}>HARGA</Text>
            <Text style={[styles.colTotal, styles.headerText]}>TOTAL</Text>
          </View>

          {/* Table Rows */}
          {order.transaction.services.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.colItem}>{item.nama_layanan}</Text>
              <Text style={styles.colQty}>{item.kuantitas}</Text>
              <Text style={styles.colPrice}>
                {formatCurrency(item.harga_saat_itu)}
              </Text>
              <Text style={styles.colTotal}>
                {formatCurrency(item.kuantitas * item.harga_saat_itu)}
              </Text>
            </View>
          ))}
        </View>
        {/* Totals Section */}
        <View style={styles.totalsSection}>
          {/* <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>${order.transaction.jumlah_total.toFixed(2)}</Text>
        </View> */}

          {/* <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({order.taxRate}%):</Text>
          <Text style={styles.totalValue}>${order.taxAmount.toFixed(2)}</Text>
        </View>

        {order.discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={[styles.totalValue, { color: "#e74c3c" }]}>
              -${order.discount.toFixed(2)}
            </Text>
          </View>
        )} */}
          <View style={[styles.totalRow, { marginTop: 5 }]}>
            <Text style={styles.grandTotal}>TOTAL:</Text>
            <Text style={styles.grandTotal}>
              {formatCurrency(order.transaction.jumlah_total)}
            </Text>
          </View>
        </View>
        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Metode Pembayaran:</Text>
            <Text style={styles.totalValue}>
              {order.transaction.metode_pembayaran}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Status:</Text>
            <Text style={styles.totalValue}>
              {order.transaction.status_pembayaran}
            </Text>
          </View>
        </View>
        {/* Barcode Area */}
        {/* <View style={styles.barcodeArea}>
        <Text style={styles.barcodeText}>* {order.receiptNumber} *</Text>
        <Text style={[styles.footerText, { fontSize: 7 }]}>
          {Array(20).fill("-").join("")}
        </Text>
      </View> */}
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terima kasih telah berobat di{" "}
            {startcase(order.transaction.clinicInfo.nama_klinik)}!
          </Text>
          <Text style={styles.thankYou}>SALAM SATU SEHAT!</Text>
        </View>
      </Page>
    </Document>
  );
};

export const printReceiptPDF = async (transaction: ViewTransactionClient) => {
  const services = (await fetchAllServicesAPI(
    transaction.id_pembayaran
  )) as ViewService[];

  const clinicInfo = ((await fetchAllClinicsAPI()) as ClinicInfo[])[0];

  const transactionData: TransactionData = {
    transaction: { ...transaction, services, clinicInfo },
  };

  const blob = await pdf(<ReceiptDocument order={transactionData} />).toBlob();
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

// const StrukPDF = () => {
//   const downloadPDF = async () => {
//     const blob = await pdf(<ReceiptDocument order={calculatedData} />).toBlob();
//     saveAs(blob, "financial-report-react-pdf.pdf");
//   };

//   const printPDF = async () => {
//     const blob = await pdf(<ReceiptDocument order={calculatedData} />).toBlob();
//     const url = URL.createObjectURL(blob);

//     // Open PDF in new window and trigger print
//     const printWindow = window.open(url, "_blank");

//     // Wait for PDF to load then trigger print
//     if (printWindow) {
//       printWindow.onload = () => {
//         setTimeout(() => {
//           printWindow.print();
//           URL.revokeObjectURL(url);
//         }, 500);
//       };
//     }
//   };
//   return (
//     <div className="flex flex-col gap-2">
//       <button
//         onClick={downloadPDF}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-fit"
//       >
//         Download with React-PDF
//       </button>
//       <button
//         onClick={printPDF}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-fit"
//       >
//         Print with React-PDF
//       </button>
//     </div>
//   );
// };

// export default StrukPDF;
