'use client';

import { useState } from 'react';
import { ChevronDown, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm, FormProvider } from 'react-hook-form';

export default function TaxSettings() {
    const [taxEnabled, setTaxEnabled] = useState(false);
    const [discountEnabled, setDiscountEnabled] = useState(false);
    const methods = useForm({
        defaultValues: {
            currency: 'usd',
            taxTitle: 'gst',
            discount: '0',
        },
    });

    const onSubmit = data => {
        console.log(data);
        // Handle form submission
    };

    return (
        <FormProvider {...methods}>
            <Form {...methods}>
                <Card className="w-full max-w-md p-6 space-y-6 bg-slate-50 transition-all duration-300 ease-in-out">
                    <div className="space-y-4">
                        <FormField
                            control={methods.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Currency
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">
                                                USD ($)
                                            </SelectItem>
                                            <SelectItem value="eur">
                                                EUR (€)
                                            </SelectItem>
                                            <SelectItem value="gbp">
                                                GBP (£)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose your currency
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">TAX</span>
                                <Switch
                                    checked={taxEnabled}
                                    onCheckedChange={setTaxEnabled}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">
                                    DISCOUNT
                                </span>
                                <Switch
                                    checked={discountEnabled}
                                    onCheckedChange={setDiscountEnabled}
                                />
                            </div>
                        </div>

                        <div
                            className="space-y-4 transition-all duration-300 ease-in-out"
                            style={{
                                maxHeight: taxEnabled ? '1000px' : '0',
                                overflow: 'hidden',
                            }}
                        >
                            {taxEnabled && (
                                <FormField
                                    control={methods.control}
                                    name="taxTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Tax Title
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select tax type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none" defaultChecked>
                                                        ------------
                                                    </SelectItem>
                                                    <SelectItem value="tax">
                                                        Tax
                                                    </SelectItem>
                                                    <SelectItem value="vat">
                                                        VAT
                                                    </SelectItem>
                                                    <SelectItem value="gst">
                                                        GST
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Choose the Taxation Title
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <div
                            className="space-y-4 transition-all duration-300 ease-in-out"
                            style={{
                                maxHeight: discountEnabled ? '1000px' : '0',
                                overflow: 'hidden',
                            }}
                        >
                            {discountEnabled && (
                                <FormField
                                    control={methods.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Discount (%)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    min="0"
                                                    max="100"
                                                    className="w-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                            onClick={methods.handleSubmit(onSubmit)}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </Button>
                        <Button
                            type="button"
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </Card>
            </Form>
        </FormProvider>
    );
}
