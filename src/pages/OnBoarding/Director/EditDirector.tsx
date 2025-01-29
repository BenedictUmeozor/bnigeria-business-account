import { useEffect, useRef, useState } from 'react';
import { Director } from './AddDirectors';
import { Form, Input, Select, Radio, Button, FormProps, Divider } from 'antd';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import HeaderTitle from '@/components/ui/HeaderTitle';
import states from '@/data/states.json';

const EditDirector = ({
  director,
  handleEditDirector,
}: {
  director: Director;
  handleEditDirector: (director: Director) => void;
}) => {
  const [form] = Form.useForm<Director>();
  const [fileFields, setFileFields] = useState({
    front_image: null as File | null,
    back_image: null as File | null,
  });
  const ref = useRef<HTMLDivElement>(null);
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

  const onFinish: FormProps<Director>['onFinish'] = values => {
    const obj: Director = {
      ...values,
      front_image: fileFields.front_image,
      back_image: fileFields.back_image,
      id: director.id,
    };
    handleEditDirector(obj);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="h-full w-full space-y-8 p-8" ref={ref}>
      <HeaderTitle
        headerDescription="Complete required details of the director"
        headerTitle="Edit Key Director"
      />
      <section>
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          initialValues={{ ...director }}
          onFinish={onFinish}
          className="space-y-4"
          labelCol={{ className: 'text-sm text-grey-500 font-medium ' }}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input className="w-full" placeholder="e.g John" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input className="w-full" placeholder="e.g Doe" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Email Address"
              name="email_address"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input
                className="w-full"
                type="email"
                placeholder="e.g john@example.com"
              />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Input className="w-full" placeholder="Enter Role" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item label="Residential Address" name="residential_address">
              <Input
                className="w-full"
                placeholder="Enter Residential Address"
              />
            </Form.Item>
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
                options={states.map(s => ({
                  label: s.name,
                  value: s.name,
                }))}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              label="Add as a shareholder (owns over 25% of the business)?"
              name="owns_over_25_percent"
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
            <Form.Item
              label="Appoint as authorized signatory?"
              name="authorized_signatory"
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
          <Divider>
            <span className="font-medium text-gray-500">ID Card Upload</span>
          </Divider>
          <Form.Item
            name="preferred_means_of_identification"
            label="Preferred Means of Identification"
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-3 gap-2">
                <Radio
                  value={'NIN'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  NIN
                </Radio>
                <Radio
                  value={'Passport'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  Passport
                </Radio>
                <Radio
                  value={'Drivers License'}
                  className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-grey-50 p-2"
                >
                  Drivers License
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            shape="round"
            className="w-48"
          >
            Save & Continue
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default EditDirector;
