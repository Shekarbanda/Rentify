import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Category from "../Components/Category";

const HelpPage = () => {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[50px] lg:pt-[72px] mx-auto">
              <Category />
            </div>
      <div className="max-w-[1400px] min-h-[73.5vh] lg:min-h-[77vh] md:min-h-[78.5vh] mx-auto p-6  space-y-6 mb-5">
        <h1 className="text-3xl font-bold text-center">Help & Support</h1>

        {/* FAQs Section */}
        <section>
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-4 mt-4">
            <details className="p-4 border rounded-lg">
              <summary className="font-medium cursor-pointer">
                What is Rentify?
              </summary>
              <p className="mt-2 text-gray-600">
                Rentify is a marketplace where users can rent and share items
                securely.
              </p>
            </details>
            <details className="p-4 border rounded-lg">
              <summary className="font-medium cursor-pointer">
                How do I rent an item?
              </summary>
              <p className="mt-2 text-gray-600">
                You can browse available items, select one, and complete the
                rental process through our secure payment system.
              </p>
            </details>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
          <p className="mt-2 text-gray-600">
            By using Rentify, you agree to our terms and policies. All
            transactions must comply with our guidelines.
          </p>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          <p className="mt-2 text-gray-600">
            We prioritize user privacy and do not share personal data without
            consent.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="mt-2 text-gray-600">
            If you have any questions, reach out to us at{" "}
            <a
              href="mailto:support@rentify.com"
              className="text-blue-500 underline"
            >
              support@rentify.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default HelpPage;
