import { Button, Form, FormProps, Input } from 'antd';
import { memo, useCallback } from 'react';
import HeaderTitle from '@/components/ui/HeaderTitle';
import PhoneNumberInput from '@/components/ui/PhoneNumberInput';

type VerificationType = 'bvn' | 'nin' | 'poi' | undefined;

interface FormValues {
  bvn: string;
  dial_code: string;
  phone_number: string;
}

const CorporateBVN = ({
  next,
  back,
}: {
  next: (type: VerificationType) => void;
  back: () => void;
}) => {
  const [form] = Form.useForm<FormValues>();

  const onFinish: FormProps<FormValues>['onFinish'] = values => {
    console.log(values);
    next('bvn');
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
        headerTitle="BVN Verification"
        headerDescription="Enter your BVN number to verify your details"
      />
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        initialValues={{ dial_code: '+234', phone_number: '+234' }}
        className="space-y-4"
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <div className="grid grid-cols-2 items-start gap-6 max-lg:grid-cols-1">
          <Form.Item name="bvn" label="Bank Verification Number">
            <Input className="w-full" placeholder="Enter BVN" />
          </Form.Item>
          <PhoneNumberInput
            dialCodeName="dial_code"
            name="phone_number"
            setFieldsValue={setFieldsValue}
            setPhoneValue={setPhoneValue}
            label="Attached Phone Number"
            text="This should be the number attached to your BVN"
          />
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
export default memo(CorporateBVN);
