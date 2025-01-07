import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <div className="flex justify-end mt-8 mr-8">
          <button
            onClick={async () => await loginWithRedirect()}
            className="border-2 p-2 rounded-md hover:bg-black hover:text-white"
          >
            Log In
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex justify-end mt-8 mr-8">
          <button
            onClick={async () => logout()}
            className="border-2 p-2 rounded-md hover:bg-black hover:text-white"
          >
            Log Out
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div className="flex justify-center container px-16 mt-16">
          <div className="flex flex-col gap-4 ">
            <Link
              to="/bid-page"
              className="border-2 border-black text-center w-40 h-10 flex justify-center items-center hover:border-blue-500"
            >
              ליצור הצעת מחיר
            </Link>

            <Link
              to="/hotels"
              className="border-2 border-black text-center w-40 h-10 flex justify-center items-center  hover:border-blue-500"
            >
              בתי מלון
            </Link>

            <Link
              to="/ready-bids"
              className="border-2 border-black text-center w-40 h-10 flex justify-center items-center hover:border-blue-500"
            >
              הצעות מחיר מוכנות
            </Link>
            <Link
              to="/voucher"
              className="border-2 border-black text-center w-40 h-10 flex justify-center items-center hover:border-blue-500"
            >
              ליצור וואוצ׳ר
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
