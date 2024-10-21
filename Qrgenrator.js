import React, { useState } from 'react';
import { QrCode, Download, Loader2 } from 'lucide-react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const generateQR = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsImageLoaded(false);

    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const params = new URLSearchParams({
      data: text,
      size: '300x300',
      margin: '20',
      format: 'png'
    });
    
    setQrCodeUrl(`${baseUrl}?${params.toString()}`);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header Card */}
        <div className="bg-white rounded-t-2xl shadow-lg p-8 border-b border-gray-100">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              QR Code Generator
            </h1>
          </div>
          
          <form onSubmit={generateQR} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to generate QR code"
                className="w-full p-4 pr-4 text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className={`w-full py-4 px-6 rounded-xl text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200
                ${isLoading || !text.trim() 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <QrCode className="w-5 h-5" />
                  <span>Generate QR Code</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* QR Code Display Card */}
        {qrCodeUrl && (
          <div className="bg-white rounded-b-2xl shadow-lg p-8 space-y-6">
            <div className="flex justify-center">
              <div className="relative bg-white rounded-2xl p-6 border-2 border-dashed border-gray-200">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-2xl">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  </div>
                )}
                <img 
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className={`w-[300px] h-[300px] transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={() => {
                    setIsLoading(false);
                    alert('Error generating QR code. Please try again.');
                  }}
                />
              </div>
            </div>

            {isImageLoaded && (
              <div className="flex justify-center">
                <a
                  href={qrCodeUrl}
                  download="qrcode.png"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-green-200 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  <span>Download QR Code</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
