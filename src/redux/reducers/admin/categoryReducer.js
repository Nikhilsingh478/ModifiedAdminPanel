//get all the primary category
export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case "CATEGORY_LIST_REQUEST":
      return { loading: true };

    case "CATEGORY_LIST_SUCCESS":
      return { loading: false, category: action.payload };

    case "CATEGORY_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//get all the subcategory
export const subCategoryListReducer = (state = { subCategory: [] }, action) => {
  switch (action.type) {
    case "SUBCATEGORY_LIST_REQUEST":
      return { loading: true };

    case "SUBCATEGORY_LIST_SUCCESS":
      return { loading: false, subCategory: action.payload };

    case "SUBCATEGORY_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add the primary category
export const addPrimaryCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRIMARYCATEGORY_REQUEST":
      return { loading: true };

    case "ADD_PRIMARYCATEGORY_SUCCESS":
      return { loading: false, success: true };

    case "ADD_PRIMARYCATEGORY_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_PRIMARYCATEGORY_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};

//add the sub category
export const addSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SUBCATEGORY_REQUEST":
      return { loading: true };

    case "ADD_SUBCATEGORY_SUCCESS":
      return { loading: false, success: true };

    case "ADD_SUBCATEGORY_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_SUBCATEGORY_RESET":
      return { success: null };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};

//update the primary category
export const updatePrimaryCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRIMARYCATEGORY_REQUEST":
      return { updateLoading: true };

    case "UPDATE_PRIMARYCATEGORY_SUCCESS":
      return { updateLoading: false, updateSuccess: true };

    case "UPDATE_PRIMARYCATEGORY_FAIL":
      return { updateLoading: false, updateError: action.payload };

    case "UPDATE_PRIMARYCATEGORY_RESET":
      return { updateSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//update the sub category
export const updateSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUBCATEGORY_REQUEST":
      return { updateLoading: true };

    case "UPDATE_SUBCATEGORY_SUCCESS":
      return { updateLoading: false, updateSuccess: true };

    case "UPDATE_SUBCATEGORY_FAIL":
      return { updateLoading: false, updateError: action.payload };

    case "UPDATE_SUBCATEGORY_RESET":
      return { updateSuccess: null };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//update primary category image
export const updatePrimaryCateImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRIMARYCATEIMG_REQUEST":
      return { updateImgLoading: true };

    case "UPDATE_PRIMARYCATEIMG_SUCCESS":
      return { updateImgLoading: false, updateImgSuccess: true };

    case "UPDATE_PRIMARYCATEIMG_FAIL":
      return { updateImgLoading: false, updateImgError: action.payload };

    case "UPDATE_PRIMARYCATEIMG_RESET":
      return { updateImgSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//update SUB category image
export const updateSubCateImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUBCATEIMG_REQUEST":
      return { updateImgLoading: true };

    case "UPDATE_SUBCATEIMG_SUCCESS":
      return { updateImgLoading: false, updateImgSuccess: true };

    case "UPDATE_SUBCATEIMG_FAIL":
      return { updateImgLoading: false, updateImgError: action.payload };

    case "UPDATE_SUBCATEIMG_RESET":
      return { updateImgSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};


//get all the primary category (without pagination)
export const allPrimaryCateListReducer = (state = { allCategory: [] }, action) => {
  switch (action.type) {
    case "PRMCATEGORY_LIST_REQUEST":
      return { loading: true };

    case "PRMCATEGORY_LIST_SUCCESS":
      return { loading: false, allCategory: action.payload };

    case "PRMCATEGORY_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



//get all the subcategory(without pagination)
export const allSubCateListReducer = (state = { allSubCate: [] }, action) => {
  switch (action.type) {
    case "ALLSUBCATE_LIST_REQUEST":
      return { loading: true };

    case "ALLSUBCATE_LIST_SUCCESS":
      return { loading: false, allSubCate: action.payload };

    case "ALLSUBCATE_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
