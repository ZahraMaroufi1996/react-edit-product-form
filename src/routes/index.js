import DefaultLayout from "layouts/Default";
import EditProduct from "pages/edit-product";

const indexRoutes = [{ path: "/", component: DefaultLayout }];

const AppRoutes = [
  // TODO: add edit product route here...
  {
    // path: "/",
    path: "/products/:id/edit",
    name: "Products",
    component: EditProduct,
    icon: "fa fa-plus",
    private: true,
    showInNav: false,
  },
  { path: "/", pathTo: "/products/1/edit", name: "Products", redirect: true },
];

export default AppRoutes;

export { indexRoutes };
