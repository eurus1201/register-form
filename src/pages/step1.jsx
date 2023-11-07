import { Form, Input, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import { useContext, useEffect, useState } from "react"

const Step1 = ({ goToNextStep }) => {

  const { userData, setUserData } = useContext(UserContext);
  const [type, setType] = useState('')
  const path = useLocation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const updatedUserData = { ...userData, ...values,type: type,};
    setUserData(updatedUserData);
    goToNextStep();
    navigate("/step2")
  };

  useEffect(() => {
    if (path.pathname === 'legal') {
      setType('legal');
    } else setType('personal')
  }, [path])

  console.log(userData)
  return (
    <Space className="centered-form">
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
          label="نام "
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="نام"
          />
        </Form.Item>
        <Form.Item
          label="نام خانوادگی "
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="نام خانوادگی "
          />
        </Form.Item>
        {(path.pathname === 'personal' || '/') && <>
          <Form.Item
            label="کدملی "
            name="national-code"
            rules={[
              {
                required: true,
                message: "Please input your nationalcode!",
              },
              {
                // i have a pattern for national code ....
                pattern: /^[0-9]{10}$/, 
                message: "Please enter a 10-digit national-code",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="کدملی"
            />
          </Form.Item>
          <Form.Item
            label="تلفن همراه "
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
              {
                // i have a pattern for mobile ....
                pattern: /^[0-9]{10}$/, 
                message: "Please enter a 10-digit phone number.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="تلفن همراه"
            />
          </Form.Item>
        </>
        }
        {path.pathname === 'legal' && <>
          <Form.Item
            label="شماره ثبت "
            name="registration_number"
            rules={[
              {
                required: true,
                message: "Please input your nationalcode!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="شماره ثبت"
            />
          </Form.Item>
          <Form.Item
            label="تلفن ثابت "
            name="tel"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="تلفن ثابت"
            />
          </Form.Item>
        </>}


        <Form.Item>
          <Button block type="primary" htmlType="submit" size="larg">
            ادامه
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Step1;
