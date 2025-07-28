import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

export default function Contact() {
    return (<>
        <Headers />

        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        placeholder="Your message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Send Message
                </button>
            </form>
        </div>
        <Footer />

    </>
    );
}
