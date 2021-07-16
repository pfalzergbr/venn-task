import { IVTextBox } from '../../Types/ViewTypes';
import Card from '../UI/Card/Card';

export interface VTextBoxProps {
  viewData: IVTextBox;
  index: number;
}

const VTextBox: React.FC<VTextBoxProps> = ({ viewData }) => {
  const {
    bodyText,
    backgroundColor: { hex: backgroundHex },
    capitalised,
    fontColor: { hex: fontColorHex },
    fontSize,
    padding,
    textAlignment,
  } = viewData.attributes;

  const textBoxStyle: React.CSSProperties = {
    background: backgroundHex,
    textTransform: capitalised ? 'capitalize' : 'none',
    color: fontColorHex,
    fontSize: fontSize,
    padding: padding,
    textAlign: textAlignment,
  };

  return (
    <Card isMarked={viewData.isMarked} id={viewData.id!} style={textBoxStyle}>
      <div>
        <p>{bodyText}</p>
      </div>
    </Card>
  );
};

export default VTextBox;
