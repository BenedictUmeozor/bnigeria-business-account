import { Button, Form, FormProps, Input, Select } from 'antd';
import { memo, useRef, useState } from 'react';
import countries from '@/data/countries.json';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

interface FormValues {
  id_number: string;
  dail_code: string;
  phone_number: string;
  front_image: File | null;
  back_image: File | null;
}

const POIVerification = ({ next, back }: { next: () => void; back: () => void }) => {
  const [form] = Form.useForm<FormValues>();
  const [phoneNumber, setPhoneNumber] = useState('+234');
  const [dialCode, setDialCode] = useState('+234');
  const [fileFields, setFileFields] = useState({
    front_image: null as File | null,
    back_image: null as File | null,
  });
  const frontFileInput = useRef<HTMLInputElement>(null);
  const backFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange =
    (fieldName: 'front_image' | 'back_image') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFileFields(prev => ({
        ...prev,
        [fieldName]: file,
      }));
      console.log(fileFields);
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

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    console.log(values);
    next();
  };

  return (
    <div className="h-full w-full space-y-8 p-8">
      <header className="space-y-2">
        <h3 className="text-2xl font-semibold text-grey-700">
          Proof of Identity
        </h3>
        <p>Upload your Passport/Drivers license to verify your details</p>
      </header>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        initialValues={{ dail_code: '+234', phone_number: '+234' }}
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <div className="grid grid-cols-2 items-start gap-6 gap-y-4 max-lg:grid-cols-1">
          <Form.Item name="id_number" label="Identification Number">
            <Input className="w-full" placeholder="Enter NIN" />
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
          </Form.Item>
        </div>

        <Form.Item label="Upload your Passport/Drivers license (Front)">
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              ref={frontFileInput}
              onChange={handleFileChange('front_image')}
              className="hidden"
            />
            <div
              role="button"
              className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md border border-dashed border-primary-500 p-4 transition-all duration-75 hover:bg-grey-50"
              onClick={() => frontFileInput.current?.click()}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50">
                  <ArrowUpTrayIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-grey-600">
                    Click to upload
                  </p>
                  <p className="text-xs text-grey-500">
                    {fileFields.front_image
                      ? fileFields.front_image.name
                      : 'JPG, PDF I 50kb max.'}
                  </p>
                </div>
              </div>
              <Button
                type="primary"
                className="bg-primary-50 text-primary hover:bg-primary-100"
              >
                Upload
              </Button>
            </div>
            <div className="flex h-44 items-center justify-center rounded-lg bg-primary-50">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex aspect-[1.8] w-48 items-center justify-center">
                  <img
                    src="/images/preview.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-sm text-grey-500">Front</p>
              </div>
            </div>
          </div>
        </Form.Item>

        <Form.Item label="Upload your Passport/Drivers license (Back)">
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              ref={backFileInput}
              onChange={handleFileChange('back_image')}
              className="hidden"
            />
            <div
              role="button"
              className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md border border-dashed border-primary-500 p-4 transition-all duration-75 hover:bg-grey-50"
              onClick={() => backFileInput.current?.click()}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50">
                  <ArrowUpTrayIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-grey-600">
                    Click to upload
                  </p>
                  <p className="text-xs text-grey-500">
                    {fileFields.back_image
                      ? fileFields.back_image.name
                      : 'JPG, PDF I 50kb max.'}
                  </p>
                </div>
              </div>
              <Button
                type="primary"
                className="bg-primary-50 text-primary hover:bg-primary-100"
              >
                Upload
              </Button>
            </div>
            <div className="flex h-44 items-center justify-center rounded-lg bg-primary-50">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex aspect-[1.8] w-48 items-center justify-center">
                  <img
                    src="/images/back.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-sm text-grey-500">Back</p>
              </div>
            </div>
          </div>
        </Form.Item>

        <div className="flex items-center gap-4">
          <Button
            type="primary"
            htmlType="button"
            shape="round"
            onClick={back}
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
export default memo(POIVerification);
