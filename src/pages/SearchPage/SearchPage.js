import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import CardItem from "../../components/cardItem/CardItem";
import productCallApi from "../../utils/apiCaller";

const SearchPage = () => {
  const { name } = useParams();
  //   console.log(name);
  const [products, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const toastMess = (type, mess) => {
    if (type === "err") {
      toast.error(mess);
    } else {
      toast.success(mess);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      await productCallApi("search/", "post", { name: name })
        .then((res) => {
          //console.log(res.data);
          setProduct(res.data);
          console.log(products);
        })
        .catch((err) => {
          toast.error("Không có sản phẩm tương ứng");
        })
        .finally(() => {
          setLoading(false);
          console.log(products);
        });
    };
    getProducts();
  }, [name]);
  const showCardItem = () => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <CardItem key={index} product={product} toastMess={toastMess} />;
      });
    } else {
      toast.error("Không có sản phẩm tương ứng");
    }
    return result;
  };
  return (
    <>
      <div>
        <ToastContainer />
        {loading ? (
          <div className="container mt-10">
            <div className="spinner-border text-primary m-a" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="container mt-10">
              <div className="text-center">
                <div className="row" id="itemContent">
                  {showCardItem()}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
