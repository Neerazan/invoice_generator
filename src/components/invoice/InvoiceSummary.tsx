import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { InvoiceSummaryProps } from '@/Types';

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
    taxEnabled,
    discountEnabled,
    currency,
    taxTitle,
    taxRate,
    discount,
    items
}) => {
    
    const calculatedValues = useMemo(() => {
        // Calculate subtotal (total before discount and tax)
        const subTotal = items.reduce((total, item) => 
            total + (item.quantity * item.rate), 0);

        // Calculate discounted amount
        const discountAmount = discountEnabled 
            ? (subTotal * (discount / 100)) 
            : 0;

        // Calculate price after discount
        const discountedPrice = subTotal - discountAmount;

        // Calculate tax amount
        const taxAmount = taxEnabled 
            ? (discountedPrice * (taxRate / 100)) 
            : 0;

        // Calculate total (after discount and tax)
        const total = discountedPrice + taxAmount;

        return {
            subTotal,
            discountAmount,
            discountedPrice,
            taxAmount,
            total
        };
    }, [items, taxEnabled, discountEnabled, taxRate, discount]);


    const currencySymbol = currency ? currency.split('-')[1] : '';

    return (
        <div className="w-full p-4">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Sub Total</TableCell>
                        <TableCell className="">
                            {currencySymbol} {calculatedValues.subTotal.toFixed(2)}
                        </TableCell>
                    </TableRow>
                    {discountEnabled && (
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-2">
                                Discount
                                <span className="text-sm text-muted-foreground">
                                    ({discount}%)
                                </span>
                            </TableCell>
                            <TableCell className="">
                                {currencySymbol} {calculatedValues.discountAmount.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    )}
                    {taxEnabled && (
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-2">
                                {taxTitle}
                                <span className="text-sm text-muted-foreground">
                                    ({taxRate}%)
                                </span>
                            </TableCell>
                            <TableCell className="">
                                {currencySymbol} {calculatedValues.taxAmount.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow className="bg-slate-50">
                        <TableCell className="font-medium">Total</TableCell>
                        <TableCell className="">
                            {currencySymbol} {calculatedValues.total.toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default InvoiceSummary;