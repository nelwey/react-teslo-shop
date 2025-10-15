import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get('page') ?? '1';
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        variant="outline"
        size="sm">
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>
      {
        Array.from({ length: totalPages }).map((_, index) => (
          <Button
            onClick={() => handlePageChange(index + 1)}
            variant={page === index + 1 ? 'default' : 'outline'}
            size="sm"
            key={index}>
            {index + 1}
          </Button>
        ))
      }

      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        variant="outline"
        size="sm">
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
