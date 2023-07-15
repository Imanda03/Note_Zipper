import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import { message } from "antd";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("http://localhost:8080/api/user/login", {
      email,
      password,
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    message.success("Login Successful");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? message.error(error.response.data.message)
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
};

export const register = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/user/register",
      {
        email,
        password,
        name,
      }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    message.success("Register Successful");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? message.error(error.response.data.message)
          : error.message,
    });
  }
};

export const updateProfile =
  ({ id, name, email }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`http://localhost:8080/api/user/${id}`, {
        name,
        email,
      });

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
      message.success("Updated Successfully");
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? message.error(error.response.data.message)
            : error.message,
      });
    }
  };
