import { auth } from "@/firebase";
import { openLoginModal, closeLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(
      auth,
      "guest3791638@gmail.com",
      "34190u31jid1089397caj8247"
    );
  }

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent transition-all border border-white text-white w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7] hover:text-black hover:border-[#cbd2d7]"
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="text-center mt-4 font-bold text-4xl">
              Sign in to your account
            </h1>
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md hover:border-gray-800 focus:border-white focus:border-1 transition-all bg-transparent border border-gray-700 p-6 outline-none"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md hover:border-gray-800 outline-none focus:border-white focus:border-1 transition-all  bg-transparent border border-gray-700 p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className="bg-white hover:bg-[#cbd2d7] transition-all text-black mt-8 rounded-md w-full font-bold text-lg p-2"
            >
              Sign In
            </button>
            <h1 className="text-center mt-8 font-bold text-lg">or</h1>
            <button
              onClick={handleGuestSignIn}
              className="bg-white mt-4 hover:bg-[#cbd2d7] transition-all text-black rounded-md w-full font-bold text-lg p-2"
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
