import amexLogo from "../assets/payment/american-express.jpg";
import mastercardLogo from "../assets/payment/mastercard.jpg";
import paypalLogo from "../assets/payment/paypal.jpg";
import visaLogo from "../assets/payment/visa.jpg";
import yasMixxLogo from "../assets/payment/yas-mixx.jpg";
import websiteQr from "../assets/payment/website-qr.png";

export const paymentGatewayAssets = [
  { id: "mastercard", label: "Mastercard", image: mastercardLogo },
  { id: "visa", label: "Visa", image: visaLogo },
  { id: "american-express", label: "American Express", image: amexLogo },
  { id: "paypal", label: "PayPal", image: paypalLogo },
  { id: "yas-mixx", label: "Mixx by Yas", image: yasMixxLogo },
];

export { websiteQr };
