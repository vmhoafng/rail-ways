"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Seat {
    id: string
    status: 'available' | 'selected' | 'occupied'
    deck: 'upper' | 'lower'
}

export default function MobileForm() {
    const [step, setStep] = React.useState(1)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])

    // Generate seats data
    const generateSeats = (prefix: string, deck: 'upper' | 'lower'): Seat[] => {
        return Array.from({ length: 17 }, (_, i) => ({
            id: `${prefix}${String(i + 1).padStart(2, '0')}`,
            status: Math.random() > 0.8 ? 'occupied' : 'available',
            deck
        }))
    }

    const seats = {
        lower: generateSeats('A', 'lower'),
        upper: generateSeats('B', 'upper')
    }

    const steps = [
        { id: 1, title: "CHỌN GHẾ" },
        { id: 2, title: "THÔNG TIN KHÁCH HÀNG" },
        { id: 3, title: "ĐIỂM ĐÓN/TRẢ" },
        { id: 4, title: "THANH TOÁN" }
    ]

    const toggleSeatSelection = (seatId: string) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Progress Steps */}
            <div className="fixed top-0 left-0 right-0 bg-white z-10">
                <div className="flex items-center justify-between px-4 py-2 text-xs border-b">
                    {steps.map((s, i) => (
                        <div
                            key={s.id}
                            className={cn(
                                "flex items-center",
                                step === s.id ? "text-primary" : "text-gray-400"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center border",
                                step === s.id ? "border-primary text-primary" : "border-gray-300"
                            )}>
                                {s.id}
                            </div>
                            <span className="ml-1 hidden sm:inline">{s.title}</span>
                            {i < steps.length - 1 && (
                                <div className="w-8 h-px bg-gray-300 mx-2" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation Tabs */}
                <Tabs defaultValue="dat-ve" className="w-full">
                    <TabsList className="w-full justify-start px-2 h-12">
                        <TabsTrigger value="dat-ve" className="text-sm">Đặt vé</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Main Content - Seat Selection */}
            <div className="pt-28 px-4 pb-24">
                {/* Seat Map */}
                <div className="space-y-6">
                    {/* Lower Deck */}
                    <Card className="p-4">
                        <h3 className="text-sm font-medium mb-4">TẦNG DƯỚI</h3>
                        <div className="grid grid-cols-3 gap-2 justify-items-center">
                            {seats.lower.map((seat) => (
                                <Button
                                    key={seat.id}
                                    variant={selectedSeats.includes(seat.id) ? "default" : "outline"}
                                    className={cn(
                                        "w-12 h-12 p-0",
                                        seat.status === 'occupied' && "opacity-50 cursor-not-allowed",
                                        selectedSeats.includes(seat.id) && "bg-primary text-primary-foreground"
                                    )}
                                    disabled={seat.status === 'occupied'}
                                    onClick={() => toggleSeatSelection(seat.id)}
                                >
                                    {seat.id}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Upper Deck */}
                    <Card className="p-4">
                        <h3 className="text-sm font-medium mb-4">TẦNG TRÊN</h3>
                        <div className="grid grid-cols-3 gap-2 justify-items-center">
                            {seats.upper.map((seat) => (
                                <Button
                                    key={seat.id}
                                    variant={selectedSeats.includes(seat.id) ? "default" : "outline"}
                                    className={cn(
                                        "w-12 h-12 p-0",
                                        seat.status === 'occupied' && "opacity-50 cursor-not-allowed",
                                        selectedSeats.includes(seat.id) && "bg-primary text-primary-foreground"
                                    )}
                                    disabled={seat.status === 'occupied'}
                                    onClick={() => toggleSeatSelection(seat.id)}
                                >
                                    {seat.id}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Seat Status Legend */}
                    <div className="flex justify-between text-sm px-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border rounded" />
                            <span>Đã bán</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border rounded bg-gray-100" />
                            <span>Còn trống</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border rounded bg-primary" />
                            <span>Đang chọn</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Vé chiều đi (0)</span>
                    <span className="text-sm font-medium">0đ</span>
                </div>
                <Button className="w-full" size="lg">
                    Mua vé
                </Button>
            </div>
        </div>
    )
}