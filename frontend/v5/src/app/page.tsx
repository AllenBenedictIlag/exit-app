import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Exit Interview System
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Welcome to Electronic Manufacturing Company Exit Interview Management System.
          This platform helps streamline the employee exit process.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth"
            className="btn-primary"
          >
            Login to System
          </Link>
          <Link
            href="/exit-interviews"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Access Exit Interview Form <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}