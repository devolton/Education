import clsx from 'clsx'



const TableRow = ({row}) => (
    <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
            return (
                <td
                    {...cell.getCellProps()}
                    className={clsx({'text-center min-w-100px': cell.column.id === 'actions'})}
                >
                    {cell.render('Cell')}
                </td>
            )
        })}
    </tr>
)

export {TableRow}