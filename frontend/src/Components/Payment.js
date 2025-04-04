import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";

const initiatePayment = async (url, amount, reqid) => {
    
    try {
        // ✅ Step 1: Create a Payment Session
        const response = await fetch(`${url}item/payment`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,   // Pass the amount
                reqid: reqid      // Pass the request ID
            }),
        });

        const data = await response.json();

        if (!data.data.payment_session_id) {
            toast.error("❌ Payment session ID or Order ID is missing!");
            return;
        }

        const sessionId = data.data.payment_session_id;
        const orderId = data.data.order_id;
        localStorage.setItem('orderId',orderId);

        // ✅ Step 2: Open Payment Gateway
        const cashfree = await load({ mode: "sandbox" }); // Change to "production" in live mode

        cashfree.checkout({
            paymentSessionId: sessionId,
            redirectTarget: "_self"
        });

        // ✅ Step 3: Check Payment Status (Polling)
        

    } catch (error) {
        console.error("❌ Payment error:", error);
    }
 
};


export default initiatePayment;
