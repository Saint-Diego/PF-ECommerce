import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  POST_CREATE_CATEGORY,
  ORDER_NAME,
  ORDER_PRICE,
  RESET_DETAIL,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
  FILTER_PRICE,
  LOGIN,
  REGISTER,
  SET_STATUS,
  LOGOUT,
  DELETE_BOOKS,
  GET_USERS,
  DELETE_USER,
  DELETE_CATEGORY,
  RESET_USER,
  LOGIN_WITH_GOOGLE,
  ADD_CART,
  POST_CART,
  GET_CART,
  DELETE_CART,
  ORDER_DELETE_BOOK,
  SEARCH_DELETE_BOOK,
  RESET_DELETE_BOOKS,
  GET_RECORD_ORDERS,
  FILTER_DISPONIBILITY,
  GET_BOOK_REVIEWS,
  POST_BOOK_REVIEW,
  RESET_BOOK_REVIEWS,
  GET_USERS_REVIEWS,
  RESET_USERS_REVIEWS,
  ORDER_USERS,
  SEARCH_USERS
} from "./types.js";
import axios from "axios";

const direction = "http://localhost:3001" || "http://api.pfecommerce.ddns.net";

export const getBooks = () => async (dispatch) => {
  let dataBooks = await axios(`${direction}/shop/books`);
  return dispatch({
    type: GET_BOOKS,
    payload: dataBooks.data,
  });
};


export const getDetailBook = (id) => async (dispatch) => {
  let bookDetail = await axios(`${direction}/shop/book/${id}`);

  return dispatch({
    type: GET_DETAIL_BOOK,
    payload: bookDetail.data,
  });
};


export const resetDetail = () => ({ type: RESET_DETAIL });


export function getAllCategories() {
  return async (dispatch) => {
    let res = await axios.get(`${direction}/shop/categories`);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  };
}


export function postCreateBook(input) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      var res = await axios.post(`${direction}/admin/create-book`, input);
      return dispatch({
        type: POST_CREATE_BOOK,
        payload: res.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}


export function postCreateCategory(input) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      var res = await axios.post(`${direction}/admin/create-category`, input);
      return dispatch({
        type: POST_CREATE_CATEGORY,
        payload: res.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}


export function orderName(order) {
  return {
    type: ORDER_NAME,
    payload: order,
  };
}


export function orderPrice(order) {
  return {
    type: ORDER_PRICE,
    payload: order,
  };
}


export function OrderDeleteBook(order) {
  return {
    type: ORDER_DELETE_BOOK,
    payload: order,
  };
}


export function filterPrice(price) {
  return {
    type: FILTER_PRICE,
    payload: price,
  };
}


export function categoryBooks(category) {
  return async (dispatch) => {
    let res = await axios.get(
      `${direction}/shop/booksCategory?name=${category}`
    );
    return dispatch({
      type: CATEGORY_BOOKS,
      payload: res.data,
    });
  };
}


export const resetCategoryBooks = () => ({ type: RESET_CATEGORY_BOOKS });


export function searchBook(book) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Cargando"));
      var res = await axios.get(`${direction}/shop/books/filter?value=${book}`);
      return dispatch({
        type: SEARCH_BOOK,
        payload: res.data,
      });
    } catch (e) {
      return console.log(res);
    }
  };
}


export function login(body) {
  return async (dispatch) => {
    let res = await axios.post(`${direction}/users/login`, body);

    return dispatch({
      type: LOGIN,
      payload: res.data,
    });
  };
}


export function deleteBook(idBook) {
  return async (dispatch) => {
    let res = await axios.delete(`${direction}/admin/books/${idBook}`);
    return dispatch({
      type: DELETE_BOOKS,
      payload: res.data,
    });
  };
}


export function searchDeleteBook(search) {
  return {
    type: SEARCH_DELETE_BOOK,
    payload: search,
  };
}


