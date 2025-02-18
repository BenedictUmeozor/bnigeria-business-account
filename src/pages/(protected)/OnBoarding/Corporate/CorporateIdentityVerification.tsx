import { memo, useCallback, useState } from 'react';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { Button, Card, Space } from 'antd';
import HeaderTitle from '@/components/ui/HeaderTitle';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CorporateBVN from './CorporateBVN';
import CorporateNIN from './CorporateNIN';
import CorporateProofIdentity from './CorporateProofIdentity';

type VerificationType = 'bvn' | 'nin' | 'poi' | undefined;

const CorporateIdentityVerfication = ({ next }: { next: () => void }) => {
  const [verificationType, setVerificationType] = useState<VerificationType>();
  const [choosenVerificationType, setChoosenVerificationType] =
    useState<VerificationType>();

  const chooseVerificationType = useCallback(
    (type: VerificationType) => setChoosenVerificationType(type),
    [],
  );

  const back = useCallback(() => setVerificationType(undefined), []);

  if (verificationType === 'bvn' && !choosenVerificationType)
    return <CorporateBVN next={chooseVerificationType} back={back} />;
  if (verificationType === 'nin' && !choosenVerificationType)
    return <CorporateNIN next={chooseVerificationType} back={back} />;
  if (verificationType === 'poi' && !choosenVerificationType)
    return <CorporateProofIdentity next={chooseVerificationType} back={back} />;

  return (
    <div className="h-full w-full space-y-8 p-8">
      <HeaderTitle
        headerDescription="Select one preferred means of identification"
        headerTitle="Identity Verification"
        html={
          <p>
            Select <strong>one</strong> preferred means of identification
          </p>
        }
      />

      <div className="grid grid-cols-2 gap-6 gap-x-4 max-lg:grid-cols-1">
        <Card
          size="small"
          role="button"
          onClick={() => setVerificationType('nin')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <IdentificationIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-medium text-grey-700">
                  National Identity Number (NIN)
                </h3>
                <p className="text-sm text-grey-500">
                  Upload a valid government ID
                </p>
              </div>
            </Space>
            {choosenVerificationType === 'nin' && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setVerificationType('bvn')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <IdentificationIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-medium text-grey-700">
                  Bank Verification Number
                </h3>
                <p className="text-sm text-grey-500">
                  Upload your BVN for verification
                </p>
              </div>
            </Space>
            {choosenVerificationType === 'bvn' && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
        <Card
          size="small"
          role="button"
          onClick={() => setVerificationType('poi')}
          className="cursor-pointer transition-all duration-100 ease-linear hover:bg-grey-50"
        >
          <Space align="center" size="large">
            <Space>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <IdentificationIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-medium text-grey-700">
                  Proof of Identity
                </h3>
                <p className="text-sm text-grey-500">
                  Upload a valid passport or driver license
                </p>
              </div>
            </Space>
            {choosenVerificationType === 'poi' && (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 text-positive" />
              </div>
            )}
          </Space>
        </Card>
      </div>
      {choosenVerificationType && (
        <Button
          type="primary"
          className="w-48"
          shape="round"
          size="large"
          onClick={next}
        >
          Next
        </Button>
      )}
    </div>
  );
};
export default memo(CorporateIdentityVerfication);
