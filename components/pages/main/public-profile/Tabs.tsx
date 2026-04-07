import CustomTabs from '@/components/ui/CustomTabs';

const Tabs = ({ isCostumer }: { isCostumer: boolean }) => {
  return (
    <div>
      <CustomTabs
        titles={isCostumer ? ['Posts'] : ['Posts', 'Create Post']}
        panels={
          isCostumer
            ? [<div key="tab1">Tab 1</div>]
            : [<div key="tab1">Tab 1</div>, <div key="tab2">Tab 2</div>]
        }
      />
    </div>
  );
};

export default Tabs;
