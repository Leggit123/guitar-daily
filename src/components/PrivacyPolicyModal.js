import React from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#303030] p-8 rounded-[22px] border border-[#cccccc2e] w-[90%] max-w-[500px] text-white">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <div className="mb-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        
          <p className="mb-4">
            Last updated: 18/08/2024
          </p>
          <p className="mb-4">
            Your privacy is important to us. This Privacy Policy explains how Guitar Daily ("we", "our", "us") collects, uses, and shares information about you when you use our services.
          </p>
          <p className="mb-4">
            <strong>Information We Collect</strong>
            <br />
            <strong>Personal Information:</strong> When you sign up for Guitar Daily, we collect your email address and password. This information is used to create and manage your account.
            <br />
            <strong>Usage Data:</strong> We may collect information on how you access and use the service. This data may include your IP address, browser type, and operating system.
          </p>
          <p className="mb-4">
            <strong>How We Use Your Information</strong>
            <br />
            <strong>To Provide and Maintain Our Service:</strong> We use your information to manage your account and provide you with the features of our service.
            <br />
            <strong>To Improve Our Service:</strong> We may use usage data to analyze how our service is used and to improve the user experience.
            <br />
            <strong>To Communicate with You:</strong> We may use your email address to send you important updates or information about your account.
          </p>
          <p className="mb-4">
            <strong>Sharing Your Information</strong>
            <br />
            We do not share your personal information with third parties, except in the following cases:
            <br />
            <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            <br />
            <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as email delivery services.
          </p>
          <p className="mb-4">
            <strong>Data Security</strong>
            <br />
            We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          <p className="mb-4">
            <strong>Your Rights</strong>
            <br />
            You have the right to access, update, or delete your personal information. You can do so by contacting us at info@guitardaily.com.
          </p>
          <p className="mb-4">
            <strong>Changes to This Privacy Policy</strong>
            <br />
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="mb-4">
            <strong>Contact Us</strong>
            <br />
            If you have any questions about this Privacy Policy, please contact us at info@guitardaily.com.
          </p>
          <p>
            By using Guitar Daily, you agree to the collection and use of your information as described in this Privacy Policy.
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-custom-cyan text-black px-6 py-2 rounded-md w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
