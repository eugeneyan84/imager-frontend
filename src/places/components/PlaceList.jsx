import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>You have not shared any places yet!</h2>
          <Button to="/places/new">Share New Place</Button>
        </Card>
      </div>
    );
  }

  const renderedItems = items.map((item) => {
    return <PlaceItem key={item.id} place={item} />;
  });

  return <ul className="place-list">{renderedItems}</ul>;
};

export default PlaceList;
