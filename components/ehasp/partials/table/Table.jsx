import { useState } from "react";
import Pagination from "@/components/ehasp/partials/table/Pagination";
import Search from "@/components/ehasp/partials/table/Search";
import Selection from "@/components/ehasp/partials/table/Selection";
import ChevronIcon from "@/components/svg/ChevronIcon";
export default function Table({
  columns = [],
  data = [],
  paginationProp = {},
  pages = [5, 10, 25, 50],
  onSort = () => {},
  onRowClick = false,
  hoverable = false,
  striped = false,
  search = true,
  loading = false,
  headerClassName,
  selectable = false,
}) {
  const {
    pagination: paginationHandler,
    meta,
    onPaginate = () => {},
  } = paginationProp;

  const [sort, setSort] = useState({
    key: "",
    value: "-",
  });

  const pagination = {
    current_page: meta?.current_page || paginationHandler?.current_page,
    per_page: meta?.per_page || paginationHandler?.per_page,
    from: meta?.from || 0,
    to: meta?.to || 0,
    last_page: meta?.last_page || 0,
    total: meta?.total || 0,
  };

  const findData = (col, row) => {
    if (col?.slot) {
      if (typeof col.slot === "function") {
        return col.slot(row);
      }
      return col.slot;
    }
    return row[col.dataIndex] || "";
  };

  const sortTrigger = (column) => {
    if (column.sortable) {
      onSort(sort.value + column.dataIndex);
      setSort((e) => {
        return {
          key: column.dataIndex,
          value: e.value === "-" ? "" : "-",
        };
      });
    }
  };

  return (
    <div>
      {search && (
        <div>
          <Search />
        </div>
      )}
      <div className="w-full flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium">
                  <tr className="border-t">
                    {selectable && <Selection data={data} type="head" />}
                    {columns.map((column, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`px-4 py-2 ${
                          column.sortable && "cursor-pointer"
                        }`}
                        onClick={() => sortTrigger(column)}
                      >
                        <div className="flex items-center">
                          <p className={headerClassName}>{column.name}</p>
                          {column.sortable && (
                            <ChevronIcon
                              fill="#555555"
                              className={`transition ml-2 ${
                                sort.value !== "-" &&
                                sort.key === column.dataIndex
                                  ? "transform rotate-[270deg]"
                                  : "transform rotate-90"
                              }`}
                            />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                {!loading ? (
                  <tbody>
                    {data.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b ${
                          onRowClick && "cursor-pointer"
                        } ${
                          hoverable &&
                          "transition duration-300 ease-in-out hover:bg-neutral-100"
                        } ${striped && i % 2 ? "bg-neutral-100" : "bg-white"}`}
                        onClick={() => {
                          if (onRowClick) {
                            onRowClick(row);
                          }
                        }}
                      >
                        {selectable && (
                          <Selection data={data} row={row} type="body" />
                        )}
                        {columns.map((col, i) => (
                          <td
                            key={i}
                            className="whitespace-nowrap p-4 font-poppins text-[#555555] text-[16px] leading-[24px]"
                          >
                            {findData(col, row)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      {meta && !loading && (
        <div className="grid grid-cols-3">
          <div className="text-sm font-medium">
            Showing {pagination.from} to {pagination.to} of {pagination.total}{" "}
            results
          </div>
          <div className="flex justify-center text-sm font-medium items-center">
            <select
              onChange={(e) => {
                if (e?.target?.value) {
                  onPaginate({
                    current_page: 1,
                    per_page: e?.target?.value,
                  });
                }
              }}
            >
              {pages.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <p>per page</p>
          </div>
          <div>
            {pagination.last_page > 1 && (
              <Pagination pagination={pagination} onPaginate={onPaginate} />
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="py-12">
          <div className="w-fit m-auto text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}
