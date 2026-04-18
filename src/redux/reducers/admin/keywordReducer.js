//get all the keywords
export const keywordListReducer = (state = { keywords: [] }, action) => {
  switch (action.type) {
    case "KEYWORDS_LIST_REQUEST":
      return { loading: true };

    case "KEYWORDS_LIST_SUCCESS":
      return { loading: false, keywords: action.payload };

    case "KEYWORDS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add the Keywords
export const addKeywordsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_KEYWORDS_REQUEST":
      return { loading: true };

    case "ADD_KEYWORDS_SUCCESS":
      return { loading: false, success: true };

    case "ADD_KEYWORDS_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_KEYWORDS_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};

//update keyword
export const updateKeywordReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_KEYWORD_REQUEST":
      return { updateLoading: true };

    case "UPDATE_KEYWORD_SUCCESS":
      return { updateLoading: false, updateSuccess: true };

    case "UPDATE_KEYWORD_FAIL":
      return { updateLoading: false, updateError: action.payload };

    case "UPDATE_KEYWORD_RESET":
      return { updateSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};
