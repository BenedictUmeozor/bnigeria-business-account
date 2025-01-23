import { StepProps, Steps } from 'antd';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import Welcome from './Welcome';
import PersonalInfo from './PersonalInfo';

const steps: StepProps[] = [
  {
    title: 'Personal Identification',
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

const Onboarding = () => {
  const [current, setCurrent] = useState<number>(-1);

  const next = useCallback(() => {
    setCurrent(prev => (prev === -1 ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => prev - 1);
  }, []);

  return (
    <section className="no-scrollbar grid grid-cols-[300px_1fr] overflow-hidden rounded-xl">
      <aside className="bg-primary-50 border-grey-200 grid h-full max-w-[600px] grid-rows-[1fr_auto] gap-12 border border-r-0 border-solid pb-8 pt-12">
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
        <footer className="text-grey-500 space-x-2 text-center text-sm">
          <span>Got Questions?</span>
          <Link to="/" className="text-primary">
            Contact Us
          </Link>
        </footer>
      </aside>
      <div className="border-grey-200 grid h-full place-items-center border border-solid">
        {current === -1 && <Welcome next={next} />}
        {current === 0 && <PersonalInfo next={next} />}
      </div>
    </section>
  );
};

export const Component = Onboarding;

export default Onboarding;
