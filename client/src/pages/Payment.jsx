import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const handleEsewaPayment = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // Use live URL in production

    const params = {
      amt: price, // Amount
      psc: 0, // Service charge
      pdc: 0, // Delivery charge
      txAmt: 0, // Tax
      tAmt: price, // Total amount
      pid: orderId, // Unique product/order ID
      scd: "EPAYTEST", // Replace with your merchant code
      su: "http://localhost:3000/success", // Replace with your success URL
      fu: "http://localhost:3000/failed", // Replace with your failure URL
    };

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10 py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  {/* Stripe Option */}
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/card.jfif" alt="stripe" />
                      <span className="text-slate-600">Card</span>
                    </div>
                  </div>

                  {/* Esewa Option */}
                  <div
                    onClick={() => setPaymentMethod("esewa")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "esewa" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/esewa.png" alt="esewa" />
                      <span className="text-slate-600">eSewa</span>
                    </div>
                  </div>
                </div>

                {/* Stripe Form */}
                {paymentMethod === "stripe" && (
                  <div>
                    <Stripe orderId={orderId} price={price} />
                  </div>
                )}

                {/* Esewa Form Button */}
                {paymentMethod === "esewa" && (
                  <div className="mt-6">
                    <button
                      onClick={handleEsewaPayment}
                      className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                    >
                      Start Payment
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} items and shipping fee included</span>
                    <span>RS. {price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-orange-500">RS. {price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
