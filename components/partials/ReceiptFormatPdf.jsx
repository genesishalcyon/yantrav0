import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
// import globalData from "@/lib/preBuildScripts/static/globalData.json";
import MontserratRegular from "@/styles/fonts/Montserrat-Regular.ttf";
import MontserratBold from "@/styles/fonts/Montserrat-Bold.ttf";
import { auth, convertDate } from "@/lib/services/globalService";
export default function ReceiptFormatPdf({ order, account }) {
  // const { tenantDetails } = globalData;
  // const defaultMeta = tenantDetails?.data?.main;
  Font.register({
    family: "Montserrat",
    fonts: [
      {
        src: MontserratRegular,
      },
      {
        src: MontserratBold,
        fontWeight: "bold",
      },
    ],
    format: "truetype",
  });

  const styles = StyleSheet.create({
    image: {
      width: 190,
      height: 45,
    },
    body: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 70,
    },
    layout: {
      marginTop: 25,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 11,
      color: "#3E444F",
      fontFamily: "Montserrat",
      fontWeight: "bold",
    },
    content: {
      fontSize: 11,
      color: "#3E444F",
      fontFamily: "Montserrat",
      lineHeight: 1.5,
    },
    marginTop: {
      marginTop: 10,
    },
    flex1: {
      flex: 1,
    },
    table: {
      width: "100%",
    },
    row: {
      fontSize: 11,
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #E3E3E3",
      paddingTop: 12,
      paddingBottom: 12,
      color: "#3E444F",
    },
    lowtop: {
      paddingTop: 4,
    },
    lowtbot: {
      paddingBottom: 4,
    },
    header: {
      borderTop: "none",
    },
    row1: {
      fontSize: 11,
      width: "40%",
      textAlign: "left",
      color: "#3E444F",
    },
    row2: {
      fontSize: 11,
      width: "20%",
      textAlign: "left",
      color: "#3E444F",
    },
    row3: {
      fontSize: 11,
      width: "20%",
      textAlign: "right",
      color: "#3E444F",
    },
    row4: {
      fontSize: 11,
      width: "20%",
      textAlign: "right",
      color: "#3E444F",
    },
    montserratRegular: {
      fontFamily: "Montserrat",
    },
    montserratBold: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
    },
    subTotal: {
      fontSize: 11,
      width: "40%",
      textAlign: "right",
      color: "#3E444F",
    },
    grandTotal: {
      fontSize: 14,
      width: "40%",
      textAlign: "right",
      color: "#19ADBB",
    },
    grandTotalPrice: {
      fontSize: 14,
      width: "20%",
      textAlign: "right",
      color: "#19ADBB",
    },
    borderTop: {
      borderTop: "1px solid #E3E3E3",
    },
    borderTop2: {
      borderTop: "2px solid #E3E3E3",
    },
    borderBottom: {
      borderBottom: "1px solid #E3E3E3",
    },
  });

  const items = order?.orderLines || [];

  const formatAddress = (address) => {
    return `${address?.address_line_1}, ${address?.city}, ${address?.state}, ${address?.zip_code}, ${address?.country}`;
  };

  const fullname = auth
    ? `${account?.first_name} ${account?.last_name}`
    : `${order?.customer?.first_name} ${order?.customer?.last_name}`;

  const paymentMethod =
    order?.payments?.payment_method?.data?.gateway === "manual"
      ? "Cash on Delivery"
      : order?.payments?.payment_method?.data?.title;

  return (
    <Document>
      <Page style={styles.body}>
        <Image alt="Logo" src="/images/logo.jpg" style={styles.image} />
        <Text style={[styles.borderTop, { marginTop: 20 }]} />
        <View style={styles.layout}>
          <View style={[styles.flex1, { marginRight: 8 }]}>
            <Text style={styles.title}>Bill To</Text>
            <Text style={[styles.content, styles.marginTop]}>{fullname}</Text>
            <Text style={styles.content}>
              {formatAddress(order.billing_address)}
            </Text>
            <Text style={[styles.title, { marginTop: 25 }]}>Order #</Text>
            <Text style={[styles.content, styles.marginTop]}>
              {order.reference}
            </Text>
            <Text style={[styles.title, styles.marginTop, { marginTop: 25 }]}>
              Payment Method
            </Text>
            <Text style={[styles.content, styles.marginTop]}>
              {paymentMethod}
            </Text>
          </View>
          <View style={[styles.flex1, { marginLeft: 8 }]}>
            <Text style={styles.title}>Ship To</Text>
            <Text style={[styles.content, styles.marginTop]}>{fullname}</Text>
            <Text style={styles.content}>
              {formatAddress(order.shipping_address)}
            </Text>
            <Text style={[styles.title, styles.marginTop, { marginTop: 25 }]}>
              Order Date
            </Text>
            <Text style={[styles.content, styles.marginTop]}>
              {convertDate(order.created_at, "MMM DD, YYYY hh:mm A")}
            </Text>
          </View>
        </View>
        <Text style={[styles.border, { marginTop: 25 }]} />

        <View style={[styles.table, styles.borderTop2]}>
          <View style={[styles.row, styles.header, styles.montserratBold]}>
            <Text style={styles.row1}>Product Name</Text>
            <Text style={styles.row2}>Qty.</Text>
            <Text style={styles.row3}>Unit Price</Text>
            <Text style={styles.row4}>Amount</Text>
          </View>
          {items.map((row, i) => (
            <View
              key={i}
              style={[styles.row, styles.montserratRegular]}
              wrap={false}
            >
              <Text style={styles.row1}>{row.name}</Text>
              <Text style={styles.row2}>{row.quantity}</Text>
              <Text style={styles.row3}>
                {order?.currency?.symbol} {row.unit_price}
              </Text>
              <Text style={styles.row4}>
                {order?.currency?.symbol} {row.sub_total}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.borderTop} />

        <View style={styles.table}>
          <View
            style={[
              styles.row,
              styles.lowtbot,
              styles.header,
              styles.montserratBold,
            ]}
          >
            <Text style={styles.row1} />
            <Text style={styles.row2} />
            <Text style={styles.subTotal}>
              Subtotal {order?.tax_display === "inclusive" && "(tax incl.)"}
            </Text>
            <Text style={styles.row4}>
              {order?.currency?.symbol} {order.sub_total}
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.lowtbot,
              styles.header,
              styles.montserratBold,
            ]}
          >
            <Text style={styles.row1} />
            <Text style={styles.row2} />
            <Text style={styles.row3}>Shipping Fee</Text>
            <Text style={styles.row4}>
              {order?.currency?.symbol} {order.shipping_total}
            </Text>
          </View>

          {order?.discount_total && parseFloat(order?.discount_total) > 0 && (
            <View
              style={[
                styles.row,
                styles.lowtbot,
                styles.header,
                styles.montserratBold,
              ]}
            >
              <Text style={styles.row1} />
              <Text style={styles.row2} />
              <Text style={styles.row3}>Discount</Text>
              <Text style={styles.row4}>
                -{order?.currency?.symbol} {order.discount_total}
              </Text>
            </View>
          )}

          {order?.tax_display === "exclusive" && (
            <View style={[styles.row, styles.header, styles.montserratBold]}>
              <Text style={styles.row1} />
              <Text style={styles.row2} />
              <Text style={styles.row3}>Tax</Text>
              <Text style={styles.row4}>
                {order?.currency?.symbol} {order.tax_total}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.row,
              styles.header,
              styles.montserratBold,
              styles.borderTop,
              styles.borderBottom,
            ]}
          >
            <Text style={styles.row1} />
            <Text style={styles.row2} />
            <Text style={styles.grandTotal}>Grand Total</Text>
            <Text style={styles.grandTotalPrice}>
              {order?.currency?.symbol} {order.total}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
