import HeaderTitle from '@/components/ui/HeaderTitle';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import AddDirectorButton from './AddDirectorButton';
import AddDirectorForm from './AddDirectorForm';
import { Button } from 'antd';
import EditDirector from './EditDirector';

export interface Director {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  role: string;
  residential_address: string;
  state: string;
  owns_over_25_percent: 1 | 0;
  authorized_signatory: 1 | 0;
  preferred_means_of_identification: 'NIN' | 'Passport' | 'Drivers License';
  front_image: File | null;
  back_image: File | null;
}

const AddDirectors = ({ next }: { next: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);

  const _setShowForm = useCallback(() => setShowForm(true), []);
  const hanldeAddDirector = useCallback(
    (director: Director) => {
      const length = directors.length;
      setDirectors([...directors, { ...director, id: length + 1 }]);
      setShowForm(false);
      console.log(directors);
    },
    [directors],
  );

  const handleEditDirector = useCallback(
    (director: Director) => {
      const newDirectors = directors.map(d => {
        if (d.id === director.id) {
          return director;
        } else {
          return d;
        }
      });
      setDirectors(newDirectors);
      setShowEditForm(false);
      setSelectedDirector(null);
    },
    [directors],
  );

  const _setSelectedDirector = useCallback((director: Director) => {
    setSelectedDirector(director);
    setShowEditForm(true);
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [directors]);

  if (showForm) {
    return <AddDirectorForm handleAddDirector={hanldeAddDirector} />;
  }

  if (showEditForm && !!selectedDirector) {
    return (
      <EditDirector
        director={selectedDirector}
        handleEditDirector={handleEditDirector}
      />
    );
  }

  return (
    <div className="h-full w-full space-y-8 p-8" ref={ref}>
      <HeaderTitle
        headerDescription="Add up to Four (4) key directors in your business"
        headerTitle="Add Key Directors"
      />
      <section className="grid grid-cols-1 grid-rows-[120px] gap-6 lg:grid-cols-2">
        <AddDirectorButton
          directors={directors}
          index={0}
          setShowForm={_setShowForm}
          setSelectedDirector={_setSelectedDirector}
        />
        <AddDirectorButton
          directors={directors}
          index={1}
          setShowForm={_setShowForm}
          setSelectedDirector={_setSelectedDirector}
        />
        <AddDirectorButton
          directors={directors}
          index={2}
          setShowForm={_setShowForm}
          setSelectedDirector={_setSelectedDirector}
        />
        <AddDirectorButton
          directors={directors}
          index={3}
          setShowForm={_setShowForm}
          setSelectedDirector={_setSelectedDirector}
        />
      </section>
      {directors.length > 0 && (
        <Button
          type="primary"
          onClick={next}
          className="w-48"
          shape="round"
          size="large"
        >
          Continue
        </Button>
      )}
    </div>
  );
};
export default memo(AddDirectors);
