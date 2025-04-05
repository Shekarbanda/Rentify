import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import OwnerItemCard from "../../Components/OwnerItemCard";
import Category from "../../Components/Category";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setLoad } from "../../Redux/Slices/ItemSlice";
import { useNavigate } from "react-router";

export default function MyAdsPage() {
  const url = useSelector((state) => state.api.value);
  const [loading, setLoading] = useState(true);
  const myAds = useSelector((state) => state.Item.value);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.Item.load);

  const fetchMyads = async () => {
    dispatch(setLoad(true));
    try {
      const response = await axios.get(`${url}item/get-my-ads`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          "Content-Type": "multipart/form-data", // Correct content type for file uploads
        },
      });
      if (response.status === 200) {
        const items = response?.data?.data?.items || [];
        dispatch(setItems(items));
        dispatch(setLoad(false));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyads();
  }, [url]);

  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[50px] lg:pt-[72px] mx-auto">
        <Category />
      </div>
      <div className="max-w-[1400px] min-h-[73.5vh] lg:min-h-[77vh] md:min-h-[78.5vh] mx-auto flex-1 flex flex-col p-3 pb-[50px] border border-gray-100">
        <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)] ">
          MY ADS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 ">
          {myAds?.length > 0 ? (
            myAds?.map((myAd, index) => (
              <OwnerItemCard key={index} details={myAd} isload={false} />
            ))
          ) : load ? (
            [...Array(6)].map((id) => <OwnerItemCard isload={true} />)
          ) : (
            <div className="col-span-2 text-center text-gray-500 text-lg py-6">
              <h2>
                🚀 No ads found! Looks like it's time to post your first item.
              </h2>
              <button
                onClick={() => navigate("/post")}
                className="mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
