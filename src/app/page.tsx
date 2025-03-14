import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Exit Interview System
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl">
          Welcome to Electronic Manufacturing Company Exit Interview Management System.
          This platform helps streamline the employee exit process.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/auth"
            className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors"
          >
            Sign in to Dashboard
          </Link>
          <Link
            href="/exit-interviews"
            className="px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-white border border-blue-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
          >
            Access Exit Interview Form
          </Link>
        </div>
      </div>
    </div>
  );
}