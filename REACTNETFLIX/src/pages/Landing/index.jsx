import SectionFAQ from "@/components/modules/LandingPage/SectionContents/SectionFAQ"
import DefaultLayout from "@layouts/DefaultLayout"
import Footer from "@/components/modules/LandingPage/Footer"
import Jumbotron from "@/components/modules/LandingPage/Jumbotron"
import SectionDownload from "@/components/modules/LandingPage/SectionContents/SectionDownload"
import SectionEnjoy from "@/components/modules/LandingPage/SectionContents/SectionEnjoy"
import SectionProfile from "@/components/modules/LandingPage/SectionContents/SectionProfile"
import SectionWatch from "@/components/modules/LandingPage/SectionContents/SectionWatch"
import Navbar from "./Navbar"


function Landing() {

  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFAQ />
      <Footer />
    </>
  )
}

export default Landing