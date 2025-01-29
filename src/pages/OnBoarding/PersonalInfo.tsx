import {
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  Button,
  FormProps,
} from 'antd';
import { memo, useState } from 'react';
import countries from '@/data/countries.json';
import states from '@/data/states.json';
import { PencilIcon } from '@heroicons/react/24/outline';
import HeaderTitle from '@/components/ui/HeaderTitle';

interface FormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  dail_code: string;
  date_of_birth: string;
  town: string;
  state: string;
  residential_address: string;
  postal_code: string;
  occupation: string;
  id_number: string;
  hold_stake: 1 | 0;
}

const PersonalInfo = ({ next }: { next: () => void }) => {
  const [form] = Form.useForm<FormValues>();
  const [phoneNumber, setPhoneNumber] = useState('+234');
  const [dialCode, setDialCode] = useState('+234');

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    console.log(values);
    next();
  };

  const handleCodeChange = (value: string) => {
    const newPhoneNumber = phoneNumber.replace(dialCode, value);
    setDialCode(value);
    setPhoneNumber(newPhoneNumber);
    form.setFieldsValue({
      dail_code: value,
      phone_number: newPhoneNumber,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    form.setFieldsValue({ phone_number: newValue });
  };

  return (
    <div className="h-full w-full space-y-8 p-8">
      <header className="flex items-center justify-between">
        <HeaderTitle
          headerDescription="Let’s know your personal details"
          headerTitle="Personal Information"
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full">
          <img
            src="/images/user.png"
            alt=""
            className="h-full w-full object-contain"
          />
          <Button
            type="primary"
            shape="circle"
            className="absolute bottom-0 right-0 bg-primary-50 outline outline-white"
            size="small"
            icon={<PencilIcon className="h-3 w-3 text-primary" />}
          />
        </div>
      </header>
      <section>
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
          className="space-y-4"
          initialValues={{ dail_code: '+234', phone_number: '+234' }}
          labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="First Name" name="first_name">
              <Input className="w-full" placeholder="e.g John" />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name">
              <Input className="w-full" placeholder="e.g John" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Phone Number" name="phone_number">
              <Input
                className="w-full"
                placeholder="+234 8000 303 004"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                addonBefore={
                  <Form.Item name="dail_code" noStyle>
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
            <Form.Item label="Date of Birth" name="date_of_birth">
              <DatePicker className="w-full" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Residential Address" name="residential_address">
              <Input className="w-full" placeholder="e.g 123 Main St" />
            </Form.Item>
            <Form.Item label=" Town/City" name="town">
              <Input className="w-full" placeholder="e.g 12345" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Region/State" name="state">
              <Select
                className="w-full"
                placeholder="Select State"
                showSearch
                filterOption={(input, option) =>
                  (option?.value as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={states.map(s => ({ label: s.name, value: s.name }))}
              />
            </Form.Item>
            <Form.Item label="Postal Code" name="postal_code">
              <Input className="w-full" placeholder="Enter Postal Code" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Occupation" name="occupation">
              <Input className="w-full" placeholder="Enter Occupation" />
            </Form.Item>
            <Form.Item
              label="ID Number (BVN/NIN/Passport/Driver’s License)"
              name="id_number"
            >
              <Input className="w-full" placeholder="Enter ID Number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Do you hold over 25% stake of the business?"
              name="hold_stake"
            >
              <Radio.Group className="w-full">
                <div className="grid grid-cols-2 gap-2">
                  <Radio
                    value={1}
                    className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                  >
                    Yes
                  </Radio>
                  <Radio
                    value={0}
                    className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                  >
                    No
                  </Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="flex items-center justify-start">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="text-base"
              shape="round"
            >
              Save & Continue
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default memo(PersonalInfo);
