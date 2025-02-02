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
import { useToast } from "@/components/hooks/use-toast"

import { SenderRecipientInfo } from '@/Types';

interface Props {
    setModalOpen: (value: boolean) => void;
    onSuccess: () => void;
    formType: 'from' | 'recipient' | 'payment';
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const SenderRecipientForm = (
    { setModalOpen, onSuccess, formType, buttonRef } : Props
) => {

    const form = useForm<SenderRecipientInfo>({});

    const isLocalStorageAvailable = useLocalStorage();
    const { toast } = useToast();

    const onSubmit = (data: SenderRecipientInfo) => {
        if (isLocalStorageAvailable) {
            formType === 'from' ? storageManager.addSender(data) : storageManager.addRecipient(data);
            buttonRef.current?.click();
            onSuccess();

            toast({
                description: `${formType === 'from' ? 'Sender' : 'Recipient'} added successfully`,
                variant: "success"
            });
        } else {
            setModalOpen(false);

            toast({
                description: "Local storage is not available",
                variant: "destructive",
            });
        }
    };

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
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Company/Person Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe / Apple Inc"
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
                                name="taxationNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Taxation No./Registration No.
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="PAN/VAT/GST/TAX/DST/EIN/ABN"
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Phone Number"
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

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email Address"
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
                                                placeholder="Address"
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

export default SenderRecipientForm;
