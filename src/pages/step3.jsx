import { useContext, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";

const Step3 = ({ goToNextStep }) => {

    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    console.log(userData)
    const onFinish = (values) => {
        const updatedUserData = { ...userData, ...values };
        setUserData(updatedUserData);
        goToNextStep();
        navigate("/final-step")
    };

    return (
        <Space className="centered-form" size={"large"}>
            <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="نام بانک "
                    name="bank_name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="نام بانک"
                    />
                </Form.Item>
                <Form.Item
                    label="شماره شبا "
                    name="iban"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="شماره شبا"
                    />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" size="larg">
                        ادامه
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
};

export default Step3;
