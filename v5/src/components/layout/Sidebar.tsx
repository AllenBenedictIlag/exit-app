import Link from 'next/link';
import { Home, Users, FileText, BarChart2, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="fixed w-64 h-screen bg-white border-r border-gray-200 pt-16">
      <div className="overflow-y-auto py-4 px-3 h-full">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/dashboard" 
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <Home className="w-6 h-6 text-gray-500 transition duration-75" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/exit-interviews" 
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <FileText className="w-6 h-6 text-gray-500 transition duration-75" />
              <span className="ml-3">Exit Interviews</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/reports" 
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <BarChart2 className="w-6 h-6 text-gray-500 transition duration-75" />
              <span className="ml-3">Reports</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/admin" 
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <Users className="w-6 h-6 text-gray-500 transition duration-75" />
              <span className="ml-3">Admin</span>
            </Link>
          </li>
          <li className="border-t border-gray-200">
            <Link 
              href="/admin/settings" 
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 mt-2"
            >
              <Settings className="w-6 h-6 text-gray-500 transition duration-75" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;