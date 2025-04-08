import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { FaHeartBroken, FaSearch, FaUndo } from "react-icons/fa";
import {
  setCategories,
  setFilters,
  setLocation,
  setSearch,
} from "../Redux/Slices/CategorySlice";
import { setAllItemsState, setWishlist } from "../Redux/Slices/ItemSlice";
import { useNavigate } from "react-router";

export default function FreshCards({ iswishlist }) {
  const [cardCount, setCardCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const url = useSelector((state) => state.api.value);
  const [allItems, setAllItems] = useState([]);
  const category = useSelector((state) => state.Category.value);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.Category.search);
  const location = useSelector((state) => state.Category.location);
  const wishlist = useSelector((state) => state.Item.wishlist);
  const navigate = useNavigate();
  const itemsfromstate = useSelector((state) => state.Item.allItems);
  const filters = useSelector((state) => state.Category.filters);
  const prevloc = useSelector((state) => state.Category.prevLoc);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCardCount((prevCount) => Math.min(prevCount + 12, allItems.length)); // Ensure it doesn't exceed available items
      setLoading(false);
    }, 1000);
  };

  const fetchItems = async (user) => {
    setLoad(true);
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(`${url}item/get-wishlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const items = response?.data?.data?.wishlist || [];
          dispatch(setWishlist(items));
          setCardCount(Math.min(12, items.length)); // Start with at most 12 items
        }
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const response = await axios.post(
        `${url}item/get-all-items`,
        {
          userId: user?.userId,
        },
        {
          params: {
            category: category || "", // Send category if provided
            search: search || "", // Send search query if provided
            location: location || "",
          },
        }
      );
      if (response.status === 200) {
        const items = response?.data?.data?.items || [];
        setAllItems(items);

        setCardCount(Math.min(12, items.length));
        if (items.length !== 0) {
          dispatch(setCategories(""));
        }
        if (!search) {
          const categorized = { ALL: items };

          items.forEach((item) => {
            const cat = item.category || "Other";
            if (!categorized[cat]) categorized[cat] = [];
            categorized[cat].push(item);
          });

          // Dispatch each category's filter data
          Object.entries(categorized).forEach(([cat, items]) => {
            dispatch(setFilters({ filter: cat, data: items }));
          });
        }

        // Start with at most 12 items
      }
    } catch (err) {
      dispatch(setCategories(""));
      console.error(err);
    } finally {
      setLoad(false);
    }
  };

  const handleEmpty = () => {
    if (iswishlist) {
      navigate("/explore-rentals");
    } else {
      dispatch(setCategories(""));
      dispatch(setSearch(""));
      dispatch(setCategories("ALL"));
    }
  };

  useEffect(() => {
    const shouldFetch = search || !filters["ALL"];

    if (shouldFetch) {
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwtDecode(token);
        fetchItems(user);
        // Fetch with user context
      } else {
        fetchItems();
      }
    } else {
      setAllItems(filters[category] || []);

      setCardCount(Math.min(12, filters[category]?.length));
    }
  }, [category, search, location]);

  return (
    <>
      <div className="grid grid-cols-2 xs:grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {(iswishlist ? wishlist?.length : allItems?.length) > 0 && !load
          ? (iswishlist ? wishlist : allItems)
              .slice(0, cardCount)
              .map((item, i) => (
                <div className="cursor-pointer" key={item.id || i}>
                  {load ? (
                    <Card isLoading={true} />
                  ) : (
                    <Card
                      isLoading={false}
                      item={item}
                      iswishlist={iswishlist}
                    />
                  )}
                </div>
              ))
          : load &&
            [...Array(12)].map((_, i) => (
              <div className="cursor-pointer" key={`placeholder-${i}`}>
                <Card isLoading={true} />
              </div>
            ))}
      </div>
      {(iswishlist ? wishlist?.length : allItems?.length) === 0 && !load && (
        <div className="flex w-full flex-col items-center justify-center text-center p-6">
          {iswishlist ? (
            <FaHeartBroken className="text-gray-400 text-6xl mb-4 animate-pulse" />
          ) : (
            <FaSearch className="text-gray-400 text-6xl mb-4 animate-pulse" />
          )}
          <h2 className="text-2xl font-semibold text-gray-700">
            {iswishlist
              ? "💔 Oops! Your wishlist is feeling a little lonely."
              : "No results found! 😞"}
          </h2>
          <p className="text-gray-500 mt-2">
            {iswishlist
              ? "Your wishlist is empty. Start adding items you love! ❤️"
              : "Try a different search, adjust the filters, or check your spelling."}
          </p>
          <button
            onClick={handleEmpty}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            {iswishlist ? (
              <>
                <FaSearch className="text-lg" />
                Discover
              </>
            ) : (
              <>
                <FaUndo className="text-lg" /> Reset Filters
              </>
            )}
          </button>
        </div>
      )}

      {/* Show "Load More" only if there are more items to load */}
      {(iswishlist ? wishlist?.length : allItems?.length) > cardCount && (
        <div className="flex justify-center mt-5">
          <button
            className="bg-[#002f34] text-white px-6 py-3 rounded-md my-4 mt-6 hover:bg-[rgb(3,80,150)] transition disabled:opacity-50"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
