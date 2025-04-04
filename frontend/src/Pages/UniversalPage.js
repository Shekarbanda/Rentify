import { useNavigate } from "react-router";

const UniversalPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-500">Oops! Wrong Turn 😵</h1>
        <p className="mt-4 text-gray-700">
          Uh-oh! 🚧 This URL took a wrong turn. Maybe it’s lost… or just playing
          hide and seek? 🤔 Try again!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default UniversalPage;
