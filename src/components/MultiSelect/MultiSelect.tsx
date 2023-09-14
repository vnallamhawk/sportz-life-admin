import { type GroupBase, type Props } from "react-select";
import Select from "../Select";

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <Select options={props.options ? props.options : []} {...props} />;
}
