'use client'

import * as React from 'react'
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export type Todo = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  finishedAt?: Date
}

const data: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries',
    createdAt: new Date('2021-09-01T12:00:00Z'),
    updatedAt: new Date('2021-09-01T12:00:00Z'),
  },
  {
    id: '2',
    title: 'Walk the dog',
    createdAt: new Date('2021-09-01T12:00:00Z'),
    updatedAt: new Date('2021-09-01T12:00:00Z'),
    finishedAt: new Date('2021-09-01T12:00:00Z'),
  },
  {
    id: '3',
    title: 'Do laundry',
    createdAt: new Date('2021-09-01T12:00:00Z'),
    updatedAt: new Date('2021-09-01T12:00:00Z'),
  },
  {
    id: '4',
    title: 'Clean the house',
    createdAt: new Date('2021-09-01T12:00:00Z'),
    updatedAt: new Date('2021-09-01T12:00:00Z'),
  },
  {
    id: '5',
    title: 'Buy a new car',
    createdAt: new Date('2021-09-01T12:00:00Z'),
    updatedAt: new Date('2021-09-01T12:00:00Z'),
  },
]

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: 'status',
    // O header desse é simplesmente um texto
    header: 'Status',
    cell: ({ row }) => {
      const { finishedAt } = row.original
      const status: 'done' | 'waiting' = finishedAt ? 'done' : 'waiting'
      const statusVariant: 'outline' | 'secondary' = finishedAt
        ? 'outline'
        : 'secondary'

      return <Badge variant={statusVariant}>{status}</Badge>
    },
  },
  {
    // Key de acesso para a coluna. Aqui tem que estar de acordo com a interface definida em ColumnDef, no caso Todo
    accessorKey: 'title',
    // Título da coluna. Nesse caso é um botão com um ícone de seta para cima ou para baixo
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    // Conteúdo da célula. Aqui tem que estar de acordo com a interface definida em ColumnDef. Atraves do getValue é possível acessar o valor da linha dessa coluna
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">CreatedAt</div>,
    cell: ({ row }) => {
      return (
        // Pelo original é possível acessar o valor da linha dessa coluna
        <div className="text-right font-medium">
          {row.original.createdAt.toLocaleString()}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // Novamente usando o original para acessar o valor das colunas
      const todo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(todo.id)}
            >
              Copy todo ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mark as done</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TodoDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter todo's..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
