'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/layout/Header';

interface VerificationResult {
  id: string;
  user_name: string;
  category: string;
  issued_date: string;
  verified: boolean;
}

export default function VerifyPage({
  params,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyCertificate() {
      try {
        const response = await fetch(`/api/certificate/verify/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify certificate');
        }

        setVerification(data.certificate);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    verifyCertificate();
  }, [params.id]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            {loading ? (
              <div className="text-center">Verifying certificate...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : verification ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold">Certificate Verified</h2>
                </div>
                <div className="mt-6 space-y-2">
                  <p><span className="font-semibold">Certificate ID:</span> {verification.id}</p>
                  <p><span className="font-semibold">Issued to:</span> {verification.user_name}</p>
                  <p><span className="font-semibold">Category:</span> {verification.category}</p>
                  <p><span className="font-semibold">Issue Date:</span> {new Date(verification.issued_date).toLocaleDateString()}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
} 