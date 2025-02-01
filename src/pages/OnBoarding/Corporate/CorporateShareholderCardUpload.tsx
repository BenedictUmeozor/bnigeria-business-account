import HeaderTitle from '@/components/ui/HeaderTitle';
import Upload from '@/components/ui/Upload';
import { Button, Form } from 'antd';
import { memo, useState } from 'react';

const CorporateShareholderCardUpload = ({
  back,
  next,
}: {
  back: () => void;
  next: (name: 'inc' | 'pos' | 'pob' | 'shareholder') => void;
}) => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const [form] = Form.useForm<{
    frontImage: File | null;
    backImage: File | null;
  }>();

  const onFinish = () => {
    next('shareholder');
  };

  return (
    <div className="h-full w-full space-y-8 p-8">
      <HeaderTitle
        headerDescription="Upload shareholder ID Card"
        headerTitle="Shareholder ID cards "
      />
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <Upload
          file={frontImage}
          setFile={setFrontImage}
          image="/images/preview.png"
          label="Upload your shareholder identity card (Front)"
          className="w-48"
        />
        <Upload
          file={backImage}
          setFile={setBackImage}
          image="/images/back.png"
          label="Upload your shareholder identity card (Front)"
          className="w-48"
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
export default memo(CorporateShareholderCardUpload);
