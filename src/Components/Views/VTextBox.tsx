import { IVTextBox } from '../../Types/ViewTypes';

export interface VTextBoxProps {
  viewData: IVTextBox;
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
    <div style={textBoxStyle}>
      <p>{bodyText}</p>
    </div>
  );
};

export default VTextBox;