export function register(body) {
  console.log(body);
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      let res = await axios.post(`${direction}/users/register`, body);
      return dispatch({
        type: REGISTER,
        payload: res.data.status
          ? "Usuario se guardo correctamente"
          : res.data.messsage,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}


export function setStatus(mensaje) {
  return {
    type: SET_STATUS,
    payload: mensaje,
  };
}


export function filterDisponibility(disponibility) {
  return {
    type: FILTER_DISPONIBILITY,
    payload: disponibility,
  };
}


export function resetDeleteBooks() {
  return {
    type: RESET_DELETE_BOOKS,
  };
}


export const resetSearchBook = () => ({ type: RESET_SEARCH_BOOK });


export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};


export const getUsers = () => async (dispatch) => {
  let dataUsers = await axios(`${direction}/users/allUsers`);
  return dispatch({
    type: GET_USERS,
    payload: dataUsers.data,
  });
};


export const deleteUser =
  (idUser, data = { isActive: "false" }) =>
    async (dispatch) => {
      let usersActive = await axios.put(`${direction}/users/${idUser}`, data);
      return dispatch({
        type: DELETE_USER,
        payload: usersActive.data,
      });
    };


export function deleteCategory(idCategory) {
  return async (dispatch) => {
    const res = await axios.delete(`${direction}/admin/category/${idCategory}`);
    return dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
  };
}
// (idUser, data = { isActive: "false" }) =>

export const resetUser =
  (idUser, data = { isActive: "true" }) =>
    async (dispatch) => {
      let users = await axios.put(`${direction}/users/${idUser}`, data);
      return dispatch({
        type: RESET_USER,
        payload: users.data,
      });
    };


export function loginWithGoogle(info) {
  return async (dispatch) => {
    const response = await axios.post(`${direction}/users/google`, info);

    return dispatch({
      type: LOGIN_WITH_GOOGLE,
      payload: response.data,
    });
  };
}


export function addCart(book) {
  return {
    type: ADD_CART,
    payload: book,
  };
}


export function postCart(cart) {
  return async (dispatch) => {
    try {
      var res = await axios.post(`${direction}/cart/cartUser`, cart);
      return dispatch({
        type: POST_CART,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}


export function getCart(email) {
  return async (dispatch) => {
    let res = await axios.get(`${direction}/cart/cartUser?email=${email}`);
    return dispatch({
      type: GET_CART,
      payload: res.data.data,
    });
  };
}

export function deleteCart(email) {
  return async (dispatch) => {
    let res = await axios.put(`${direction}/cart/cartUser?email=${email}`);
    return dispatch({
      type: DELETE_CART
    });
  };
}

export function getBookReviews(bookId) {
  return async (dispatch) => {
    try {
      var res = await axios.get(`${direction}/reviews/${bookId}/all-reviews`);
      return dispatch({
        type: GET_BOOK_REVIEWS,
        payload: res.data,
      });
    } catch (e) {
      console.log("Error in bookId");
    }
  };
}


export function postReview(data) {
  return async (dispatch) => {
    try {
      var res = await axios.post(
        `${direction}/reviews/add-review/${data.bookId}/${data.userId}/${data.userName}`,
        { comment: data.commentUser, score: data.score }
      );
      return dispatch({
        type: POST_BOOK_REVIEW,
        payload: res.data,
      });
    } catch (e) {
      console.log("Error in Data");
    }
  };
}


export function getRecordOrders(idUser) {
  return async (dispatch) => {
    let res = await axios.get(`${direction}/checkout/orders/${idUser}`)
    return dispatch({
      type: GET_RECORD_ORDERS,
      payload: res.data
    })
  }
}


export const resetBookReviews = () => ({ type: RESET_BOOK_REVIEWS });

export const getUsersReviews = () => async (dispatch) => {
  let dataUsers = await axios(`${direction}/users/allUsers`);
  return dispatch({
    type: GET_USERS_REVIEWS,
    payload: dataUsers.data,
  });
};


export const resetUsersReviews = () => ({ type: RESET_USERS_REVIEWS });


export function orderUsers(order) {
  return {
    type: ORDER_USERS,
    payload: order,
  };
}


export function searchUsers(search){
  return {
    type: SEARCH_USERS,
    payload: search
  }
}

// export function orderName(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/order?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_NAME,
//       payload: res.data,
//     });
//   };
// }

// export function orderPriece(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/orderprice?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_PRIECE,
//       payload: res.data,
//     });
//   };
// }
