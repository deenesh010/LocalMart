import Headers from "../components/Headers";
import Footer from "../components/Footer";

export default function About() {
    return (
        <>
            <Headers />
            <div className="min-h-screen bg-white px-4 py-12 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">About LocalMart</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        LocalMart is your trusted local e-commerce platform dedicated to connecting
                        customers with quality local vendors. We provide a simple, secure, and
                        user-friendly marketplace where you can discover and shop for a variety of
                        products while supporting your community.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        Our mission is to empower local businesses by giving them a digital presence
                        and offering customers a seamless shopping experience. From daily essentials
                        to unique handmade products, LocalMart brings your neighborhood closer to you.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        We are committed to quality service, secure transactions, and building strong
                        relationships between vendors and customers — all under one virtual roof.
                    </p>
                    <p className="text-lg text-gray-600">
                        Thank you for choosing LocalMart. Together, we grow our local economy.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
