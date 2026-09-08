import { Route, Routes } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StickyMobileBar } from '@/components/StickyMobileBar'
import { JsonLd } from '@/components/JsonLd'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Home } from '@/pages/Home'
import { Estimate } from '@/pages/Estimate'
import { Services } from '@/pages/Services'
import { Testimonials } from '@/pages/Testimonials'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { ThankYou } from '@/pages/ThankYou'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <JsonLd />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  )
}
