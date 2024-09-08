import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { Mail } from "lucide-react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmited] = useState(false);
  const { isLoading, forgetPassword } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmited(true);
    forgetPassword(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 
      backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
      overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center 
        bg-gradient-to-r from-green-400 to-emerald-500 
        text-transparent bg-clip-text"
        >
          Reset Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>
        ) : (
          <div className="">
            
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ForgetPasswordPage;
