'use client';

import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

interface SettingsSection {
  title: string;
  description: string;
  settings: Setting[];
}

interface Setting {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'toggle' | 'number';
  value: string | number | boolean;
  options?: { value: string; label: string }[];
  description?: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [settings, setSettings] = useState<SettingsSection[]>([
    {
      title: 'General Settings',
      description: 'Configure general application settings',
      settings: [
        {
          id: 'companyName',
          label: 'Company Name',
          type: 'text',
          value: 'Electronic Manufacturing Company',
          description: 'Name displayed throughout the application'
        },
        {
          id: 'emailDomain',
          label: 'Email Domain',
          type: 'text',
          value: 'example.com',
          description: 'Domain used for employee emails'
        }
      ]
    },
    {
      title: 'Exit Interview Settings',
      description: 'Configure settings related to exit interviews',
      settings: [
        {
          id: 'autoSchedule',
          label: 'Auto-schedule Interviews',
          type: 'toggle',
          value: true,
          description: 'Automatically schedule interviews when an employee submits resignation'
        },
        {
          id: 'reminderDays',
          label: 'Reminder Days Before Interview',
          type: 'number',
          value: 2,
          description: 'Days before interview to send reminder'
        },
        {
          id: 'defaultInterviewer',
          label: 'Default Interviewer Role',
          type: 'select',
          value: 'hr_manager',
          options: [
            { value: 'hr_manager', label: 'HR Manager' },
            { value: 'department_head', label: 'Department Head' },
            { value: 'hr_staff', label: 'HR Staff' }
          ],
          description: 'Default role assigned to conduct exit interviews'
        }
      ]
    },
    {
      title: 'Notification Settings',
      description: 'Configure email notifications',
      settings: [
        {
          id: 'notifyHR',
          label: 'Notify HR on Resignation',
          type: 'toggle',
          value: true,
          description: 'Send notification to HR team when an employee resigns'
        },
        {
          id: 'reminderEmails',
          label: 'Send Reminder Emails',
          type: 'toggle',
          value: true,
          description: 'Send reminder emails before scheduled interviews'
        }
      ]
    }
  ]);

  const handleSettingChange = (sectionIndex: number, settingId: string, newValue: string | number | boolean) => {
    const newSettings = [...settings];
    const settingIndex = newSettings[sectionIndex].settings.findIndex(s => s.id === settingId);
    
    if (settingIndex !== -1) {
      newSettings[sectionIndex].settings[settingIndex].value = newValue;
      setSettings(newSettings);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSetting = (section: SettingsSection, sectionIndex: number, setting: Setting) => {
    switch (setting.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={setting.type}
            id={setting.id}
            value={setting.value as string}
            onChange={(e) => handleSettingChange(sectionIndex, setting.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            id={setting.id}
            value={setting.value as number}
            onChange={(e) => handleSettingChange(sectionIndex, setting.id, Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        );
        
      case 'select':
        return (
          <select
            id={setting.id}
            value={setting.value as string}
            onChange={(e) => handleSettingChange(sectionIndex, setting.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'toggle':
        return (
          <div className="mt-1 flex items-center">
            <button
              type="button"
              onClick={() => handleSettingChange(sectionIndex, setting.id, !(setting.value as boolean))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${(setting.value as boolean) ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className="sr-only">Toggle {setting.label}</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${(setting.value as boolean) ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className="ml-3 text-sm text-gray-500">
              {(setting.value as boolean) ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
          <button
            onClick={handleSaveSettings}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                <Save className="-ml-1 mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
        
        {success && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 space-y-8">
          {settings.map((section, sectionIndex) => (
            <div key={section.title} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{section.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{section.description}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.id} className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                      <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        {setting.label}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        {renderSetting(section, sectionIndex, setting)}
                        {setting.description && (
                          <p className="mt-2 text-sm text-gray-500">{setting.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 