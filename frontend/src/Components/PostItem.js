import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import imageCompression from "browser-image-compression";

const categories = {
  CARS: ["Sedan", "SUV", "Hatchback"],
  BIKES: ["Sport", "Cruiser", "Off-road"],
  PROPERTIES: ["Apartment", "Villa", "Plot"],
  ELECTRONICS: ["Mobile", "Laptop", "Camera"],
  FURNITURE: ["Sofa", "Table", "Chair"],
  SPORTS: [],
  EVENT_RENTALS: [],
  SERVICE: [],
};

const location = ["Hyderabad", "Bangalore"];

const item = null;

export default function PostItem() {
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    location: "",
    images: [],
    availability : ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        price: item.price || "",
        category: item.category || "",
        subcategory: item.subcategory || "",
        location: item.location || "",
        images: item.images || [],
        availability: item.availability || ""
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;
    const maxSizeMB = 5;
  
    // Check total images limit
    if (formData.images.length + files.length > maxImages) {
      seterrorMessage(
        `Cannot add more than ${maxImages} images. Current: ${formData.images.length}, Trying to add: ${files.length}`
      );
      return;
    }
  
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const validCompressedImages = [];
  
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        seterrorMessage(`Only JPEG, PNG, WEBP, and JPG files are allowed.`);
        return;
      }
  
      if (file.size > maxSizeMB * 1024 * 1024) {
        seterrorMessage(`File "${file.name}" exceeds 5MB size limit.`);
        return;
      }
  
      try {
        const options = {
          maxSizeMB: 1, // Compress to ~1MB max
          maxWidthOrHeight: 1000,
          useWebWorker: true,
        };
  
        const compressedFile = await imageCompression(file, options);
        validCompressedImages.push(compressedFile);
      } catch (err) {
        console.error("Compression error:", err);
        seterrorMessage("Image compression failed.");
        return;
      }
    }
  
    seterrorMessage("");
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...validCompressedImages],
    }));
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
      !formData.title ||
      !formData.availability
    ) {
      seterrorMessage("Please fill in all fields");
      return;
    }
    if (formData.images.length === 0) {
      seterrorMessage("Atleast one image should select.");
      return;
    }
    const newFormData = new FormData();

  // Append the required text fields
  newFormData.append("category", formData.category);
  newFormData.append("description", formData.description);
  newFormData.append("location", formData.location);
  newFormData.append("price", formData.price);
  newFormData.append("subcategory", formData.subcategory);
  newFormData.append("title", formData.title);
  newFormData.append("availability",formData.availability);

  // Append the images array (assuming images is an array of File objects)
  if (formData.images && formData.images.length > 0) {
    formData.images.forEach((image, index) => {
      if (image?.type === 'image/jpeg') {
        newFormData.append(`images`, image);
      } else {
        newFormData.append("oldImages", image);
      } // Name each file as images[0], images[1], etc.
    });
  }
    setisLoading(true);
    try {
      const response = await axios.post(`${url}user/post-item`, newFormData, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
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
      console.error(error);
      seterrorMessage(error?.data ? error?.data?.message : error?.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 rounded-lg border border-gray-100">
      <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)]">
        {item ? "EDIT ITEM" : "POST YOUR ADD"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-[rgba(5,10,27,0.33)] rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-[rgba(5,10,27,0.33)] p-2 rounded"
        ></textarea>
        <div className="relative w-full">
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleChange}
    placeholder="Price per day"
    className="w-full pr-16 p-2 border border-[rgba(5,10,27,0.33)] rounded"
  />
  <span className="absolute top-1/2 right-3 transform -translate-y-1/2  text-gray-600 pointer-events-none">
    /day
  </span>
</div>

        <div className="flex space-x-2">
          <select
            name="category"
            value={formData.category}
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
            value={formData.subcategory}
            onChange={handleChange}
            className="w-1/2 p-2 border border-[rgba(5,10,27,0.33)] rounded"
          >
            <option value="">Select Subcategory</option>
            {formData.category &&
              categories[formData.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border border-[rgba(5,10,27,0.33)] rounded"
        >
          <option value="">Select Location</option>
          {location &&
            location.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
        </select>
        <div class="my-4">
  <label for="availability-date" class="block text-sm font-medium text-gray-700 mb-1">
  Availability Until (future dates only)
  </label>
  <input
    type="date"
    name="availability"
    onChange={(e)=>handleChange(e)}
    min={new Date().toISOString().split("T")[0]}
    value={formData?.availability}
    id="availability-date"
    class="w-full  px-4 py-2 border-2  rounded bg-white text-gray-800 shadow-sm  transition duration-300"
  />
</div>


        <h3 className="font-bold">Upload up to 5 Photos</h3>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto p-2 border rounded border-[rgba(5,10,27,0.33)]">
          {formData.images.map((img, index) => (
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
          {[...Array(5 - formData.images.length)].map((_, i) => (
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
          {isLoading ? <Spinner /> : item ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
}
