import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  Radio,
  Segmented,
  Select,
} from 'antd';
import { useCallback, useState } from 'react';
import countries from '@/data/countries.json';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';
import { Link, useNavigate } from 'react-router';
import useMutationAction from '@/hooks/use-mutation-action';
import ENDPOINTS from '@/constants/endpoints';

interface FormValues {
  fname: string;
  lname: string;
  phone_code: string;
  phone_number: string;
  business_structure: string;
  is_business_registered: string;
  email: string;
  country: string;
  password: string;
}

const GetStarted = () => {
  const [country, setCountry] = useState('NG');
  const [form] = Form.useForm<FormValues>();
  const navigate = useNavigate();

  const findCountryByPhoneCode = useCallback((phoneCode: string) => {
    const foundCountry = countries.find(c => c.callingCode === phoneCode);
    return foundCountry?.countryCode || 'GB';
  }, []);

  const getPhoneCodeByCountry = useCallback((countryCode: string) => {
    const foundCountry = countries.find(c => c.countryCode === countryCode);
    return foundCountry?.callingCode || '+44';
  }, []);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    const phoneCode = getPhoneCodeByCountry(value);
    form.setFieldsValue({
      country: value,
      phone_code: phoneCode,
      phone_number: phoneCode,
    });
  };

  const setFieldsValue = useCallback(
    ({ dialCode, phoneNumber }: { dialCode: string; phoneNumber: string }) => {
      const countryCode = findCountryByPhoneCode(dialCode);
      setCountry(countryCode);
      form.setFieldsValue({
        phone_code: dialCode,
        phone_number: phoneNumber,
        country: countryCode,
      });
    },
    [form, findCountryByPhoneCode],
  );

  const setPhoneValue = useCallback(
    (phoneNumber: string) => {
      form.setFieldsValue({ phone_number: phoneNumber });
    },
    [form],
  );

  const mutation = useMutationAction<HM.QueryResponse, FormValues>({
    url: ENDPOINTS.CREATE_ACCOUNT,
    mutationKey: ['create-account'],
    onSuccess: (data, variables) => {
      const { email, business_structure } = variables;
      message.success(data.message);
      navigate('/verify-email', { state: { email, business_structure } });
    },
    onError(error) {
      message.error(error?.message);
    },
  });

  const formatPhoneNumber = (phoneNumber: string, phoneCode: string) => {
    return phoneNumber.replace(phoneCode, '');
  };

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    const formattedValues = {
      ...values,
      phone_number: formatPhoneNumber(
        values.phone_number,
        values.phone_code,
      ).trim(),
    };
    mutation.mutate(formattedValues);
  };

  return (
    <section className="ml-auto space-y-6 rounded-xl bg-white p-6 shadow-lg lg:max-w-[466px]">
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
          phone_code: '+234',
          phone_number: '+234',
          country: 'NG',
        }}
        layout="vertical"
        labelCol={{ className: 'text-sm font-semibold text-grey-600' }}
        className="space-y-6"
      >
        <section className="space-y-4">
          <Form.Item
            name="country"
            label={
              <p className="text-sm font-semibold text-grey-600">Country</p>
            }
            rules={[{ required: true, message: 'Please select your country' }]}
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
                value: c.countryCode,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="business_name"
            label={
              <p className="text-sm font-semibold text-grey-600">
                Business Name
              </p>
            }
            rules={[
              { required: true, message: 'Please enter your business name' },
            ]}
          >
            <Input className="w-full" placeholder="Enter your business name" />
          </Form.Item>
          <Form.Item
            label={
              <p className="text-sm font-semibold text-grey-600">First Name</p>
            }
            name="fname"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input className="w-full" placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            label={
              <p className="text-sm font-semibold text-grey-600">Last Name</p>
            }
            name="lname"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input className="w-full" placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label={
              <p className="text-sm font-semibold text-grey-600">
                Email Address
              </p>
            }
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input
              className="w-full"
              type="email"
              placeholder="Enter your email address"
            />
          </Form.Item>
          <Form.Item
            label={
              <p className="text-sm font-semibold text-grey-600">
                Create Password
              </p>
            }
            name="password"
            rules={[
              { required: true, message: 'Please create a password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password className="w-full" placeholder="Create Password" />
          </Form.Item>
          <Form.Item
            name="business_structure"
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
            name="is_business_registered"
            label={
              <p className="text-sm font-semibold text-grey-600">
                Please confirm, this is a registered business
              </p>
            }
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-2 gap-2">
                <Radio
                  value={'YES'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  Yes
                </Radio>
                <Radio
                  value={'NO'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  No
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              { required: true, message: 'Please enter your phone number' },
            ]}
          >
            <PhoneNumberInput
              dialCodeName="phone_code"
              name="phone_number"
              setFieldsValue={setFieldsValue}
              setPhoneValue={setPhoneValue}
              label={
                (
                  <p className="text-sm font-semibold text-grey-600">
                    Business Phone Number
                  </p>
                ) as unknown as string
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
          loading={mutation.isPending}
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

export const Component = GetStarted;

export default GetStarted;
