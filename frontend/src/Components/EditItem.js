import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";

const categories = {
  CARS: ["Sedan", "SUV", "Hatchback"],
  BIKES: ["Sport", "Cruiser", "Off-road"],
  PROPERTIES: ["Apartment", "Villa", "Plot"],
  ELECTRONICS: ["Mobile", "Laptop", "Camera"],
  FURNITURE: ["Sofa", "Table", "Chair"],
};

const item = null;

export default function EditItem() {
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();
  const [load, setload] = useState(true);
  const { itemId } = useParams();
  const [itemDetails, setitemDetails] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${url}item/get-item-details/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      if (response.status === 200) {
        const item = response?.data?.data?.item || [];
        setitemDetails(item);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [url]);

  const [formData, setFormData] = useState({
    title: "loading...",
    description: "loading...",
    price: "loading...",
    category: "loading...",
    subcategory: "loading...",
    location: "loading...",
    images: [],
  });

  useEffect(() => {
    if (itemDetails) {
      setFormData({
        title: itemDetails.title || "Loading...",
        description: itemDetails.description || "Loading...",
        price: itemDetails.price || "000",
        category: itemDetails.category || "Loading...",
        subcategory: itemDetails.subcategory || "Loading...",
        location: itemDetails.location || "Loading...",
        images: itemDetails.images || [],
      });
    }
  }, [itemDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (formData?.images?.length + files?.length > 5) {
      return;
    }

    try {
      const base64Images = await Promise.all(
        files?.map((file) => setFileToBase(file))
      );
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...base64Images],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject("No file selected");
      }

      const maxSize = 6000 * 1024; // 500 KB limit

      if (file.size > maxSize) {
        seterrorMessage(
          "File size is too large. Please upload an image smaller than 1MB."
        );
        return reject(
          "File size is too large. Please upload an image smaller than 500KB."
        );
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set max width/height to prevent oversized images
          const maxWidth = 500;
          const maxHeight = 500;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
          resolve(compressedBase64);
        };

        img.onerror = (err) => reject(err);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageRemove = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.category ||
      !formData.description ||
      !formData.location ||
      !formData.price ||
      !formData.subcategory ||
      !formData.title
    ) {
      seterrorMessage("Please fill in all fields");
      return;
    }
    if (formData.images.length === 0) {
      seterrorMessage("Atleast one image should select.");
      return;
    }

    setisLoading(true);
    try {
      const response = await axios.post(
        `${url}item/edit-item/${itemId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        seterrorMessage("");
        const user = jwtDecode(token);
        if (user?.role === "business") {
          navigate("/business/items");
        } else {
          navigate("/myads");
        }
      }
    } catch (error) {
      console.log(error);
      seterrorMessage(error?.data ? error?.data?.message : error?.message);
    } finally {
      setisLoading(false);
      localStorage.removeItem("editItem");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 rounded-lg border border-gray-100">
      <h2 className="text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)]">
        {item ? "EDIT ITEM" : "POST YOUR ADD"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData?.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-[rgba(5,10,27,0.33)] rounded"
        />
        <textarea
          name="description"
          value={formData?.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-[rgba(5,10,27,0.33)] p-2 rounded"
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData?.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border border-[rgba(5,10,27,0.33)] rounded"
        />
        <div className="flex space-x-2">
          <select
            name="category"
            value={formData?.category}
            onChange={handleChange}
            className="w-1/2 p-2 border border-[rgba(5,10,27,0.33)] rounded"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            name="subcategory"
            value={formData?.subcategory}
            onChange={handleChange}
            className="w-1/2 p-2 border border-[rgba(5,10,27,0.33)] rounded"
          >
            <option value="">Select Subcategory</option>
            {formData?.category &&
              categories[formData?.category]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border border-[rgba(5,10,27,0.33)] rounded"
        />

        <h3 className="font-bold">Upload up to 5 Photos</h3>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto p-2 border rounded border-[rgba(5,10,27,0.33)]">
          {formData?.images?.map((img, index) => (
            <div key={index} className="relative sm:w-24 sm:h-24 w-20 h-20">
              <img
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt="upload"
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
          {[...Array(5 - formData?.images?.length)].map((_, i) => (
            <label
              key={i}
              className="sm:w-24 sm:h-24 w-20 h-20 flex items-center justify-center border border-[rgba(5,10,27,0.33)] rounded cursor-pointer bg-gray-100 hover:bg-gray-200"
            >
              <FaCamera size={24} className="text-gray-500" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ))}
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm block ml-2 mt-2">
            {errorMessage}
          </span>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? <Spinner /> : "Update Item"}
        </button>
      </form>
    </div>
  );
}
