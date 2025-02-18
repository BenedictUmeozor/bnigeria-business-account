import { StepProps, Steps, Tag } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Welcome from '../Welcome';
import SoleTraderPersonalInfo from './SoleTraderPersonalInfo';
import SoleTraderIdentityVerification from './SoleTraderIdentityVerification';
import SoleTraderBusinessInfo from './SoleTraderBusinessInfo';
import SoleTraderDocuments from './SoleTraderDocuments';
import SoleTraderReview from './SoleTraderReview';
import { useSoleTraderOnboardingContext } from '@/contexts/sole-trader-onboarding-context';
import SoleOnboardingProvider from '@/providers/SoleTraderOnboardingProvider';
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
    title: 'Document Upload',
  },
];

const SoleTraderOnboarding = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { current, setCurrent } = useSoleTraderOnboardingContext();

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
            <Tag
              color="#ebf4ff"
              className="rounded-2xl text-xs text-primary-600"
            >
              Sole Trader
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
        className="grid h-full place-items-center border border-solid border-grey-200 pb-8"
      >
        {current === -1 && <Welcome next={next} />}
        {current === 0 && <SoleTraderPersonalInfo next={next} />}
        {current === 1 && <SoleTraderIdentityVerification next={next} />}
        {current === 2 && <SoleTraderBusinessInfo next={next} />}
        {current === 3 && <SoleTraderDocuments next={next} />}
        {current === 4 && <SoleTraderReview nextAction={next} />}
        {current === 5 && <OnboardingSuccess />}
      </div>
    </section>
  );
};

const SoleTraderWrapper = () => {
  return (
    <SoleOnboardingProvider>
      <SoleTraderOnboarding />
    </SoleOnboardingProvider>
  );
};

export const Component = SoleTraderWrapper;

export default SoleTraderWrapper;
