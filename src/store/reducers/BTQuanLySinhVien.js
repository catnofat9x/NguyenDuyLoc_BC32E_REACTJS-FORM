import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../types";

const stateDefault = {
    mangSinhVien: [
    ],
    selectedUser: null,
  };
  
  export const baiTapQuanLySinhVien = (
    state = stateDefault,
    { type, payload }
  ) => {
    switch (type) {
      case ADD_USER: {
        const data = [...state.mangSinhVien];
        const user = { ...payload, id: Date.now() };
        data.push(user);
        return { ...state, mangSinhVien: data };
      }
      case DELETE_USER: {
        const data = state.mangSinhVien.filter((item) => item.id !== payload);
        return { ...state, mangSinhVien: data };
      }
      case EDIT_USER: {
        const user = state.mangSinhVien.find((item) => item.id === payload);
        return { ...state, selectedUser: user };
      }
      case UPDATE_USER: {
        const newUserList = state.mangSinhVien.map((item) =>
          item.id === payload.id ? payload : item
        );
        state.selectedUser = null;
        return { ...state, mangSinhVien: newUserList };
      }
      default:
        return state;
    }
  };
  