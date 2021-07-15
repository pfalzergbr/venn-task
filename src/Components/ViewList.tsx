import { ViewTypes } from '../Types/ViewTypes';
import { v4 as uuidv4 } from 'uuid';
import VImageCarousel from './Views/VImageCarousel';
import VImageWithPadding from './Views/VImageWithPadding';
import VTextBox from './Views/VTextBox';

export interface ViewListProps {
  viewData: ViewTypes[];
}

// Component rendering a list of views.
// Generating a unique key with uuid, since the API doesn't give us any id or reasonably
// unique value. Indexes are hacky, so went with uuid.
const ViewList: React.FC<ViewListProps> = ({ viewData }) => {
  return (
    <div>
      {viewData.map(view => {
        if (view.moduleType === 'VTextBox')
          return <VTextBox key={uuidv4()} viewData={view} />;
        else if (view.moduleType === 'VImageWithPadding')
          return <VImageWithPadding key={uuidv4()} viewData={view} />;
        else if (view.moduleType === 'VImageCarousel')
          return <VImageCarousel key={uuidv4()} viewData={view} />;
        return null;
      })}
    </div>
  );
};

export default ViewList;
