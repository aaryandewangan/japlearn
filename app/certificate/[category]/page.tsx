'use client'
import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import Certificate from '@/app/components/Certificate';
import { FiDownload, FiShare2 } from 'react-icons/fi';
import html2canvas from 'html2canvas';

export default function CertificatePage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const [certificateData, setCertificateData] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch(`/api/certificate/${resolvedParams.category}/verify`);
        if (response.ok) {
          const data = await response.json();
          setVerified(data.verified);

          if (data.verified) {
            const certRes = await fetch(`/api/certificate/${resolvedParams.category}/generate`);
            const certData = await certRes.json();
            setCertificateData(certData.certificateData);
          }
        }
      } catch (error) {
        console.error('Error verifying certificate:', error);
        router.push('/dashboard');
      }
    };

    if (session?.user) {
      verifyCertificate();
    }
  }, [session, resolvedParams.category, router]);

  const downloadCertificate = async () => {
    try {
      setDownloading(true);
      const certificateElement = document.getElementById('certificate');
      if (!certificateElement) return;

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `${resolvedParams.category}-certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'JapLearn Certificate',
          text: `Check out my ${resolvedParams.category} Certificate from JapLearn!`,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!verified) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Certificate Not Available</h1>
            <p>Complete all difficulty levels with at least 80% score to earn your certificate.</p>
          </div>
        </div>
      </>
    );
  }

  if (!certificateData) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
          <div>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiShare2 className="w-5 h-5" />
              Share
            </button>
            <button
              onClick={downloadCertificate}
              disabled={downloading}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiDownload className="w-5 h-5" />
              {downloading ? 'Downloading...' : 'Download'}
            </button>
          </div>
          <div id="certificate">
            <Certificate {...certificateData} />
          </div>
        </div>
      </div>
    </>
  );
} 