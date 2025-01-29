import { Button, Form } from 'antd';
import { useRef, useState } from 'react';
import HeaderTitle from '../ui/HeaderTitle';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import DocumentPreview from '../ui/DocumentPreview';

const UploadSourceOfFundsDoc = ({ next }: { next: () => void }) => {
  const [form] = Form.useForm<{ file: File | null }>();
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const onFinish = () => {
    next();
  };

  return (
    <div className="h-full w-full space-y-8 p-8">
      <HeaderTitle
        headerDescription="Upload your Proof of Source of Funds"
        headerTitle="Proof of Source of Funds"
      />
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        labelCol={{ className: 'text-sm text-grey-600 font-medium ' }}
      >
        <Form.Item label="Upload Proof of Source of Funds">
          <div>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              ref={fileInput}
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              role="button"
              className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md border border-dashed border-primary-500 p-4 transition-all duration-75 hover:bg-grey-50"
              onClick={() => fileInput.current?.click()}
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
                    {file ? file.name : 'JPG, PDF I 50kb max.'}
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
                <div className="flex aspect-[1.8] w-48 items-center justify-center overflow-hidden">
                  {file ? (
                    <DocumentPreview file={file} />
                  ) : (
                    <img
                      src="/images/doc.png"
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
                <p className="text-sm text-grey-500">Document Preview</p>
              </div>
            </div>
          </div>
        </Form.Item>
        <div className="flex items-center gap-4">
          <Button
            type="primary"
            htmlType="button"
            onClick={next}
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
export default UploadSourceOfFundsDoc;
