import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'When does morning milk delivery happen?',
      a: 'Our deliveries take place every morning between 6:00 AM and 8:00 AM so you have fresh milk ready for morning coffee and breakfast.'
    },
    {
      q: 'Is the milk raw or pasteurized?',
      a: 'We offer fresh, hygienic pasteurized whole milk as well as farm-fresh raw milk from certified cows that undergo daily lab testing.'
    },
    {
      q: 'How does daily milk subscription work?',
      a: 'You can choose your daily quantity (e.g. 1 Litre every morning). You can pause, modify, or cancel your subscription anytime with 1 tap before 9:00 PM.'
    },
    {
      q: 'How are the farmers supported?',
      a: 'Farmers receive direct weekly bank deposits with zero middleman deductions, ensuring maximum profit for rural farming families.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          We Are Here For You
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 font-display">
          Contact DairyConnect
        </h1>
        <p className="text-sm text-gray-600">
          Have queries about morning delivery slots, farm tours, or bulk milk requirements? We are happy to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#064E32] text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-2xl font-bold font-display">Get in Touch</h3>
            <p className="text-xs text-green-200 leading-relaxed">
              Our customer happiness team operates 7 days a week from 5:30 AM to 8:30 PM.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white text-sm">Central Hub & Operations</h5>
                  <p className="text-green-200 mt-0.5">12, DB Road, RS Puram, Coimbatore, Tamil Nadu - 641002</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white text-sm">Customer Helpline</h5>
                  <p className="text-green-200 mt-0.5">+91 (0422) 256-8900 / +91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white text-sm">Email Support</h5>
                  <p className="text-green-200 mt-0.5">support@dairyconnect.in</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-green-800 text-xs text-green-300">
              ⚡ Instant WhatsApp support available for early morning delivery queries.
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base font-display">Frequently Asked Questions</h3>
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <div key={i} className="py-3">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full text-left flex items-center justify-between text-xs font-bold text-gray-800 hover:text-[#146B3A]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition transform ${openFaq === i ? 'rotate-180 text-[#146B3A]' : 'text-gray-400'}`} />
                  </button>
                  {openFaq === i && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed bg-gray-50 p-2.5 rounded-xl">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 font-display">Send Us a Message</h3>
            <p className="text-xs text-gray-500 mt-1">Fill out the details below and we will respond within 2 hours.</p>
          </div>

          {formSent ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-gray-900 text-base">Message Received!</h4>
              <p className="text-xs text-gray-600">
                Thank you! Our Coimbatore dairy desk has received your message and will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">How can we help?</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us about your delivery requirement or query..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
