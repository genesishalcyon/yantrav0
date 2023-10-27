import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptFormatPdf from "@/components/partials/ReceiptFormatPdf";
import orderStore from "@/lib/store/orderStore";
import accountStore from "@/lib/store/accountStore";
export default function OrderReceiptButton({}) {
  const account = accountStore((state) => state.account);
  const order = orderStore((state) => state.order);
  return (
    <div className="flex">
      <PDFDownloadLink
        document={<ReceiptFormatPdf order={order} account={account} />}
        fileName="Receipt.pdf"
        className="w-full lg:min-w-[180px] bg-[#F05769] px-6 py-3 rounded-[26px] text-center text-[16px] leading-[24px] font-[600] text-[#FFFFFF]"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Receipt"
        }
      </PDFDownloadLink>
    </div>
  );
}
