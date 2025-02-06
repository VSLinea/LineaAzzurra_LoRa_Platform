"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  User,
  Settings,
  Bell,
  Shield,
  Clock,
  Edit,
  Camera,
  Save,
  AlertCircle
} from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import TabNavigation from '../../components/ui/TabNavigation'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ActionButton from '../../components/ui/ActionButton'
import FormField from '../../components/ui/FormField'

export default function AccountPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    role: session?.user?.role || '',
    avatar: session?.user?.image || '/avatars/default.png',
    phone: '',
    timezone: 'America/New_York',
    language: 'English',
    notifications: {
      email: true,
      push: true,
      orderUpdates: true,
      systemAlerts: false,
      marketingEmails: false
    }
  })

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'security', label: 'Security' },
    { id: 'activity', label: 'Activity' }
  ]

  const handleSave = async () => {
    // Here you would typically call an API to update the user data
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }

  return (
    <div className="page-container">
      <PageHeader 
        icon={User}
        title="Account Settings"
        subtitle="Manage your profile and preferences"
      />

      <TabNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="flex items-center p-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {formData.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formData.role}
                </p>
              </div>
              <ActionButton
                label={isEditing ? 'Save Changes' : 'Edit Profile'}
                icon={isEditing ? Save : Edit}
                variant={isEditing ? 'primary' : 'secondary'}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              />
            </Card>

            {/* Profile Details */}
            <Card
              header={{
                title: 'Personal Information',
                subtitle: 'Update your personal details'
              }}
            >
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Full Name">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Email">
                    <Input
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Phone">
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Role">
                    <Input
                      value={formData.role}
                      disabled
                    />
                  </FormField>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* Regional Settings */}
            <Card
              header={{
                title: 'Regional Settings',
                icon: Settings,
                subtitle: 'Configure your locale preferences'
              }}
            >
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Language">
                    <Select
                      value={formData.language}
                      onChange={(value) => handleInputChange('language', value)}
                      options={[
                        { value: 'English', label: 'English' },
                        { value: 'Spanish', label: 'Spanish' },
                        { value: 'French', label: 'French' }
                      ]}
                    />
                  </FormField>

                  <FormField label="Timezone">
                    <Select
                      value={formData.timezone}
                      onChange={(value) => handleInputChange('timezone', value)}
                      options={[
                        { value: 'America/New_York', label: 'Eastern Time' },
                        { value: 'America/Chicago', label: 'Central Time' },
                        { value: 'America/Denver', label: 'Mountain Time' },
                        { value: 'America/Los_Angeles', label: 'Pacific Time' }
                      ]}
                    />
                  </FormField>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card
              header={{
                title: 'Notification Settings',
                icon: Bell,
                subtitle: 'Manage your notification preferences'
              }}
            >
              <div className="p-6 space-y-4">
                {Object.entries(formData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="text-sm text-gray-500">
                        Receive notifications for {key.toLowerCase()}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                        onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'security' && (
          <Card
            header={{
              title: 'Security Settings',
              icon: Shield,
              subtitle: 'Manage your security preferences'
            }}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <ActionButton
                  label="Enable 2FA"
                  variant="secondary"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card
            header={{
              title: 'Activity History',
              icon: Clock,
              subtitle: 'Recent actions and changes'
            }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {/* Here you would map through actual activity history from an API */}
              <div className="p-4">
                <div className="text-sm text-gray-500">
                  Activity history will be displayed here
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
} 