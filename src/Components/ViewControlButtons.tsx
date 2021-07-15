export interface ViewControlButtonsProps {}

// Button container to control ViewList
const ViewControlButtons: React.FC<ViewControlButtonsProps> = () => {
  return (
    <div>
      <button>Add View</button>
      <button>Delete Marked Views</button>
    </div>
  );
};

export default ViewControlButtons;
