import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "./Card";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setAllItemsState, setWishlist } from "../Redux/Slices/ItemSlice";
import { setCategories } from "../Redux/Slices/CategorySlice";

const Items = () => {
  const scrollRef = useRef(null);
  const nav = useNavigate();
  const [load, setload] = useState(false);
  const [user, setuser] = useState();
  const dispatch = useDispatch();
  const itemsfromstate =  useSelector((state)=>state.Item.allItems);
  const filters = useSelector((state)=>state.Category.filters);

  const url = useSelector((state) => state.api.value);
  const [allItems, setAllItems] = useState([]);

  const fetchItems = async (user) => {
    try {
      const response = await axios.post(`${url}item/get-all-items`, {
        userId: user ? user.userId : null,
      });
      if (response.status === 200) {
        const items = response?.data?.data?.items || [];
        dispatch(setAllItemsState(items));
        setAllItems(items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    dispatch(setCategories('ALL'));
    setAllItems(itemsfromstate); // Always update UI with latest state
  
    const shouldFetch =
      itemsfromstate?.length === 0;
  
    if (shouldFetch) {
      setload(true);
      const token = localStorage.getItem("token");
  
      if (token) {
        const user = jwtDecode(token);
        fetchItems(user); // Fetch with user context
      } else {
        fetchItems(); // Fetch without user
      }
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(()=>{
    const fetchWishlist = async()=>{
      try {
        const response = await axios.get(
          `${url}item/get-wishlist`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
          }
          }
        );
        if (response.status === 200) {
          const items = response?.data?.data?.wishlist || [];
          dispatch(setWishlist(items));
        }
      } catch (err) {
        console.error(err);
      } 
    }
    if(localStorage.getItem('token')){
      fetchWishlist();
    }
  },[])

  return (
    <div className="w-full px-3 py-6">
      {/* Header with Buttons */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            <FaArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            <FaArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="scrollbar flex overflow-x-auto gap-4 mb-4 scroll-smooth scrollbar-hide scrollbar-[red]"
        style={{ scrollBehavior: "smooth" }}
      >
        {!load
          ? allItems.slice(0, 8).map((item, i) => (
              <div
                key={i}
                className="min-w-[250px] h-[380px]  flex items-center  cursor-pointer"
              >
                {load ? (
                  <Card isLoading={true} style1={true} />
                ) : (
                  <Card item={item} style1={true} isLoading={false} />
                )}
              </div>
            ))
          : [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="min-w-[200px] h-[380px] flex items-center justify-center cursor-pointer"
              >
                {<Card isLoading={true} style1={true} />}
              </div>
            ))}
        <div
          className="min-w-[200px] text-black hover:text-[blue] h-[340px] mt-4 flex items-center justify-center cursor-pointer"
          onClick={() => nav("/explore-rentals")}
        >
          See More
        </div>
      </div>
    </div>
  );
};

export default Items;
