import UploadBusAddDoc from '@/components/shared/UploadBusAddDoc';
import UploadIncorpDoc from '@/components/shared/UploadIncorpDoc';
import UploadShareholderDDoc from '@/components/shared/UploadShareholderCards';
import UploadSourceOfFundsDoc from '@/components/shared/UploadSourceOfFundsDoc';
import HeaderTitle from '@/components/ui/HeaderTitle';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { Button, Card, Space } from 'antd';
import { memo, useCallback, useState } from 'react';

type DocumentType = 'inc' | 'pos' | 'pob' | 'sc' | undefined;

const AddDocuments = ({ next }: { next: () => void }) => {
  const [documentType, setDocumentType] = useState<DocumentType>();
  const [show, setShow] = useState(false);

  const nextAction = useCallback(() => {
    setShow(true);
    setDocumentType(undefined);
  }, []);

  if (documentType === 'inc') return <UploadIncorpDoc next={nextAction} />;
  if (documentType === 'pos')
    return <UploadSourceOfFundsDoc next={nextAction} />;
  if (documentType === 'pob') return <UploadBusAddDoc next={nextAction} />;
  if (documentType === 'sc') return <UploadShareholderDDoc next={nextAction} />;

  return (
    <div className="h-full w-full space-y-8 p-8">
      <HeaderTitle
        headerTitle="Documents Upload"
        headerDescription="Upload the required business documents"
      />
      <div className="grid grid-cols-2 gap-6 gap-x-4 max-lg:grid-cols-1">
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('sc')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
              <IdentificationIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-medium text-grey-700">
                Shareholder ID card
              </h3>
              <p className="text-sm text-grey-500">Upload shareholder ID</p>
            </div>
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('inc')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
              <IdentificationIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-medium text-grey-700">
                Incorporation Document
              </h3>
              <p className="text-sm text-grey-500">
                Upload incorporation document
              </p>
            </div>
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('pos')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
              <IdentificationIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-medium text-grey-700">
                Proof of source of funds
              </h3>
              <p className="text-sm text-grey-500">
                Upload proof of source of funds
              </p>
            </div>
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('pob')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
              <IdentificationIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-medium text-grey-700">
                Proof of Business Address
              </h3>
              <p className="text-sm text-grey-500">
                Upload proof of Business Address
              </p>
            </div>
          </Space>
        </Card>
      </div>
      {show && (
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={next}
          className="w-48 text-base"
        >
          Next
        </Button>
      )}
    </div>
  );
};
export default memo(AddDocuments);
