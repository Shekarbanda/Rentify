import React, { useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import Login from "../Pages/Login";
import { setWishlist } from "../Redux/Slices/ItemSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function BackNavbar() {
  const [isfavourite, setisfavourite] = useState(false);
  const [islogin, setislogin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const {itemId} = useParams();
  const dispatch = useDispatch();
  const url = useSelector((state) => state.api.value);
  const nav = useNavigate();
  const wishlist = useSelector((state) => state.Item.wishlist);
  const itemUrl = `${window.location.href}`;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${url}item/get-wishlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const items = response?.data?.data?.wishlist || [];
          setisfavourite(Array.isArray(items) && items.some((item) => item._id === itemId));
          dispatch(setWishlist(items));
        }
      } catch (err) {
        console.error(err);
      }
    };
    if(localStorage.getItem('token')){
      setislogin(true)
    }
    else{
      setislogin(false);
    }
    fetchWishlist();
  }, []);

   const handleFavorite = async(itemId)=>{
      try{
        const response = await axios.post(`${url}item/toggle-wishlist/${itemId}`,{},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
        });
        dispatch(setWishlist(response?.data?.data?.wishlist));
        toast.success(response?.data?.data?.message);
        setisfavourite(!isfavourite);
      }
      catch(err){
        toast.error("failed to update wishlist");
      }
    }

    const shareText = `I've found this on Rentify. What do you think? ${itemUrl} \n\nFor the best experience, download the Rentify App: https://rentify.in/openapp`;

    const handleShare = async () => {
      if (navigator.share && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
        try {
          await navigator.share({
            title: "Check this on Rentify",
            text: shareText,
            url: itemUrl,
          });
        } catch (error) {
          console.error("Sharing failed:", error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(itemUrl);
          toast.success("Link copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy")
        }
      }
    };
  


  return (
    <div className="flex items-center max-w-[1350px] mb-5 px-3 mx-auto justify-between">
      <div className="flex items-center gap-2">
        <button
          variant="outline"
          size="icon"
          onClick={() => nav(-1)}
          className="shadow-sm hover:bg-[rgb(221,230,233)] border border-gray rounded-md text-center hover:text-accent-foreground w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
        >
          <HiArrowNarrowLeft className="text-base sm:text-[30px] mx-auto md:text-3xl" />{" "}
        </button>
        <div className="text-base sm:text-2xl md:text-3xl">
          {"Item Details"}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          variant="outline"
          size="icon"
          onClick={handleShare}
          className="shadow-sm hover:bg-[rgb(221,230,233)] border border-gray rounded-md text-center hover:text-accent-foreground w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
        >
          <AiOutlineShareAlt
            className={`h-7 w-7 text-base sm:text-[30px] mx-auto md:text-3xl`}
          />
        </button>

        {
          <button
            variant="outline"
            size="icon"
            className="shadow-sm  w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
            onClick={() =>
              islogin ? handleFavorite(itemId) : setIsLoginOpen(true)
            }
          >
            <FaHeart
              className={`h-7 w-7  ${
                isfavourite ? "text-red-500" : "text-[rgba(45,43,43,0.25)]"
              }`}
            />
          </button>
        }
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
