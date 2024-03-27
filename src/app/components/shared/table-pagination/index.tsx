import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components';

type DataPaginationProps = {
  totalPages: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
};

const TablePagination = ({
  pagination,
  totalPages,
  setPagination,
}: DataPaginationProps) => {
  const pageSizeOptions = [30, 50, 100];

  const handlePreviousPage = () => {
    setPagination({
      ...pagination,
      pageIndex: pagination.pageIndex - 1,
    });
  };

  const handleNextPage = () => {
    setPagination({
      ...pagination,
      pageIndex: pagination.pageIndex + 1,
    });
  };

  const handleChangePageSize = (value: string) => {
    setPagination({
      pageIndex: 1,
      pageSize: Number(value),
    });
  };

  return (
    <Pagination className="w-full flex items-center justify-end space-x-2 py-4">
      <Select onValueChange={handleChangePageSize}>
        <SelectTrigger className="w-[72px] dark:bg-slate-900">
          <SelectValue
            placeholder={pagination.pageSize}
            defaultValue={pagination.pageSize}
          />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {pageSizeOptions.map((item, index) => (
              <SelectItem key={index} value={String(item)}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="text-[0.875rem]">
        Página {pagination.pageIndex} de {totalPages}
      </p>

      <PaginationContent>
        <PaginationItem>
          {pagination.pageIndex > 1 ? (
            <PaginationPrevious href="#" onClick={handlePreviousPage} />
          ) : (
            <button disabled>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className="hover:cursor-not-allowed opacity-80"
              />
            </button>
          )}
        </PaginationItem>

        <PaginationItem>
          {pagination.pageIndex < totalPages ? (
            <PaginationNext href="#" onClick={handleNextPage} />
          ) : (
            <button disabled>
              <PaginationNext
                onClick={handlePreviousPage}
                className="hover:cursor-not-allowed opacity-80"
              />
            </button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { TablePagination };
