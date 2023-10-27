import { Fragment } from "react";
import tableStore from "@/lib/store/tableStore";
import { shallow } from "zustand/shallow";
export default function Selection({ data, row = {}, type }) {
  const [selected, onSelect] = tableStore(
    (state) => [state.selected, state.onSelect],
    shallow
  );
  return (
    <Fragment>
      {type === "head" ? (
        <th>
          <input
            id="select-all"
            type="checkbox"
            checked={selected.length === data?.length}
            onChange={(e) => {
              onSelect(e.target.checked ? data : []);
            }}
          />
        </th>
      ) : (
        <td>
          <input
            id={row?.id}
            type="checkbox"
            checked={selected.some((n) => n.id === row?.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onSelect([...selected, row]);
              } else {
                const newData = selected.filter((n) => n.id !== row?.id);
                onSelect(newData);
              }
            }}
          />
        </td>
      )}
    </Fragment>
  );
}
