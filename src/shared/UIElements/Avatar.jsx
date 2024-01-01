import './Avatar.css';

const Avatar = ({ className, style, image, alt, widthInput }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width: widthInput, height: widthInput }}
      />
    </div>
  );
};

export default Avatar;
