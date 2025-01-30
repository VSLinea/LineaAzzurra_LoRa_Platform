"use client"

import React, { useState } from 'react'
import { 
  HelpCircle,
  Book,
  MessageCircle,
  FileText,
  Mail,
  Phone,
  ChevronDown,
  PlayCircle,
  Search,
  Clock
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import TabNavigation from '../../components/ui/TabNavigation'
import Input from '../../components/ui/Input'

// Mock data
const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using the pool management system',
    icon: Book,
    articles: [
      { title: 'System Overview', link: '#' },
      { title: 'Creating Your First Order', link: '#' },
      { title: 'Managing Pool Settings', link: '#' },
      { title: 'Understanding Reports', link: '#' }
    ]
  },
  {
    title: 'Order Management',
    description: 'Everything about creating and managing orders',
    icon: FileText,
    articles: [
      { title: 'Order Lifecycle', link: '#' },
      { title: 'Order Validation Rules', link: '#' },
      { title: 'Managing Deliveries', link: '#' },
      { title: 'Order Reports', link: '#' }
    ]
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for common tasks',
    icon: PlayCircle,
    articles: [
      { title: 'Quick Start Guide', link: '#' },
      { title: 'Advanced Order Features', link: '#' },
      { title: 'Report Analysis', link: '#' },
      { title: 'System Configuration', link: '#' }
    ]
  }
]

const faqs = [
  {
    question: 'How do I create a new order?',
    answer: 'To create a new order, go to the Orders page and click the "New Order" button. Fill in the required information including pool selection, items, and priority. The system will validate your input and create the order.'
  },
  {
    question: 'What do the different order statuses mean?',
    answer: 'Order statuses indicate the current state of your order: Draft (initial creation), Pending (submitted but not validated), Validated (checked by manager), Processing (in warehouse), Shipped (on the way), and Delivered (received).'
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order by going to the Orders page and clicking on the specific order. This will show you detailed information including current status, delivery estimates, and tracking information when available.'
  },
  {
    question: 'What should I do if an order is delayed?',
    answer: 'If an order is delayed, you can check the order details for any notifications. If needed, contact support through the help desk or use the emergency contact for urgent issues.'
  },
  {
    question: 'How do I generate reports?',
    answer: 'Navigate to the Reports page where you can view various analytics. Use the filters and date range selector to customize your report view. You can export reports in different formats using the Export button.'
  }
]

const supportInfo = {
  email: 'support@poolmanager.com',
  phone: '+1 (555) 123-4567',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
  emergency: '+1 (555) 999-9999 (24/7 Emergency Support)'
}

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-gray-600 dark:text-gray-400">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('guides')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'guides', label: 'User Guides' },
    { id: 'faq', label: 'FAQ' },
    { id: 'support', label: 'Support' }
  ]

  return (
    <div className="page-container">
      <PageHeader 
        icon={HelpCircle}
        title="Help Center"
        subtitle="Guides, FAQs and Support"
      />

      <div className="mb-6">
        <Input
          icon={Search}
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card
                key={index}
                header={{
                  title: guide.title,
                  icon: guide.icon,
                  subtitle: guide.description
                }}
              >
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {guide.articles.map((article, articleIndex) => (
                    <a
                      key={articleIndex}
                      href={article.link}
                      className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      {article.title}
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'faq' && (
          <Card>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'support' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              header={{
                title: 'Contact Support',
                icon: MessageCircle,
                subtitle: 'Get in touch with our support team'
              }}
            >
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Email Support
                    </div>
                    <a 
                      href={`mailto:${supportInfo.email}`}
                      className="text-sm text-blue-600 dark:text-blue-400"
                    >
                      {supportInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Phone Support
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {supportInfo.phone}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              header={{
                title: 'Support Hours',
                icon: Clock,
                subtitle: 'When you can reach us'
              }}
            >
              <div className="p-4 space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">{supportInfo.hours}</p>
                  <p className="font-medium text-amber-600 dark:text-amber-400">
                    Emergency Support: {supportInfo.emergency}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 