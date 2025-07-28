import { useState } from "react";
import axios from "axios";
import Headers from "../components/Headers";

const API_KEY = "AIzaSyAplEf8CMTST54JFWEo8ZQyAQZRZjhHxtA";

const CUSTOM_CONTEXT = `
You are an assistant trained on the following company data:

- Company: LocalMart, a local e-commerce platform based in Kathmandu.
  
- Customers:
  Customers can create an account using their email and securely log in with a password. They can search for specific products and apply filters like product category, price range, and customer ratings. Each product has a dedicated page showing the product name, images, description, price, available stock, store information, reviews, and ratings. Customers can add one or more items to their shopping cart, adjust quantities, remove items, or add products to a wishlist. After placing an order, customers can view the current order status (e.g., processing, warehouse, placed). They can see a list of all past orders with details such as items purchased, dates, and total amount paid. Customers can also rate and review products they have purchased.

- for Customers:
  Customers can browse products by category or search using keywords. They can view detailed product information,

- Sellers:
  Sellers can create an account, log in, and add their products to the platform. They can manage inventory and orders, update existing products, and add new ones. The platform helps sellers reach customers online with a variety of products ranging from handcrafted merchandise to larger home utility items.

- Description:
  LocalMart is an e-commerce platform where customers can purchase genuine Nepalese products. It provides a user-friendly interface to interact with local goods, benefiting both customers and sellers. The platform helps retailers expand their business by offering a digital space to showcase and sell products. Key features include product search, add to cart, detailed product pages, and category-wise browsing. Sellers can post locally made products such as woolen gloves, pashmina, Thanka paintings, and other handmade crafts. Customers can browse by category or search with keywords, view detailed information (price, images, descriptions), manage their profiles, place orders, and pay online.

- Target Audience:
  LocalMart primarily targets local shoppers and small businesses.

- Products:
  Orthodox Tea, Coffee, Apples, Rice & Wheat, Ginger, Citrus Fruits, Maize & Pulses, Akabare Khursani, Beans & Walnuts from Jumla.

Available products:
 Orthodox Tea 1kg price: Rs. 600
 Shahi Pulao Rice 20 kg price: Rs. 3000
 Mato Pure Cow Ghee 500Ml price: Rs. 845
 Large Cardamom 100g price: Rs. 300
 Dhaka Topi price: Rs. 200
 Earthen Cup Kullad - 6 pieces price: Rs. 250
Shiva Thanka Painting 36x50 cm price: Rs. 3999
Marpha Brandy - 750ml price: Rs. 1050
Nepali Khukuri Medium 12 Inches price: Rs. 1299

- Support:
  Customer support is available 24/7 via chat or email.

- Additional Features:
  Task management, collaboration, and analytics tools for sellers.

Answer questions based only on this information.
`;


export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Combine custom context + user input into a single prompt
      const prompt = `${CUSTOM_CONTEXT}\nUser: ${input}\nAssistant:`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini.";
      const botMessage = { sender: "bot", text: botText.trim() };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error getting response from Gemini." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Headers />

      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 flex flex-col relative">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
            🤖 LocalMart Chatbot
          </h1>

          <div className="flex flex-col gap-3 overflow-y-auto h-[480px] border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4 scroll-smooth">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[75%] text-sm md:text-base shadow-md ${msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-3 bg-yellow-100 text-gray-700 rounded-xl shadow self-start max-w-[60%]">
                Thinking...
              </div>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Ask something smart..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
