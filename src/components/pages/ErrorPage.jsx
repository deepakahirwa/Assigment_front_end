import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-0 md:p-0">
            <div className="mb-2 md:mb-2">
                <img
                    src="https://res.cloudinary.com/drczsu4ej/image/upload/v1726138308/error-404_kj6riz.jpg"
                    alt="404-Scarecrow"
                    className="w-full max-w-md md:max-w-lg"
                />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 md:text-3xl  font-mono">I have bad news for you</h2>
                <p className="text-lg text-gray-700 mb-6 md:text-xl font-mono ">
                    The page you are looking for might be removed or is temporarily unavailable
                </p>
                <Link
                    to="/"

                >

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors md:text-sm md:py-1.5">Back to homepage</button>

                </Link>

            </div>
        </div>
    );
}


