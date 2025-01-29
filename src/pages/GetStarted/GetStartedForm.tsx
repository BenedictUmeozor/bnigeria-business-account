import { Button, Form, FormProps, Input, Radio, Segmented, Select } from 'antd';
import { Link, useNavigate } from 'react-router';
import countries from '@/data/countries.json';
import { useState } from 'react';

interface FormValues {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  country: string;
  business_type: string;
  dial_code: string;
}

const GetStartedForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('+234');
  const [dialCode, setDialCode] = useState('+234');
  const [country, setCountry] = useState('Nigeria');
  const navigate = useNavigate();
  const [form] = Form.useForm<FormValues>();

  const handleCountryChange = (value: string) => {
    const selectedCountry = countries.find(
      country => country.countryName === value,
    )!;
    const newPhoneNumber = phoneNumber.replace(
      dialCode,
      selectedCountry.callingCode,
    );
    setCountry(value);
    setDialCode(selectedCountry.callingCode);
    setPhoneNumber(newPhoneNumber);
    form.setFieldsValue({
      country: value,
      dial_code: selectedCountry.callingCode,
      phone_number: newPhoneNumber,
    });
  };

  const handleCodeChange = (value: string) => {
    const selectedCountry = countries.find(
      country => country.callingCode === value,
    )!;
    const newPhoneNumber = phoneNumber.replace(dialCode, value);
    setDialCode(value);
    setCountry(selectedCountry.countryName);
    setPhoneNumber(newPhoneNumber);
    form.setFieldsValue({
      country: selectedCountry.countryName,
      dial_code: value,
      phone_number: newPhoneNumber,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    form.setFieldsValue({ phone_number: newValue });
  };

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    if (values.business_type === 'sole-trader') {
      navigate('/');
    } else {
      navigate('/corporate');
    }
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-lg lg:max-w-[420px] ml-auto">
      <Segmented
        options={[
          { label: 'Personal', value: 'Personal', disabled: true },
          'Business',
        ]}
        value="Business"
        className="w-full rounded-lg border border-solid border-grey-200 bg-white p-1 [&_.ant-segmented-item-disabled]:cursor-not-allowed [&_.ant-segmented-item-disabled]:opacity-50 [&_.ant-segmented-item-selected]:bg-primary-50 [&_.ant-segmented-item-selected]:text-primary [&_.ant-segmented-item:hover]:bg-primary-50 [&_.ant-segmented-item:hover]:text-primary [&_.ant-segmented-item]:grid [&_.ant-segmented-item]:h-10 [&_.ant-segmented-item]:place-items-center [&_.ant-segmented-item]:text-primary"
        block
      />
      <header className="space-y-2">
        <h5 className="font-cabinet text-2xl font-bold text-grey-700">
          Create an account
        </h5>
        <p className="text-grey-600">Fill the form to get started now</p>
      </header>
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          dial_code: '+234',
          phone_number: '+234',
          country: 'Nigeria',
        }}
        layout="vertical"
        className="space-y-6"
      >
        <section className="space-y-4">
          <Form.Item
            name="first_name"
            label={
              <p className="text-sm font-semibold text-grey-600">First Name</p>
            }
          >
            <Input className="w-full" placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label={
              <p className="text-sm font-semibold text-grey-600">Last Name</p>
            }
          >
            <Input className="w-full" placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            name="email_address"
            label={
              <p className="text-sm font-semibold text-grey-600">
                Email Address
              </p>
            }
          >
            <Input
              type="email"
              className="w-full"
              placeholder="Enter your email address"
            />
          </Form.Item>
          <Form.Item
            name="business_type"
            label={
              <p className="text-sm font-semibold text-grey-600">
                Business Type
              </p>
            }
            rules={[
              {
                required: true,
                message: 'Please select a business type',
              },
            ]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-2 gap-2">
                <Radio
                  value={'sole-trader'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  Sole Trader
                </Radio>
                <Radio
                  value={'corporate'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  Corporate
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="country"
            label={
              <p className="text-sm font-semibold text-grey-600">Country</p>
            }
          >
            <Select
              showSearch
              className="w-full"
              onChange={handleCountryChange}
              value={country}
              dropdownStyle={{ minWidth: '200px' }}
              options={countries.map(c => ({
                label: (
                  <div className="flex items-center gap-2">
                    <img
                      src={c.flag}
                      alt={c.countryName}
                      className="h-4 w-6 object-cover"
                    />
                    <span>{c.countryName}</span>
                  </div>
                ),
                value: c.countryName,
              }))}
            />
          </Form.Item>
          <Form.Item
            label={
              <p className="text-sm font-semibold text-grey-600">
                Phone Number
              </p>
            }
            name="phone_number"
          >
            <Input
              className="w-full"
              placeholder="+234 8000 303 004"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              addonBefore={
                <Form.Item name="dial_code" noStyle>
                  <Select
                    showSearch
                    className="w-20"
                    dropdownStyle={{ minWidth: '200px' }}
                    onChange={handleCodeChange}
                    value={dialCode}
                    options={countries.map(c => ({
                      label: (
                        <div className="flex items-center gap-2">
                          <img
                            src={c.flag}
                            alt={c.countryCode}
                            className="h-4 w-6 object-cover"
                          />
                          <span>{c.countryCode}</span>
                        </div>
                      ),
                      value: c.callingCode,
                    }))}
                    filterOption={(input, option) =>
                      (option?.value as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              }
            />
          </Form.Item>
        </section>
        <Button
          className="w-full"
          shape="round"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Get Started
        </Button>
        <p className="text-center font-medium text-grey-600">
          Already got an account?{' '}
          <Link
            to="#"
            className="text-primary-600 underline hover:text-primary-700"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default GetStartedForm;
