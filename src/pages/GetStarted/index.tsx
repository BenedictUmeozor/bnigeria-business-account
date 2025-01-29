import GetStartedForm from './GetStartedForm';

const GetStarted = () => {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-primary">
        <div className="absolute bottom-0 left-0 right-0 h-[45%] origin-[100%] -skew-y-6 transform bg-primary-50" />
      </div>
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-start gap-12 overflow-y-auto px-4 lg:grid-cols-2 lg:px-8 justify-between">
        <section className="grid h-full grid-rows-[1fr_auto] py-8 pb-4 max-lg:hidden">
          <div className="space-y-12 text-white max-w-[400px]">
            <a
              href="https://hellomemoney.com/"
              className="flex items-center gap-2"
            >
              <img
                src="/images/hellome.png"
                alt="Hellomemoney"
                className="h-10 w-10"
              />
              <p className="font-cabinet text-2xl font-extrabold text-white no-underline">
                HelloMe Money
              </p>
            </a>
            <div className="space-y-6">
              <div className="space-y-3">
                <h5 className="text-base font-semibold">Lörem ipsum beling</h5>
                <p>
                  Lörem ipsum beling äning är spessade. Kolig kvasinuras. En
                  påtelogi. Utsimningsbassäng täsk heterofil jag desk då
                  stenode. Evåse
                </p>
              </div>
              <div className="space-y-3">
                <h5 className="text-base font-semibold">Lörem ipsum beling</h5>
                <p>
                  Lörem ipsum beling äning är spessade. Kolig kvasinuras. En
                  påtelogi. Utsimningsbassäng täsk heterofil jag desk då
                  stenode. Evåse
                </p>
              </div>
              <div className="space-y-3">
                <h5 className="text-base font-semibold">Lörem ipsum beling</h5>
                <p>
                  Lörem ipsum beling äning är spessade. Kolig kvasinuras. En
                  påtelogi. Utsimningsbassäng täsk heterofil jag desk då
                  stenode. Evåse
                </p>
              </div>
            </div>
          </div>
          <div className="relative space-y-2">
            <div className="flex items-center justify-end w-80">
              <img
                src="/images/qrcode.png"
                alt=""
                className="h-28 w-28 object-contain"
              />
            </div>
            <p className="font-medium text-grey-600">
              Also available on the stores?{' '}
              <a
                href="#"
                className="text-primary-600 underline hover:text-primary-700"
              >
                Get here
              </a>
            </p>
            <div className="grid w-72 grid-cols-2 gap-2">
              <a href="#">
                <img src="/images/googleplay.png" alt="" className="w-full" />
              </a>
              <a href="#">
                <img src="/images/applestore.png" alt="" className="w-full" />
              </a>
            </div>
          </div>
        </section>
        <div className="py-4 pb-4 lg:py-8">
          <GetStartedForm />
        </div>
      </div>
    </div>
  );
};

export const Component = GetStarted;

export default GetStarted;
