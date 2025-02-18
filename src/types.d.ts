export {};

declare global {
  namespace HM {
    interface Shareholder {
      id: number;
      business_name: string;
      first_name: string;
      last_name: string;
      email_address: string;
      role: string;
      residential_address: string;
      owns_over_25_percent: 1 | 0;
      authorized_signatory: 1 | 0;
      preferred_means_of_identification: 'NIN' | 'Passport' | 'Drivers License';
      front_image: File | null;
      back_image: File | null;
    }

    type TableState<RecordType = any> = {
      pagination: TablePaginationConfig;
      filters: Record<string, FilterValue | null>;
      sorter: SorterResult<RecordType> | SorterResult<RecordType>[];
      extra: TableCurrentDataSource<RecordType>;
    };

    interface QueryResponseWithData<T> {
      data: T;
      message: string;
      status: number;
    }

    interface QueryResponse {
      message: string;
      status: number;
    }
    
    interface OnboardingContextType {
      current: number;
      setCurrent: (value: number) => void;
      shareholders: Shareholder[];
      setShareholders: (value: Shareholder[]) => void;
      stakePercentage: number | undefined;
      setStakePercentage: (value: number) => void;
    }
  }
}
