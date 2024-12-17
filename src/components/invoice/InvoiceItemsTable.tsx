'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface LineItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
}

export default function InvoiceItemsTable() {
    const [items, setItems] = useState<LineItem[]>([
        { id: 1, description: '', quantity: 1, rate: 32 },
        { id: 2, description: '', quantity: 3, rate: 4 },
    ]);

    const addNewLine = () => {
        setItems([
            ...items,
            {
                id: items.length + 1,
                description: '',
                quantity: 1,
                rate: 0,
            },
        ]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (
        id: number,
        field: keyof LineItem,
        value: string | number,
    ) => {
        setItems(
            items.map(item =>
                item.id === id
                    ? {
                        ...item,
                        [field]:
                            field === 'description' ? value : Number(value),
                    }
                    : item,
            ),
        );
    };

    return (
        <div className="w-full mx-auto space-y-4">
            <div className="rounded-lg border overflow-hidden bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent bg-gray-50">
                            <TableHead className="w-[40%] font-bold px-7">
                                Item Description
                            </TableHead>
                            <TableHead className="text-right font-bold">Qty</TableHead>
                            <TableHead className="text-right font-bold">
                                Rate (₹)
                            </TableHead>
                            <TableHead className="text-right font-bold">Amount</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => (
                            <TableRow
                                key={item.id}
                                className="group hover:bg-gray-50 transition-colors duration-200"
                            >
                                <TableCell>
                                    <Input
                                        value={item.description}
                                        onChange={e =>
                                            updateItem(
                                                item.id,
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="border-0 bg-transparent h-auto focus-visible:ring-1 my-2
                                        focus-visible:ring-gray-400 hover:ring-1 hover:ring-gray-400
                                        "
                                        placeholder="Enter item description"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={e =>
                                            updateItem(
                                                item.id,
                                                'quantity',
                                                e.target.value,
                                            )
                                        }
                                        className="w-20 ml-auto border-0 bg-transparent h-auto focus-visible:ring-1 my-2
                                        focus-visible:ring-gray-400 hover:ring-1 hover:ring-gray-400"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Input
                                        type="number"
                                        value={item.rate}
                                        onChange={e =>
                                            updateItem(
                                                item.id,
                                                'rate',
                                                e.target.value,
                                            )
                                        }
                                        className="w-24 ml-auto border-0 bg-transparent h-auto focus-visible:ring-1 my-2
                                        focus-visible:ring-gray-400 hover:ring-1 hover:ring-gray-400"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    ₹{(item.quantity * item.rate).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-white opacity-0 bg-red-300  group-hover:opacity-100 transition-all duration-200 hover:text-white hover:bg-red-600 rounded-full"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <X className="h-3 w-3 font-bold" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Button
                variant="outline"
                className="w-full border-2 border-dashed border-gray-200 bg-[#f2f9ff] text-gray-500 hover:border-blue-300 hover:text-blue-400 hover:bg-blue-50 transition-colors duration-200 font-bold"
                onClick={addNewLine}
            >
                <Plus className="h-4 w-4 mr-2" />
                Add new item
            </Button>
        </div>
    );
}