import Layout from "@/components/ehasp/profile/Layout";
import CustomerInformation from "@/components/ehasp/profile/myAccount/CustomerInformation";
import CustomerPassword from "@/components/ehasp/profile/myAccount/CustomerPassword";
// import CustomerAddress from "@/components/ehasp/profile/myAccount/CustomerAddress";
import CustomerAddressList from "@/components/ehasp/profile/myAccount/CustomerAddressList";
export default function Profile({}) {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-8">
          <CustomerInformation />
          <CustomerPassword />
          {/* <CustomerAddress /> */}
          <CustomerAddressList />
        </div>
      </div>
    </Layout>
  );
}
