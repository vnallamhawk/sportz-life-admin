import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames";
import { type ReactNode, useState } from "react";

const TabsComponent = ({
  tabs,
}: {
  tabs: Array<{ name: string; component: ReactNode }>;
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);

  const onClickHandler = (name: string) => {
    setActiveTab(name);
  };

  return (
    <Tabs.Root defaultValue={activeTab}>
      <Tabs.List>
        {tabs.map(({ name }) => (
          <Tabs.Trigger
            key={name}
            onClick={() => onClickHandler(name)}
            className={classNames({
              "text-decoration-line: mr-10 font-['Teko'] text-2xl font-normal uppercase leading-normal text-rose-500 underline":
                activeTab === name,
              "mr-10 font-['Teko'] text-2xl font-normal uppercase leading-normal text-slate-800":
                activeTab !== name,
            })}
            value={name}
          >
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map(({ name, component }) => (
        <Tabs.Content key={name} value={name}>
          {component}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsComponent;
