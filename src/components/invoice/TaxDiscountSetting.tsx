'use client';

import React from 'react';

import { Eye, Download } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { currencies } from '@/constants/countryAndCurrencies';
import { TaxDiscountSettingsProps } from '@/Types';

const TaxDiscountSettings: React.FC<TaxDiscountSettingsProps> = ({
    taxEnabled,
    setTaxEnabled,
    discountEnabled,
    setDiscountEnabled,
    currency,
    setCurrency,
    taxTitle,
    setTaxTitle,
    taxRate,
    setTaxRate,
    discount,
    setDiscount,
}) => {
    return (
        <form>
            <Card className="w-full max-w-md p-4 space-y-6 bg-slate-50 transition-all duration-300 ease-in-out">
                <div className="space-y-4">
                    <div className="px-2">
                        <label className="text-sm font-medium block mb-2">
                            Currency
                        </label>
                        <Select
                            // value={currency || ''}
                            defaultValue={currency}
                            onValueChange={setCurrency}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select currency">
                                    {currency.split('-')[0]}{' '}
                                    {/* Explicitly show selected value */}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {currencies
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                    )
                                    .map(country => (
                                        <SelectItem
                                            key={country.id}
                                            value={`${country.currency.code}-${country.currency.symbol}-${country.id}`}
                                        >
                                            {`${country.name} (${country.currency.symbol})`}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500 mt-1">
                            Choose your currency
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-4 p-2">
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
                        className="space-y-4 transition-all duration-300 ease-in-out px-2"
                        style={{
                            maxHeight: taxEnabled ? '1000px' : '0',
                            overflow: 'hidden',
                        }}
                    >
                        {taxEnabled && (
                            <div className="">
                                <label className="text-sm font-medium block mb-2">
                                    Tax Title
                                </label>
                                <Select
                                    onValueChange={setTaxTitle}
                                    defaultValue={taxTitle} // Add defaultValue prop
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select tax type">
                                            {taxTitle}{' '}
                                            {/* Explicitly show the selected value */}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            ------------
                                        </SelectItem>
                                        <SelectItem value="Tax">Tax</SelectItem>
                                        <SelectItem value="Vat">Vat</SelectItem>
                                        <SelectItem value="Gst">Gst</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-gray-500 mt-1">
                                    Choose the Taxation Title
                                </p>
                            </div>
                        )}
                    </div>

                    <div
                        className="space-y-4 transition-all duration-300 ease-in-out px-2"
                        style={{
                            maxHeight:
                                discountEnabled || taxEnabled ? '1000px' : '0',
                            overflow: 'hidden',
                        }}
                    >
                        <div className="w-full grid grid-cols-2 pb-2">
                            {taxEnabled && (
                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Tax (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={taxRate}
                                        onChange={e =>
                                            setTaxRate(parseInt(e.target.value))
                                        }
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="w-24 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#059669]"
                                    />
                                </div>
                            )}

                            {discountEnabled && (
                                <div>
                                    <label className="text-sm font-medium block mb-2">
                                        Discount (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={discount}
                                        onChange={e =>
                                            setDiscount(
                                                parseInt(e.target.value),
                                            )
                                        }
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="w-24 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#059669]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 px-2">
                    <Button
                        type="submit"
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
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
        </form>
    );
};

export default TaxDiscountSettings;
