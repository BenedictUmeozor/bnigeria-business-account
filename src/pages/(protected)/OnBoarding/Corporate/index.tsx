import { StepProps, Steps, Tag } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Welcome from '../Welcome';
import AddDirectors from './Director/AddDirectors';
import AddShareholders from './Shareholder/AddShareholders';
import CorporatePersonalInfo from './CorporatePersonalInfo';
import CorporateBusinessInfo from './CorporateBusinessInfo';
import CorporateIdentityVerification from './CorporateIdentityVerification';
import CorporateDocuments from './CorporateDocuments';
import CorporateReview from './CorporateReview';
import CorporateOnboardingProvider from '@/providers/CorporateOnboardingProvider';
import { useCorporateOnboardingContext } from '@/contexts/corporate-onboarding';
import OnboardingSuccess from '../OnboardingSuccess';

const steps: StepProps[] = [
  {
    title: 'Personal Information',
  },
  {
    title: 'Identity Verification',
  },
  {
    title: 'Business Information',
  },
  {
    title: 'Add Directors',
  },
  {
    title: 'Add Shareholders',
  },
  {
    title: 'Document Upload',
  },
];

const CorporateOnboarding = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { current, setCurrent } = useCorporateOnboardingContext();

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, [current, setCurrent]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [current]);

  return (
    <section className="no-scrollbar grid grid-cols-[312px_1fr] overflow-hidden rounded-xl">
      <aside className="grid h-full max-w-[600px] grid-rows-[1fr_auto] gap-12 border border-r-0 border-solid border-grey-200 bg-primary-50 pb-8 pt-12">
        <section>
          <div className="flex items-center space-x-2 bg-primary-100 px-4 py-3 text-lg">
            <h2 className="text-center text-lg font-medium">
              Get Business Account
            </h2>
            <Tag color="#ebf4ff" className="rounded-2xl text-primary-600">
              Corporate
            </Tag>
          </div>
          <div className="mx-auto my-8 flex w-[80%] items-center justify-center">
            <Steps
              current={current}
              items={steps}
              direction="vertical"
              progressDot
            />
          </div>
        </section>
        <footer className="space-x-2 text-center text-sm text-grey-500">
          <span>Got Questions?</span>
          <Link to="/" className="text-primary">
            Contact Us
          </Link>
        </footer>
      </aside>
      <div
        ref={ref}
        className="grid h-full place-items-center border border-solid border-grey-200"
      >
        {current === -1 && <Welcome next={next} />}
        {current === 0 && <CorporatePersonalInfo next={next} />}
        {current === 1 && <CorporateIdentityVerification next={next} />}
        {current === 2 && <CorporateBusinessInfo next={next} />}
        {current === 3 && <AddDirectors next={next} />}
        {current === 4 && <AddShareholders next={next} />}
        {current === 5 && <CorporateDocuments next={next} />}
        {current === 6 && <CorporateReview nextAction={next} />}
        {current === 7 && <OnboardingSuccess />}
      </div>
    </section>
  );
};

const CorporateOnboardingWrapper = () => {
  return (
    <CorporateOnboardingProvider>
      <CorporateOnboarding />
    </CorporateOnboardingProvider>
  );
};

export const Component = CorporateOnboardingWrapper;

export default CorporateOnboardingWrapper;
