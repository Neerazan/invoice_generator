import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function InvoiceSummary() {
    return (
        <div className="w-full max-w-sm p-4">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Sub Total</TableCell>
                        <TableCell className="text-right">MMK 41</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2">
                            Discount
                            <span className="text-sm text-muted-foreground">
                                (12%)
                            </span>
                        </TableCell>
                        <TableCell className="text-right">MMK 12</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2">
                            Tax
                            <span className="text-sm text-muted-foreground">
                                (9%)
                            </span>
                        </TableCell>
                        <TableCell className="text-right">MMK 3</TableCell>
                    </TableRow>
                    <TableRow className="bg-slate-50">
                        <TableCell className="font-medium">Total</TableCell>
                        <TableCell className="text-right">MMK 32</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
