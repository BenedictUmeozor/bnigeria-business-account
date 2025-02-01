import { Button, Form, FormProps, Input } from 'antd';
import { memo, useCallback, useState } from 'react';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';
import Upload from '@/components/ui/Upload';
import HeaderTitle from '@/components/ui/HeaderTitle';

interface FormValues {
  nin: string;
  dial_code: string;
  phone_number: string;
  front_image: File | null;
  back_image: File | null;
}

type VerificationType = 'bvn' | 'nin' | 'poi' | undefined;

const CorporateNIN = ({
  next,
  back,
}: {
  next: (type: VerificationType) => void;
  back: () => void;
}) => {
  const [form] = Form.useForm<FormValues>();
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    console.log(values);
    next('nin');
  };

  const setFieldsValue = useCallback(
    ({ dialCode, phoneNumber }: { dialCode: string; phoneNumber: string }) => {
      form.setFieldsValue({ dial_code: dialCode, phone_number: phoneNumber });
    },
    [form],
  );

  const setPhoneValue = useCallback(
    (phoneNumber: string) => {
      form.setFieldsValue({ phone_number: phoneNumber });
    },
    [form],
  );

  return (
    <div className="h-full w-full space-y-8 p-8">
      <HeaderTitle
        headerTitle="NIN Verification"
        headerDescription="Upload your NIN ID card to verify your details"
      />
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        initialValues={{ dial_code: '+234', phone_number: '+234' }}
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <div className="grid grid-cols-2 items-start gap-6 gap-y-4 max-lg:grid-cols-1">
          <Form.Item name="nin" label="NIN Number">
            <Input className="w-full" placeholder="Enter NIN Number" />
          </Form.Item>
          <PhoneNumberInput
            dialCodeName="dial_code"
            name="phone_number"
            setFieldsValue={setFieldsValue}
            setPhoneValue={setPhoneValue}
            label="Attached Phone Number"
          />
        </div>

        <Upload
          file={frontImage}
          image="/images/preview.png"
          label="Upload your NIN Identity card (Front)"
          setFile={setFrontImage}
          key={1}
        />

        <Upload
          file={backImage}
          image="/images/back.png"
          label="Upload your NIN Identity card (Back)"
          setFile={setBackImage}
          key={2}
        />

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
export default memo(CorporateNIN);
