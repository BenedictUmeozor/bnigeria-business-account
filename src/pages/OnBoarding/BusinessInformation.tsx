import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, DatePicker, Form, FormProps, Input, Select } from 'antd';
import { memo, useState } from 'react';
import countries from '@/data/countries.json';
import HeaderTitle from '@/components/ui/HeaderTitle';

interface FormValues {
  business_name: string;
  business_reg_number: string;
  date_of_incorporation: string;
  listing_number: string;
  registered_business_address: string;
  business_sector: string;
  annual_business_profit: string;
  economic_activity: string;
  business_website: string;
  phone_number: string;
  dial_code: string;
}

const BusinessInformation = ({ next }: { next: () => void }) => {
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
      dial_code: value,
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
          headerDescription="Tell us more about your business"
          headerTitle="Business Information"
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full">
          <img
            src="/images/logo.png"
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
          initialValues={{ dial_code: dialCode, phone_number: phoneNumber }}
          labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Business Name" name="business_name">
              <Input className="w-full" placeholder="Enter business name" />
            </Form.Item>
            <Form.Item
              label="Business Registration Number"
              name="business_reg_number"
            >
              <Input
                className="w-full"
                placeholder="Enter business registration number"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Date of Incorporation"
              name="date_of_incorporation"
            >
              <DatePicker
                className="w-full"
                placeholder="Enter date of incorporation"
              />
            </Form.Item>
            <Form.Item label="Listing Number" name="listing_number">
              <Input className="w-full" placeholder="Enter Listing Number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Registered Business Address"
              name="registered_business_address"
            >
              <Input
                className="w-full"
                placeholder="Enter Registered Business Address"
              />
            </Form.Item>
            <Form.Item label="Business Sector" name="business_sector">
              <Select
                className="w-full"
                placeholder="Enter Business Sector"
                options={['IT/Technology', 'Finance/Accounting', 'Other'].map(
                  v => ({ label: v, value: v }),
                )}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Annual Business Profit"
              name="annual_business_profit"
            >
              <Input
                className="w-full"
                placeholder="Enter Annual Business Profit"
              />
            </Form.Item>
            <Form.Item
              label="Economic Activity of the Company"
              name="economic_activity"
            >
              <Input
                className="w-full"
                placeholder="Enter Economic Activity of the Company"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Business Website" name="business_website">
              <Input
                className="w-full"
                type="url"
                placeholder="https://www.xyz.com"
              />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone_number">
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
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            shape="round"
            className="w-48 text-base"
          >
            Next
          </Button>
        </Form>
      </section>
    </div>
  );
};
export default memo(BusinessInformation);
