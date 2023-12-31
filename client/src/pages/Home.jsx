import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Navigation]);
  // console.log(offerListings);
  useEffect(() => {
    setLoading(true);
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?underOffer=true&limit=4");
        const data = await res.json();
        console.log(data);
        setOfferListings(data);
        fetchRentListings();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?purchaseType=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?purchaseType=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {" "}
      {/* top */}
      <div className="flex flex-col gap-6 pt-20 pb-10 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          <span className="font-bold">
            <span className="text-slate-500">move</span>
            <span className="text-slate-900">-in</span>
          </span>{" "}
          Real Estate is the best place to meet realtors and find already
          furnished homes that are close to your workplace without worrying
          about purchasing brand new furniture.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s get you a home...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {saleListings &&
          saleListings.length > 0 &&
          saleListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sale and rent */}
      {loading ? (
        <div className="w-full p-10">
          <ScaleLoader className="text-center my-7 text-2xl" color="#808080" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Under offer
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?underOffer=true"}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?purchaseType=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?purchaseType=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
