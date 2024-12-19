import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { currencies } from '@/constants/countryAndCurrencies';

const SenderRecipentForm = () => {
    return (
        <Card className="w-full border-transparent rounded-none">
            <CardContent className="p-0">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Company/Person Name
                            </label>
                            <Input
                                placeholder="John Doe / Apple Inc"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Taxation No./Registration No.
                            </label>
                            <Input
                                placeholder="PAN/VAT/GST/TAX/DST/EIN/ABN"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Country
                            </label>
                            <Select defaultValue="nepal">
                                <SelectTrigger className="text-gray-700 rounded-sm border-gray-400 h-auto">
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((country) => (
                                        <SelectItem
                                            key={country.id}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Phone Number
                            </label>
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">State</label>
                            <Input
                                placeholder="State"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Address
                            </label>
                            <Input
                                placeholder="Address"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City</label>
                            <Input
                                placeholder="City"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                ZIP/Postal Code
                            </label>
                            <Input
                                placeholder="ZIP/Postal Code"
                                className="text-gray-700 rounded-sm border-gray-400 h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#24bb8b]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            className="bg-red-500 hover:bg-red-600"
                        >
                            CANCEL
                        </Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">
                            SAVE
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default SenderRecipentForm;
