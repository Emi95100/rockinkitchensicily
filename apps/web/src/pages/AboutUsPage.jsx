import React from 'react';
import { Helmet } from 'react-helmet';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
const AboutUsPage = () => {
  return <>
      <Helmet>
        <title>About Us - Chi Siamo - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Meet Federica Paone, founder of Rockin' Kitchen Sicily and your guide to authentic Sicilian cuisine" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">About Us</h1>
            <p className="text-xl md:text-2xl">“Chi siamo”</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Founder Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center p-8">
                  <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-6xl text-white">FM</span>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-4xl font-black text-gray-900 mb-4">🎸 Rockin’ Kitchen Sicily: Taste the Soul of the Island</h2>
                  <p className="text-xl text-[#FF6B35] font-bold mb-4">Fernando Massana</p>
                  
                  <div className="space-y-4 text-gray-700 text-lg">
                    <p>
                      Food is the rhythm. Sicily is the stage. And Fernando Massana is your guide.
Forget the polished, cookie-cutter tourist traps. Rockin’ Kitchen Sicily is born from the raw energy of the island—the vibrant chaos of the historic markets, the heat of the volcanic soil, and the explosive flavors that only a land shaped by a thousand cultures can offer.
                    </p>
                    <p>
                      At the helm is Fernando Massana, better known as Rockin’ Kitchen Sicily. With a passion for authentic flavors and a rock 'n' roll spirit, Fernando doesn't just show you Sicily; he lets you feel its heartbeat. From the smoky "arrusti e mangia" (grill and eat) sessions in the backstreets of Catania to the hidden gems of Palermo’s street food markets, Fernando’s mission is to take you behind the scenes of the world's most incredible culinary stage.
                    </p>
                    <p>
                      Why "Rockin' Kitchen"? 
Because Sicilian cuisine isn't just a tradition—it’s pure energy, improvisation, and a rush for the senses. Fernando believes that food should be an experience, not just a meal. It’s about meeting the producers, hearing the roar of the markets, and tasting recipes that have remained unchanged for generations, all delivered with a modern, rebellious edge.
                    </p>
                    <p className="font-semibold text-gray-900">
                      I don't just show you where to eat—I introduce you to the vendors, the artisans, the families who keep our culinary traditions alive. This is Sicily with attitude, passion, and a whole lot of flavor!
What to Expect:
• No Filters: Authentic experiences in the spots where locals actually eat.
• The Real Rhythm: We navigate the alleys of Catania and the historic quarters of Palermo to find the soul of the city.
• Total Immersion: Whether it’s a morning market walk or a night of grilled meats and Sicilian-style pizza, you’ll see the island through the eyes of a true local.
Ready to rock your taste buds? Join Fernando Massana and discover why Sicily isn't just a place you visit—it’s a feeling you experience at full volume.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  At Rockin’ Kitchen Sicily, our mission is to break the rules of traditional tourism by delivering raw, unfiltered, and high-energy culinary experiences that connect travelers to the authentic soul of Sicily.
                </p>
                <p>
                  We don’t just "show" you the island; we immerse you in its rhythm. We are committed to:
• Preserving the Street Culture: Celebrating the vendors, the markets, and the ancient techniques that make Sicilian street food a world-class heritage.
• Authenticity Over Everything: Stripping away the "tourist filters" to take you exactly where the locals go—from the smoke of Catania’s grills to the historic heart of Palermo.
• Connecting Through Flavor: Using food as a universal language to bridge cultures, led by Fernando’s passion for the island’s rebellious and vibrant spirit.
• Supporting Local: Building a community of small producers, family-run stalls, and traditional artisans to ensure the real Sicily continues to thrive.
Our goal is simple: to make sure you leave Sicily not just full, but inspired—having tasted the island at full volume.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">🔥</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Authenticity</h3>
                <p className="text-gray-600">Real experiences, real people, real Sicily</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">🎸</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Passion</h3>
                <p className="text-gray-600">We live and breathe Sicilian culture</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connection</h3>
                <p className="text-gray-600">Building bridges through food and stories</p>
              </div>
            </div>

            {/* Instagram CTA */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] rounded-lg shadow-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-black mb-4">Follow Our Journey</h2>
              <p className="text-xl mb-6">
                Join our community on Instagram for daily doses of Sicilian food, culture, and adventures!
              </p>
              <a href="https://instagram.com/rockinkitchensicily" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#FF6B35] hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <Instagram className="w-6 h-6 mr-2" />
                  @rockinkitchensicily
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default AboutUsPage;