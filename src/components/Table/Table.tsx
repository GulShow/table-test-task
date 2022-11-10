import React, {FC, useMemo} from 'react';
import {useTable} from 'react-table';
import {COLUMNS} from '../columns'
import './Table.css';

interface Table {
    data: Array<object>
}


export const Table: FC<Table> = ({data}) => {
    const columns = useMemo(() => COLUMNS, []);
    const tableInstance = useTable({
        columns,
        data
    });
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;
    return (
<div className="container">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th{...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}

                    </tr>
                ))}
                </thead>
                <tbody{...getTableBodyProps()}>
                {rows.map((row) => {
                prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))
                        }

                    </tr>
                    )})
                }

                </tbody>
            </table>
</div>
    )

}
