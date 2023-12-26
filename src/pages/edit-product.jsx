import ProductForm from "components/product/ProductForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  // console.log(id);
  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(`http://localhost:8000/products/${id}`, data)
      .then((response) => {
        console.log("success");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="card">
      <div className="card-header" data-testid="card-header">
        ویرایش محصول
      </div>
      <div className="card-body">
        <ProductForm onSubmit={onSubmit} mode="edit" />
      </div>
    </div>
  );
};

export default EditProduct;
