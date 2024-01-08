// TODO: copy codes from the ProductForm component here...
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({ onSubmit, mode = "add" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { id } = useParams();

  const getProductInfo = () => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setValue("name", response.data.name);
        setValue("price", response.data.price);
        setValue("category", response.data.category);
        setValue("description", response.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (mode === "edit") getProductInfo();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(
        (data) => onSubmit(data),
        (error) => {
          console.log(error);
        }
      )}
    >
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="name-input" className="form-label">
            نام محصول
          </label>
          <input
            type="text"
            {...register("name", {
              required: "وارد کردن نام محصول اجباری است",
            })}
            className={`form-control${errors.name ? " is-invalid" : ""}`}
            data-testid="name-input"
            placeholder="گوشی آیفون"
          />
          {/* <div className="invalid-feedback"></div> */}
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="price-input" className="form-label">
            قیمت
          </label>
          <input
            type="number"
            {...register("price", {
              required: "وارد کردن قیمت اجباری است",
              min: {
                value: 100,
                message: "مقدار قیمت باید حداقل 100 باشد",
              },
            })}
            className={`form-control${errors.price ? " is-invalid" : ""}`}
            data-testid="price-input"
            placeholder="1000"
          />
          {/* <div className="invalid-feedback"></div> */}

          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="form-group col-md-6">
          <label htmlFor="category-select" className="form-label">
            دسته‌بندی
          </label>
          <select
            className="form-select"
            data-testid="category-select"
            {...register("category")}
          >
            <option value="mobile">موبایل</option>
            <option value="book">کتاب</option>
            <option value="tshirt">تیشرت</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="description-textarea" className="form-label">
            توضیحات
          </label>
          <textarea
            className={`form-control${errors.description ? " is-invalid" : ""}`}
            {...register("description")}
            data-testid="description-textarea"
            rows="3"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 float-start"
        data-testid="submit-button"
      >
        {mode === "edit" ? "ویرایش" : "افزودن"} محصول
      </button>
    </form>
  );
};

export default ProductForm;
