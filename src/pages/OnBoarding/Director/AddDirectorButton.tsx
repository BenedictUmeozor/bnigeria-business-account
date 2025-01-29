import { memo } from 'react';
import { Director } from './AddDirectors';
import { Button, Card, Col, Row, Tag } from 'antd';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const AddDirectorButton = ({
  directors,
  index,
  setShowForm,
  setSelectedDirector,
}: {
  directors: Director[];
  index: number;
  setShowForm: () => void;
  setSelectedDirector: (director: Director) => void;
}) => {
  console.log(`card-${index}`, directors.length);
  if (directors.length > index) {
    return (
      <Row
        gutter={16}
        justify={'space-between'}
        role="button"
        className="gap-2 rounded-md border border-solid border-grey-200 p-3"
      >
        <Col span={16} className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full">
            <img
              src="/images/director.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <p className="break-words font-medium text-grey-600">{`${directors[index].first_name} ${directors[index].last_name}`}</p>
            <p className="break-words text-gray-600">
              {directors[index].email_address}
            </p>
          </div>
        </Col>
        <Col
          span={4}
          className="flex h-full flex-col items-center justify-between"
        >
          <Tag className="rounded-md text-positive-600 text-xs bg-positive-50">
            Director
          </Tag>
          <Button
            type="text"
            className="text-sm text-primary"
            size="small"
            onClick={() => setSelectedDirector(directors[index])}
          >
            Edit
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <Card
      role="button"
      onClick={setShowForm}
      className="flex cursor-pointer items-center justify-center bg-grey-50 transition-all duration-100 ease-linear hover:bg-grey-100"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <PlusCircleIcon className="h-8 w-8 text-grey-500" />
        <p className="text-grey-600">Add Director</p>
      </div>
    </Card>
  );
};
export default memo(AddDirectorButton);
