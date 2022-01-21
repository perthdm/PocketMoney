import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import FloatingInput from "components/FloatingInput/FloatingInput";
import icon from "assets/img/icon-login.png";
import { useHistory } from "react-router-dom";

const UILogin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    console.log("Username ==> ", username);
    console.log("Password ==> ", password);
    history.push("/admin");
  };

  return (
    <div
      className="container-login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right, #D6F1F0, #A7E3E1)",
      }}
    >
      <Card className="card-login">
        <Row style={{ height: "100%" }}>
          {/* LEFT */}
          <Col xs={0} md={0} lg={11}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                backgroundImage:
                  "radial-gradient(ellipse farthest-corner at 0 350%, #3CC3BE 50%, #A7E3E1 70.75%, #D6F1F0 70%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={icon} />
            </div>
          </Col>

          {/* RIGHT */}
          <Col xs={24} md={24} lg={13}>
            <Row
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: "linear-gradient(to right, #D6F1F0, #DBEBEA)",
                borderRadius: "15px",
              }}
            >
              <Col xs={24} className="detail-side">
                <h2
                  style={{
                    color: "#3CC3BE",
                    marginBottom: "50px",
                    fontWeight: "bold",
                  }}
                >
                  Welcome to Pocket Money.
                </h2>
                <FloatingInput
                  labelText="Username"
                  icon={<UserOutlined className="antd-fixed-icon" />}
                  textValue={username}
                  onChangeValue={(value) => setUsername(value)}
                  inputType="text"
                />

                <FloatingInput
                  labelText="Password"
                  icon={<LockFilled className="antd-fixed-icon" />}
                  textValue={password}
                  onChangeValue={(value) => setPassword(value)}
                  inputType="password"
                />

                <Button className="btn-pocket" onClick={handleSubmit}>
                  Sign-In
                </Button>

                <div
                  style={{
                    textAlign: "right",
                    width: "100%",
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    marginTop: "5px",
                    color: "#3CC3BE",
                    fontSize: "16px",
                  }}
                >
                  <a> Forgot Password ?</a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UILogin;
