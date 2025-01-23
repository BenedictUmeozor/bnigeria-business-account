import { Form, Input, DatePicker, Select, Radio } from 'antd';
import { memo } from 'react';
import countries from '@/data/countries.json';

interface FormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  dial_code: string;
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

  return (
    <div className="h-full w-full space-y-8 p-8">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-grey-700">
            Personal Information
          </h3>
          <p>Let’s know your personal details</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full">
          <img
            src="/images/user.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      </header>
      <section>
        <Form
          layout="vertical"
          form={form}
          className="space-y-4"
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
                addonBefore={
                  <Form.Item name="dial_code" noStyle>
                    <Select
                      showSearch
                      dropdownStyle={{ minWidth: '200px' }}
                      options={countries.map(c => ({
                        label: (
                          <div className="flex items-center gap-2">
                            <img
                              src={c.flag}
                              alt={c.countryName}
                              className="h-4 w-6 object-cover"
                            />
                            <span>{c.callingCode}</span>
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
              <Select className="w-full" placeholder="Select State" />
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
                  <div className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2">
                    <span>Yes</span>
                    <Radio value={1} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2">
                    <span>No</span>
                    <Radio value={0} />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default memo(PersonalInfo);
