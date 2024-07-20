import { Dispatch, SetStateAction } from "react";
import { Button } from "../Button/Button";

type PaginationProps = {
    page: number,
    totalPages: number,
    setPage: Dispatch<SetStateAction<number>>
}

export function Pagination({page, totalPages, setPage}: PaginationProps) {
    const handleOnClickPage = (operation: 'next' | 'prev' | 'first' | 'last') => {
        switch (operation) {
          case 'next':
            console.log(page)
            console.log(totalPages)
            if (page === totalPages) {
              break;
            } else {
              setPage(page + 1);
            }
            break;
          case 'prev':
            if (page === 1) {
              break;
            } else {
              setPage(page - 1);
            }
            break;
            case 'first':
            if (page === 1) {
              break;
            } else {
              setPage(1);
            }
            break;
            case 'last':
            if (page === totalPages) {
              break;
            } else {
              setPage(totalPages);
            }
            break;
          default:
            break;
        }
      };
    return <div>
        <Button btnText='<<' type='button' onClick={() => handleOnClickPage('first')} disabled={page===1} />
        <Button btnText='<' type='button' onClick={() => handleOnClickPage('prev')} disabled={page===1} />
        <p>{page} Page</p>
        <Button btnText='>' type='button' onClick={() => handleOnClickPage('next')} disabled={page===totalPages} />
        <Button btnText='>>' type='button' onClick={() => handleOnClickPage('last')} disabled={page===totalPages} />
    </div>;
}