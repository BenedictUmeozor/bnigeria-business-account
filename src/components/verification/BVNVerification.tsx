import { Button, Form, FormProps, Input, Select } from 'antd';
import { memo, useState } from 'react';
import countries from '@/data/countries.json';

interface FormValues {
  bvn: string;
  dail_code: string;
  phone_number: string;
}

const BVNVerification = ({ next, back }: { next: () => void; back: () => void }) => {
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
      <header className="space-y-2">
        <h3 className="text-2xl font-semibold text-grey-700">
          BVN Verification
        </h3>
        <p>Enter your BVN number to verify your details</p>
      </header>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        initialValues={{ dail_code: '+234', phone_number: '+234' }}
        className="space-y-4"
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <div className="grid grid-cols-2 items-start gap-6 max-lg:grid-cols-1">
          <Form.Item name="bvn" label="Bank Verification Number">
            <Input className="w-full" placeholder="Enter BVN" />
          </Form.Item>
          <Form.Item label="Attached Phone Number" name="phone_number">
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
            <p className="mt-1 text-sm text-gray-400">
              This should be the number attached to your BVN
            </p>
          </Form.Item>
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="primary"
            htmlType="button"
            onClick={back}
            shape="round"
            className="w-48 bg-primary-50 text-base text-primary hover:bg-primary-100"
            size="large"
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            className="w-48 text-base"
            size="large"
          >
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default memo(BVNVerification);
