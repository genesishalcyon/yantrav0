export default function Pagination({ pagination = {}, onPaginate = () => {} }) {
  const Li = ({ number }) => {
    const className =
      pagination.current_page === number
        ? "relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium transition-all duration-300"
        : "relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 ";
    return (
      <li>
        <a
          className={className}
          href="#"
          onClick={() => {
            if (number !== pagination.current_page) {
              onPaginate({
                current_page: number,
                per_page: pagination.per_page,
              });
            }
          }}
        >
          {number}
        </a>
      </li>
    );
  };
  const RenderPagination = () => {
    const length = pagination.total / pagination.per_page;

    let x = [];
    for (let index = 0; index < length; index++) {
      x.push(<Li key={index} number={index + 1} />);
    }

    return x;
  };

  return (
    <nav className="flex justify-end">
      <ul className="list-style-none flex text-dim-black">
        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 ${
              pagination.current_page <= 1 ? "cursor-not-allowed" : ""
            }`}
            href="#"
            onClick={() => {
              if (pagination.current_page > 1) {
                onPaginate({
                  current_page: pagination.current_page - 1,
                  total: pagination.total,
                  per_page: pagination.per_page,
                });
              }
            }}
          >
            &laquo;
          </a>
        </li>

        <RenderPagination />

        <li>
          <a
            className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100 ${
              pagination.current_page >= pagination.last_page
                ? "cursor-not-allowed"
                : ""
            }`}
            href="#"
            onClick={() => {
              if (pagination.current_page < pagination.last_page) {
                onPaginate({
                  current_page: pagination.current_page + 1,
                  total: pagination.total,
                  per_page: pagination.per_page,
                });
              }
            }}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}
