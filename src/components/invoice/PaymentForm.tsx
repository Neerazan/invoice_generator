'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { currencies } from '@/constants/countryAndCurrencies';
import { storageManager } from '@/LocalStorage';
import { useLocalStorage } from '@/components/hooks/useLocalStorage';
import { useToast } from '@/components/hooks/use-toast';

import { PaymentInfo } from '@/Types';


interface Props {
    onSuccess: () => void;
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const PaymentForm = ({ onSuccess, buttonRef } : Props) => {
    const form = useForm<PaymentInfo>();
    const isLocalStorageAvailable = useLocalStorage();
    const { toast } = useToast();

    const onSubmit = (data: PaymentInfo) => {
        if (isLocalStorageAvailable) {
            storageManager.addPaymentInfo(data);
            toast({
                description: 'Payment information has been added successfully.',
                variant: 'success',
            });
            buttonRef.current?.click();
            onSuccess();
        } else {
            toast({
                title: 'Local Storage Unavailable',
                variant: 'destructive',
            });
        }
    }

    return (
        <Card className="w-full border-transparent rounded-none">
            <CardContent className="p-0">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name='paymentMethod'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Payment Method
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Bank Transfer"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Account Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="77436782398457823"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name='accountName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Account Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bankName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Bank Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Global IME Bank"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name='bankBranch'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Branch
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Kathmandu"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="swiftCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Swift Code
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="GLBBNPKA"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Country
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="text-gray-700 rounded-sm border-gray-400 h-auto">
                                                    <SelectValue placeholder="Select country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {currencies.map(country => (
                                                    <SelectItem
                                                        key={country.id}
                                                        value={country.name}
                                                    >
                                                        {country.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            State
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="State"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Full Address"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            City
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="City"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            ZIP/Postal Code
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ZIP/Postal Code"
                                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => form.reset()}
                            >
                                CANCEL
                            </Button>
                            <Button
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-600"
                            >
                                SAVE
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


export default PaymentForm;