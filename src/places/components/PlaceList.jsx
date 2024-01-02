import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found, go create one now!</h2>
          <button>Share Place</button>
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
