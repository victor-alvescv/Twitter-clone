import { db } from "@/firebase";
import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Modal from "@mui/material/Modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const userImg = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const router = useRouter()

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });
    
    dispatch(closeCommentModal())
    router.push('/' + tweetDetails.id)
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className="w-full h-full relative rounded-lg text-white bg-black border border-gray-500 sm:w-[600px] sm:h-[386px] sm:p-10 p-4">
          <div
            onClick={() => dispatch(closeCommentModal())}
            className="absolute top-3 right-5 sm:top-5 sm:left-5"
          >
            <XIcon className="w-6 cursor-pointer" />
          </div>
          <div className="mt-8">
            <div className="flex space-x-3 w-full">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={tweetDetails.photoUrl}
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to <span className="text-[#1b9bf0]">@xgs</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={userImg || "/assets/Standard-profile.png"}
              />
              <div className="w-full">
                <textarea
                  placeholder="Tweet your reply"
                  className="w-full bg-transparent resize-none outline-none"
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="pt-4 flex justify-between border-t border-gray-700">
                  <div className="flex space-x-0">
                    <div className="iconsAnimation transition-all">
                      <PhotographIcon className="h-[22px] text-[#1d9bf0] cursor-not-allowed" />
                    </div>
                    <div className="iconsAnimation transition-all">
                      <ChartBarIcon className="h-[22px] text-[#1d9bf0] cursor-not-allowed" />
                    </div>
                    <div className="iconsAnimation transition-all">
                      <EmojiHappyIcon className="h-[22px] text-[#1d9bf0] cursor-not-allowed" />
                    </div>
                    <div className="iconsAnimation transition-all">
                      <CalendarIcon className="h-[22px] text-[#1d9bf0] cursor-not-allowed" />
                    </div>
                    <div className="iconsAnimation transition-all">
                      <LocationMarkerIcon className="h-[22px] text-[#1d9bf0] cursor-not-allowed" />
                    </div>
                  </div>
                  <button
                    onClick={sendComment}
                    className="bg-[#1d9bf0] transition-all rounded-full px-4 py-1.5 disabled:opacity-50 hover:opacity-80"
                    disabled={!comment}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

// 2:34:08
