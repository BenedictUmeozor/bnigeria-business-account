import HeaderTitle from '@/components/ui/HeaderTitle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button, Checkbox, Select, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router';
import SoleTraderPersonalInfo from './SoleTraderPersonalInfo';
import SoleTraderProofIdentity from './SoleTraderProofIdentity';
import SoleTraderBusinessInfo from './SoleTraderBusinessInfo';

const PAGES = [
  {
    index: 0,
    title: 'Personal Information',
  },
  {
    index: 1,
    title: 'Identity Verification',
  },
  {
    index: 2,
    title: 'Business Information',
  },
  {
    index: 3,
    title: 'Document Upload',
  },
];

const SoleTraderReview = ({ nextAction }: { nextAction: () => void }) => {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);

  const next = useCallback(
    () =>
      setSelectedPage(prev =>
        prev !== null ? (prev === 2 ? 6 : prev + 1) : 0,
      ),
    [],
  );

  return (
    <div className="h-full w-full space-y-12 p-8">
      <section className="space-y-8">
        <HeaderTitle
          headerTitle="Review Information"
          headerDescription="Kindly vet all your details and document before final submission"
        />
        {selectedPage === 6 && (
          <section className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-medium text-grey-500">
                  I have read through my submitted details and confirmed they
                  are correct
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="font-medium text-grey-500">
                  By clicking “submit profile”, i accept the{' '}
                  <Link to="#" className="font-medium text-primary">
                    terms
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="font-medium text-primary">
                    condtitions
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                htmlType="button"
                shape="round"
                onClick={() => setSelectedPage(0)}
                className="w-48 bg-primary-50 text-base text-primary hover:bg-primary-100"
                size="large"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                onClick={nextAction}
                className="w-48 text-base"
                size="large"
              >
                Submit Profile
              </Button>
            </div>
          </section>
        )}
        {selectedPage !== 6 && (
          <div className="grid grid-cols-2 gap-6">
            <Select
              className="w-full"
              placeholder="Select page to review"
              options={PAGES.map(page => ({
                label: page.title,
                value: page.index,
              }))}
              onChange={value => {
                if (value === 3) {
                  setSelectedPage(6);
                } else {
                  setSelectedPage(value);
                }
              }}
            />
            <div className="flex items-center justify-end">
              <Space>
                <Button
                  type="text"
                  icon={<ChevronLeftIcon className="h-4 w-4" />}
                  disabled={!selectedPage}
                  onClick={() => setSelectedPage(prev => prev! - 1)}
                >
                  Previous
                </Button>
                <Button
                  type="text"
                  icon={<ChevronRightIcon className="h-4 w-4" />}
                  onClick={next}
                >
                  Next
                </Button>
              </Space>
            </div>
          </div>
        )}
      </section>
      {selectedPage === 0 && <SoleTraderPersonalInfo next={next} isReview />}
      {selectedPage === 1 && (
        <SoleTraderProofIdentity next={next} back={next} isReview />
      )}
      {selectedPage === 2 && <SoleTraderBusinessInfo next={next} isReview />}
    </div>
  );
};
export default memo(SoleTraderReview);
