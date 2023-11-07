import { Form, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { UserContext } from '../App';
import { useContext } from "react"

const Step2 = ({ goToNextStep }) => {

  const { userData, setUserData } = useContext(UserContext);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

   const onFinish = (values) => {
    const updatedUserData = { ...userData, ...values };
    setUserData(updatedUserData);
    goToNextStep();
    navigate("/step3")
  };
  const onChange = (value) => {
    setSelectedState(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/provinces`)
      .then((response) => response.json())
      .then((actualData) => setStates(actualData.results));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/cities/${selectedState}`)
      .then((response) => response.json())
      .then((actualData) => setCities(actualData.results));
  }, [selectedState]);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
          label="استان "
          name="province"
          block
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={states.map((i) => ({ value: i.id, label: i.name }))}
          />
        </Form.Item>
        <Form.Item
          label=" شهر"
          name="city"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={cities?.map((i) => ({ value: i.id, label: i.name }))}
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

export default Step2;
