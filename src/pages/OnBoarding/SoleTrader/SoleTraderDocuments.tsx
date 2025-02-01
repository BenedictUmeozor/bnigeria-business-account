import HeaderTitle from '@/components/ui/HeaderTitle';
import {
  CheckCircleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { Button, Card, Space } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import SoleTraderIncorpUpload from './SoleTraderIncorpUpload';
import SoleTraderBusAddUpload from './SoleTraderBusAddUpload';
import SoleTraderSourceFundsUpload from './SoleTraderSourceFundsUpload';

type DocumentType = 'inc' | 'pos' | 'pob' | undefined;

const SoleTraderDocuments = ({ next }: { next: () => void }) => {
  const [documentType, setDocumentType] = useState<DocumentType>();
  const [uploadState, setUploadState] = useState({
    inc: false,
    pos: false,
    pob: false,
  });

  const allDocIsUploaded = useMemo(
    () => Object.values(uploadState).every(Boolean),
    [uploadState],
  );

  const back = useCallback(() => setDocumentType(undefined), []);
  const updateState = useCallback((type: keyof typeof uploadState) => {
    setUploadState(prev => ({ ...prev, [type]: true }));
    setDocumentType(undefined);
  }, []);

  if (documentType === 'inc') {
    return <SoleTraderIncorpUpload back={back} next={updateState} />;
  }

  if (documentType === 'pob') {
    return <SoleTraderBusAddUpload back={back} next={updateState} />;
  }

  if (documentType === 'pos') {
    return <SoleTraderSourceFundsUpload back={back} next={updateState} />;
  }

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
          onClick={() => setDocumentType('inc')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <IdentificationIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-medium text-grey-700">
                  Incorporation Document
                </h3>
                <p className="text-sm text-grey-500">
                  Upload incorporation Document
                </p>
              </div>
            </Space>
            {uploadState.inc && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('pos')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
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
            {uploadState.pos && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setDocumentType('pob')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
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
            {uploadState.pob && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
      </div>
      {allDocIsUploaded && (
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
export default memo(SoleTraderDocuments);
