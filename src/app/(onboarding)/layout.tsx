import Header from "@/app/(onboarding)/_components/header";
import Footer from "@/app/(onboarding)/_components/footer";
import Topbar from "@/app/(onboarding)/_components/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title={'QuickSaaSBoilerplate coming soon. Subscribe our newsletter'} href={'/#footer'} />
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}