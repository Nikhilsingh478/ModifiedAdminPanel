import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  RegisterUserReducer,
  LoginUserReducer,
} from "./redux/reducers/userReducer";
import {
  categoryListReducer,
  subCategoryListReducer,
  addSubCategoryReducer,
  addPrimaryCategoryReducer,
  updatePrimaryCategoryReducer,
  updateSubCategoryReducer,
  updatePrimaryCateImageReducer,
  updateSubCateImageReducer,
  allPrimaryCateListReducer,
  allSubCateListReducer
} from "./redux/reducers/admin/categoryReducer";
import {
  brandListReducer,
  addBrandReducer,
} from "./redux/reducers/admin/brandReducer";
import {
  addProductReducer,
  adminProductListReducer,
  adminSubProductListReducer,
  addSubProductReducer,
  updateProductReducer,
  updateSubProductReducer,
  updateProdImageReducer,
  updateSubProdImageReducer,
  allProductsListReducer,
} from "./redux/reducers/admin/adminProductReducer";
import {
  customerListReducer,
  activeInactiveUserReducer,
  customerImgReducer,
} from "./redux/reducers/admin/adminCustomerReducer";
import {
  keywordListReducer,
  addKeywordsReducer,
  updateKeywordReducer
} from "./redux/reducers/admin/keywordReducer";
import {
  ordersListReducer,
  orderDetailReducer,
  orderCancelReducer,
  orderStatusListReducer,
  UpdateOrderStatusReducer,
} from "./redux/reducers/admin/adminOrderReducer";
import {
  hsnCodeListReducer,
  addHsnCodeReducer,
} from "./redux/reducers/admin/hsnCodeReducer";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const rootReducer = combineReducers({
  RegisterUserReducer: RegisterUserReducer,
  LoginUserReducer: LoginUserReducer,
  categoryList: categoryListReducer,
  subCategoryList: subCategoryListReducer,
  addSubCategory: addSubCategoryReducer,
  brandsList: brandListReducer,
  adminProdList: adminProductListReducer,
  addProduct: addProductReducer,
  updateProduct: updateProductReducer,
  addPrimaryCategory: addPrimaryCategoryReducer,
  updatePrimaryCategory: updatePrimaryCategoryReducer,
  subProductList: adminSubProductListReducer,
  updateSubProduct: updateSubProductReducer,
  addSubProduct: addSubProductReducer,
  updateSubCategory: updateSubCategoryReducer,
  customersList: customerListReducer,
  customerImgData: customerImgReducer,
  activeInactiveCustomer: activeInactiveUserReducer,
  keywordsList: keywordListReducer,
  addBrand: addBrandReducer,
  addKeywords: addKeywordsReducer,
  ordersList: ordersListReducer,
  orderDetail: orderDetailReducer,
  orderCancel: orderCancelReducer,
  orderStatus: orderStatusListReducer,
  changeOrderStatus: UpdateOrderStatusReducer,
  hsncodeList: hsnCodeListReducer,
  addHSN: addHsnCodeReducer,
  updateKey : updateKeywordReducer,
  updatePrimaryCateImg:updatePrimaryCateImageReducer,
  updateSubCateImg : updateSubCateImageReducer,
  updateProdImg : updateProdImageReducer,
  updateSubProdImg : updateSubProdImageReducer,
  allPRMCateList : allPrimaryCateListReducer,
  allSubCateList : allSubCateListReducer,
  allProductsList: allProductsListReducer,
});

const initialState = {
  LoginUserReducer: {
    userInfo: userInfo,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
