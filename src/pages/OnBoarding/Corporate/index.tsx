import { StepProps, Steps } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Welcome from '../Welcome';
import AddDirectors from './Director/AddDirectors';
import AddShareholders from './Shareholder/AddShareholders';
import OnboardingSuccess from '@/pages/OnBoarding/OnboardingSuccess';
import CorporatePersonalInfo from './CorporatePersonalInfo';
import CorporateBusinessInfo from './CorporateBusinessInfo';
import CorporateIdentityVerification from './CorporateIdentityVerification';
import CorporateDocuments from './CorporateDocuments';
import CorporateReview from './CorporateReview';

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
  const [current, setCurrent] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev === -1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [current]);

  return (
    <section className="no-scrollbar grid grid-cols-[300px_1fr] overflow-hidden rounded-xl">
      <aside className="grid h-full max-w-[600px] grid-rows-[1fr_auto] gap-12 border border-r-0 border-solid border-grey-200 bg-primary-50 pb-8 pt-12">
        <section>
          <div className="bg-primary-100 px-4 py-3 text-lg">
            <h2 className="text-center text-lg font-medium">
              Business Account onboarding
            </h2>
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

export const Component = CorporateOnboarding;

export default CorporateOnboarding;
