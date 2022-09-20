import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, updateUser } from "../../store/actions";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    passWord: "",
  };
  state = {
    values: this.stateDefault,
    errors: {},
  };
  handleState = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };
  handleBlur = (event) => {
    console.log(event);
    const {
      name,
      title,
      validationMessage,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    console.log("patternMismatch: ", patternMismatch);

    let mess = "";
    if (valueMissing) {
      mess = `${title} không được bỏ trống`;
    }
    if (patternMismatch) {
      mess = `${title} không đúng định dạng`;
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
    });
  };
  handleSubmit = (event) => {
    // console.log(event.target.checkValidity());
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    if (this.props.selectedUser) {
      this.props.dispatch(updateUser(this.state.values));
    } else {
      this.props.dispatch(addUser(this.state.values));
    }

    this.setState({
      values: this.stateDefault,
    });
  };

  // Chuyển props thành state nội bộ của component
  static getDerivedStateFromProps = (nextProps, currentState) => {
    console.log(nextProps, currentState);
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { selectedUser } = this.props;
    const { maSV, fullName, phoneNumber, email} =
      this.state.values;
    return (
      <div>
        <form
          id="form"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div className="p-10 bg-black text-white text-2xl text-left">Thông tin sinh viên</div>
          <div className="grid grid-cols-2 gap-5 mt-10 text-left">
            <div>
              <p>Mã Sinh Viên</p>
              <input
                type="text"
                required
                title="Mã sinh viên"
                value={maSV}
                name="maSV"
                placeholder="Mã sinh viên"
                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.maSV}
              </span>
            </div>
            <div>
              <p>Họ tên</p>
              <input
                type="text"
                required
                title="Họ tên"
                value={fullName}
                name="fullName"
                placeholder="Họ tên"
                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                //   onChange={(event) => {
                //     this.setState({
                //       fullName: event.target.value,
                //     });
                //   }}
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.fullName}
              </span>
            </div>
            <div>
              <p>Số điện thoại</p>
              <input
                type="text"
                required
                value={phoneNumber}
                title="Số điện thoại"
                name="phoneNumber"
                placeholder="Số điện thoại"
                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.phoneNumber}
              </span>
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                required
                value={email}
                title="Email"
                name="email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                placeholder="Email"
                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.email}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-start">
            <button
              type="submit"
              className={`p-4 bg-green-500 rounded-sm text-white cursor-pointer hover:bg-green-700 mr-4 ${
                !this.props.selectedUser ? "" : "hidden"
              }
    `}
            >
              Thêm Sinh Viên
            </button>
            <button
              type="submit"
              className={`p-4 bg-yellow-500 rounded-sm text-white cursor-pointer mr-4 hover:bg-yellow-700 ${
                this.props.selectedUser ?? "hidden"
              }`}
            >
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
