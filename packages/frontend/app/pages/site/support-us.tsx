import React, { useState } from 'react'
import { Heart, Users, Music, Award, CheckCircle, CreditCard, Gift, Star, Shield } from 'lucide-react'
import HeroCrumb from '~/components/HeroCrumb'
import CoverImage1 from '~/assets/cover-image1.png'
import CoverImage2 from '~/assets/cover-image2.png'
import CoverImage3 from '~/assets/cover-image3.png'
import type { Route } from '../+types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Support Us - Family of Singers" },
    { name: "description", content: "Support the Family of Singers choir and help us continue our mission of bringing beautiful gospel music to Rwanda. Choose from various donation tiers and support options." },
  ];
}

export default function SupportUs() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const donationTiers = [
    {
      id: 'supporter',
      name: 'Supporter',
      amount: '$25',
      description: 'Help us continue our mission with a small contribution',
      benefits: [
        'Thank you card',
        'Name in program',
        'Monthly newsletter'
      ],
      popular: false
    },
    {
      id: 'patron',
      name: 'Patron',
      amount: '$100',
      description: 'Support our community outreach and youth programs',
      benefits: [
        'VIP seating at concerts',
        'Meet & greet with choir',
        'Signed program',
        'Exclusive behind-the-scenes content'
      ],
      popular: true
    },
    {
      id: 'benefactor',
      name: 'Benefactor',
      amount: '$500',
      description: 'Make a significant impact on our choir\'s future',
      benefits: [
        'All Patron benefits',
        'Private concert invitation',
        'Recognition in annual report',
        'Dedicated rehearsal visit',
        'Custom music dedication'
      ],
      popular: false
    },
    {
      id: 'sponsor',
      name: 'Corporate Sponsor',
      amount: '$1,000+',
      description: 'Partner with us for major events and programs',
      benefits: [
        'All Benefactor benefits',
        'Logo placement in programs',
        'Corporate event performance',
        'Tax-deductible receipt',
        'Annual sponsor recognition'
      ],
      popular: false
    }
  ]

  const supportReasons = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Impact',
      description: 'We bring people together through the universal language of music, creating lasting bonds in our community and fostering unity across all backgrounds.'
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Cultural Enrichment',
      description: 'We preserve and promote diverse musical traditions, from classical masterpieces to contemporary compositions, enriching our cultural heritage.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Youth Development',
      description: 'We provide opportunities for young musicians to develop their talents, discover their passion for music, and build confidence through performance.'
    }
  ]

  const handleDonate = (tierId: string) => {
    setSelectedTier(tierId)
    // Here you would integrate with your payment processor
    console.log('Donating to tier:', tierId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroCrumb 
        title="Support"
        highlight="Our Choir"
        description="Help us continue our mission of bringing beautiful music to our community. Your support enables us to grow, perform, and make a lasting impact."
      />

      {/* Why Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Why Support <span className="text-yellow-500">Our Choir?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your support helps us continue our mission of bringing beautiful music to our community 
              and nurturing the next generation of musicians.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportReasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Donation <span className="text-yellow-500">Tiers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a support level that works for you. Every contribution makes a difference 
              in our choir's ability to serve the community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationTiers.map((tier) => (
              <div 
                key={tier.id} 
                className={`bg-white rounded-lg shadow-lg p-8 relative hover:shadow-xl transition-shadow duration-300 ${
                  tier.popular ? 'ring-2 ring-yellow-500' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-yellow-500 mb-4">{tier.amount}</div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleDonate(tier.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                      tier.popular
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Choose This Tier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Impact <span className="text-yellow-500">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how your support has made a real difference in our community and the lives of our members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={CoverImage1} 
                alt="Youth Program" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Youth Program Success</h3>
                <p className="text-gray-600">
                  Thanks to donor support, we've been able to provide free music education to 50+ young people 
                  in our community this year.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={CoverImage2} 
                alt="Community Outreach" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Outreach</h3>
                <p className="text-gray-600">
                  Our monthly performances at local hospitals and care centers bring joy to hundreds of 
                  patients and their families.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={CoverImage3} 
                alt="Cultural Events" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Events</h3>
                <p className="text-gray-600">
                  We've performed at 25+ cultural events this year, promoting diversity and unity 
                  through the power of music.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Other Ways to <span className="text-yellow-500">Support</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              There are many ways to support our choir beyond financial contributions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteer</h3>
              <p className="text-gray-600">
                Help with events, marketing, or administrative tasks. Every hour counts!
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">In-Kind Donations</h3>
              <p className="text-gray-600">
                Donate equipment, services, or venue space for our performances.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Spread the Word</h3>
              <p className="text-gray-600">
                Follow us on social media and share our events with your network.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Corporate Partnership</h3>
              <p className="text-gray-600">
                Partner with us for employee engagement and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a <span className="text-yellow-500">Difference?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us to discuss how you can support our choir and make a lasting impact 
              in our community through music.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@familyofsingers.rw"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Contact Support Team
              </a>
              <a 
                href="tel:+250788123456"
                className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Call for Donations
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
